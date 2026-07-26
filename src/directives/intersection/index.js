/**
 * @callback IntersectionHandler
 * @param {boolean} isIntersecting
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 * @returns {void}
 */

/**
 * @typedef {object} IntersectionBindingOptions
 * @property {IntersectionHandler} handler
 * @property {IntersectionObserverInit} [options]
 */

/**
 * @typedef {IntersectionHandler | IntersectionBindingOptions} IntersectionBindingValue
 */

/** @type {WeakMap<HTMLElement, { handler?: IntersectionHandler, observer: IntersectionObserver, once: boolean, quiet: boolean, initialized: boolean }>} */
const records = new WeakMap();

/**
 * @param {IntersectionBindingValue | undefined} value
 * @returns {{ handler?: IntersectionHandler, options: IntersectionObserverInit }}
 */
function readBindingValue(value) {
  if (typeof value === 'function') {
    return { handler: value, options: {} };
  }

  if (value && typeof value === 'object') {
    return {
      handler: value.handler,
      options: value.options ?? {},
    };
  }

  return { options: {} };
}

/**
 * @param {HTMLElement} element
 * @param {import('vue').DirectiveBinding<IntersectionBindingValue>} binding
 * @returns {void}
 */
function mountIntersection(element, binding) {
  if (typeof IntersectionObserver === 'undefined') {
    return;
  }

  const { handler, options } = readBindingValue(binding.value);
  const observer = new IntersectionObserver((entries, currentObserver) => {
    const record = records.get(element);

    if (!record || record.observer !== currentObserver) {
      return;
    }

    const isIntersecting = entries.some((entry) => entry.isIntersecting);
    const isInitialDelivery = !record.initialized;
    record.initialized = true;

    if (handler && !(record.quiet && isInitialDelivery)) {
      handler(isIntersecting, entries, currentObserver);
    }

    if (record.once && isIntersecting) {
      currentObserver.unobserve(element);
      records.delete(element);
    }
  }, options);

  records.set(element, {
    handler,
    observer,
    once: Boolean(binding.modifiers?.once),
    quiet: Boolean(binding.modifiers?.quiet),
    initialized: false,
  });
  observer.observe(element);
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function unmountIntersection(element) {
  const record = records.get(element);

  if (!record) {
    return;
  }

  record.observer.unobserve(element);
  records.delete(element);
}

/** @type {import('vue').ObjectDirective<HTMLElement, IntersectionBindingValue>} */
const Intersection = {
  mounted: mountIntersection,
  updated(element, binding) {
    if (!records.has(element)) {
      return;
    }

    unmountIntersection(element);
    mountIntersection(element, binding);
  },
  unmounted: unmountIntersection,
};

export { Intersection };
export default Intersection;
