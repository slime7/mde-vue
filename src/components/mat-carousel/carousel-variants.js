/** Material 3 Expressive 官方 Carousel 六种布局的公共名称。 */
export const CAROUSEL_VARIANTS = Object.freeze([
  'multi-browse',
  'uncontained',
  'uncontained-multi-aspect',
  'hero',
  'hero-center-aligned',
  'full-screen',
]);

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isCarouselVariant(value) {
  return typeof value === 'string' && CAROUSEL_VARIANTS.includes(value);
}
