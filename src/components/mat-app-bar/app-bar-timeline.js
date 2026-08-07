const sourceRegistrations = new WeakMap();
const scopeRegistrations = new WeakMap();

function updateNames(element, property, registration) {
  const names = [registration.initialValue, ...registration.names]
    .filter((value) => value && value !== 'none');

  const declaration = element.style;

  declaration[property] = names.join(', ');
}

function registerName(registry, element, property, name) {
  let registration = registry.get(element);

  if (!registration) {
    registration = {
      initialValue: element.style[property],
      names: new Set(),
    };
    registry.set(element, registration);
  }

  registration.names.add(name);
  updateNames(element, property, registration);

  return () => {
    registration.names.delete(name);

    if (registration.names.size > 0) {
      updateNames(element, property, registration);
      return;
    }

    const declaration = element.style;

    declaration[property] = registration.initialValue;
    registry.delete(element);
  };
}

/**
 * 在滚动源与作用域上登记具名 CSS scroll timeline。
 *
 * @param {{name: string, scope: HTMLElement, source: HTMLElement}} options
 * @returns {() => void}
 */
export function registerAppBarTimeline({ name, scope, source }) {
  const sourceRegistration = sourceRegistrations.get(source);
  const initialAxis = sourceRegistration?.initialAxis ?? source.style.scrollTimelineAxis;
  const unregisterSource = registerName(
    sourceRegistrations,
    source,
    'scrollTimelineName',
    name,
  );
  const currentSourceRegistration = sourceRegistrations.get(source);

  currentSourceRegistration.initialAxis = initialAxis;
  const sourceStyle = source.style;

  sourceStyle.scrollTimelineAxis = 'block';
  const unregisterScope = registerName(
    scopeRegistrations,
    scope,
    'timelineScope',
    name,
  );

  return () => {
    unregisterScope();
    unregisterSource();

    if (!sourceRegistrations.has(source)) {
      sourceStyle.scrollTimelineAxis = initialAxis;
    }
  };
}
/**
 * 查找离元素最近、能够沿块轴滚动的祖先。
 *
 * @param {HTMLElement} element
 * @returns {HTMLElement}
 */
export function findNearestScrollSource(element) {
  let ancestor = element.parentElement;

  while (ancestor) {
    const style = window.getComputedStyle(ancestor);
    const overflow = style.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow)) {
      return ancestor;
    }

    ancestor = ancestor.parentElement;
  }

  return document.scrollingElement instanceof HTMLElement
    ? document.scrollingElement
    : document.documentElement;
}

/**
 * 查找两个元素最近的共同祖先，找不到时回退到 documentElement。
 *
 * @param {HTMLElement} first
 * @param {HTMLElement} second
 * @returns {HTMLElement}
 */
export function findTimelineScope(first, second) {
  const ancestors = new Set();
  let current = first;

  while (current) {
    ancestors.add(current);
    current = current.parentElement;
  }

  current = second;

  while (current) {
    if (ancestors.has(current)) {
      return current;
    }

    current = current.parentElement;
  }

  return document.documentElement;
}
