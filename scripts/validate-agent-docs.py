#!/usr/bin/env python3
"""Validate a project's agent documentation without modifying the project.

This file is an unmodified repository copy of the validator bundled with the
init-agent-docs skill so GitHub Actions can run the same checks.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote


CORE_DOCUMENTS = (
    Path("AGENTS.md"),
    Path("docs/project/VISION.md"),
    Path("docs/project/ARCHITECTURE.md"),
    Path("docs/project/ABSTRACTIONS.md"),
    Path("docs/project/GETTING-STARTED.md"),
    Path("docs/project/adr/README.md"),
)

AGENT_DOCUMENT_REFERENCES = tuple(
    relative_path.as_posix()
    for relative_path in CORE_DOCUMENTS
    if relative_path.name != "AGENTS.md"
)

COMPATIBILITY_DOCUMENTS = (Path("CLAUDE.md"), Path("GEMINI.md"))
PLACEHOLDER_PATTERNS = (
    re.compile(r"\{\{[^{}\r\n]+\}\}"),
    re.compile(r"\[TODO:[^\]\r\n]+\]", re.IGNORECASE),
    re.compile(r"<(?:PROJECT|APP|REPOSITORY)_[A-Z0-9_]+>"),
)
MARKDOWN_LINK_PATTERN = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
ADR_FILENAME_PATTERN = re.compile(r"^\d{4}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$")
ADR_STATUS_PATTERN = re.compile(
    r"^(?:[-*]\s*)?(?:status|状态)\s*[:：]\s*"
    r"(?:proposed|active|superseded|retired)\s*$",
    re.IGNORECASE | re.MULTILINE,
)
ADR_SECTION_PATTERNS = {
    "Context/背景": re.compile(
        r"^##\s+(?:Context|背景|上下文)\s*$",
        re.IGNORECASE | re.MULTILINE,
    ),
    "Decision/决策": re.compile(
        r"^##\s+(?:Decision|决策)\s*$",
        re.IGNORECASE | re.MULTILINE,
    ),
    "Options considered/考虑的方案": re.compile(
        r"^##\s+(?:Options considered|考虑的方案|备选方案)\s*$",
        re.IGNORECASE | re.MULTILINE,
    ),
    "Consequences/影响": re.compile(
        r"^##\s+(?:Consequences|影响|后果)\s*$",
        re.IGNORECASE | re.MULTILINE,
    ),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate the core agent documentation in a project."
    )
    parser.add_argument("project_root", type=Path, help="Path to the project root")
    return parser.parse_args()


def read_utf8(path: Path, errors: list[str]) -> str | None:
    try:
        return path.read_text(encoding="utf-8-sig")
    except UnicodeDecodeError as error:
        errors.append(f"{path}: is not valid UTF-8 ({error})")
    except OSError as error:
        errors.append(f"{path}: could not be read ({error})")
    return None


def strip_fenced_code(text: str) -> str:
    output: list[str] = []
    fence: str | None = None

    for line in text.splitlines():
        stripped = line.lstrip()
        marker = stripped[:3]
        if marker in {"```", "~~~"}:
            if fence is None:
                fence = marker
            elif marker == fence:
                fence = None
            output.append("")
            continue
        if fence is None:
            output.append(line)
        else:
            output.append("")

    return "\n".join(output)


def normalize_link_target(raw_target: str) -> str:
    target = raw_target.strip()
    if target.startswith("<") and ">" in target:
        target = target[1 : target.index(">")]
    elif " " in target:
        target = target.split(" ", 1)[0]
    return unquote(target).replace("\\", "/")


def is_external_or_anchor(target: str) -> bool:
    lowered = target.lower()
    return (
        not target
        or target.startswith("#")
        or lowered.startswith(("http://", "https://", "mailto:", "tel:", "data:"))
    )


def resolve_local_link(project_root: Path, source: Path, target: str) -> Path:
    path_part = target.split("#", 1)[0].split("?", 1)[0]
    if path_part.startswith("/"):
        return project_root / path_part.lstrip("/")
    return source.parent / path_part


def validate_placeholders(path: Path, text: str, errors: list[str]) -> None:
    searchable = strip_fenced_code(text)
    for pattern in PLACEHOLDER_PATTERNS:
        for match in pattern.finditer(searchable):
            line_number = searchable.count("\n", 0, match.start()) + 1
            errors.append(
                f"{path}:{line_number}: unresolved placeholder {match.group(0)!r}"
            )


def validate_links(
    project_root: Path, path: Path, text: str, errors: list[str]
) -> None:
    searchable = strip_fenced_code(text)
    for match in MARKDOWN_LINK_PATTERN.finditer(searchable):
        target = normalize_link_target(match.group(1))
        if is_external_or_anchor(target):
            continue
        resolved = resolve_local_link(project_root, path, target)
        if not resolved.exists():
            line_number = searchable.count("\n", 0, match.start()) + 1
            errors.append(
                f"{path}:{line_number}: local link target does not exist: {target}"
            )


def validate_agents_index(path: Path, text: str, errors: list[str]) -> None:
    for reference in AGENT_DOCUMENT_REFERENCES:
        if reference not in text:
            errors.append(f"{path}: does not reference {reference}")


def validate_compatibility_document(
    project_root: Path, relative_path: Path, errors: list[str]
) -> None:
    path = project_root / relative_path
    if not path.exists():
        return
    text = read_utf8(path, errors)
    if text is None:
        return
    if "AGENTS.md" not in text:
        errors.append(f"{path}: compatibility document does not reference AGENTS.md")
    validate_placeholders(path, text, errors)
    validate_links(project_root, path, text, errors)


def validate_adr(path: Path, text: str, errors: list[str]) -> None:
    if not ADR_FILENAME_PATTERN.fullmatch(path.name):
        errors.append(
            f"{path}: ADR filename must use NNNN-short-title.md with lowercase words"
        )
    if ADR_STATUS_PATTERN.search(text) is None:
        errors.append(
            f"{path}: ADR status must be proposed, active, superseded, or retired"
        )
    for label, pattern in ADR_SECTION_PATTERNS.items():
        if pattern.search(text) is None:
            errors.append(f"{path}: missing ADR section {label}")


def collect_markdown_documents(project_root: Path) -> list[Path]:
    documents = [project_root / relative_path for relative_path in CORE_DOCUMENTS]
    adr_directory = project_root / "docs/project/adr"
    if adr_directory.is_dir():
        documents.extend(
            path
            for path in sorted(adr_directory.glob("*.md"))
            if path.name.lower() != "readme.md"
        )
    return documents


def validate_project(project_root: Path) -> list[str]:
    errors: list[str] = []
    if not project_root.is_dir():
        return [f"{project_root}: project root is not a directory"]

    for relative_path in CORE_DOCUMENTS:
        path = project_root / relative_path
        if not path.is_file():
            errors.append(f"{path}: required document is missing")

    for path in collect_markdown_documents(project_root):
        if not path.is_file():
            continue
        text = read_utf8(path, errors)
        if text is None:
            continue
        if not text.strip():
            errors.append(f"{path}: document is empty")
            continue
        validate_placeholders(path, text, errors)
        validate_links(project_root, path, text, errors)
        if path.name == "AGENTS.md":
            validate_agents_index(path, text, errors)
        if path.parent.name == "adr" and path.name.lower() != "readme.md":
            validate_adr(path, text, errors)

    for relative_path in COMPATIBILITY_DOCUMENTS:
        validate_compatibility_document(project_root, relative_path, errors)

    return errors


def main() -> int:
    args = parse_args()
    project_root = args.project_root.expanduser().resolve()
    errors = validate_project(project_root)

    if errors:
        print(f"Agent documentation validation failed with {len(errors)} error(s):")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Agent documentation validation passed: {project_root}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
