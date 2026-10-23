/**
 * 将导航链接与当前路由归一化为同一比较形式。
 *
 * @param {string} path 导航链接或当前路由路径。
 * @param {string} base VitePress 部署 base。
 * @returns {string} 去掉 base、扩展名和尾部斜杠的站内路径。
 */
export default function normalizeNavPath(path, base = '/') {
  if (!path) {
    return '';
  }

  let normalizedPath = path.replace(/\.html$/, '').replace(/\.md$/, '');
  const normalizedBase = base.replace(/\/+$/, '');

  if (
    normalizedBase
    && (
      normalizedPath === normalizedBase
      || normalizedPath.startsWith(`${normalizedBase}/`)
    )
  ) {
    normalizedPath = normalizedPath.slice(normalizedBase.length);
  }

  return normalizedPath.replace(/\/$/, '') || '/';
}
