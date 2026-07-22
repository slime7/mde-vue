export const LIST_INTERACTIONS = [
  'none',
  'single-action',
  'multi-action',
  'single-select',
  'multi-select',
];

export const MAT_LIST_KEY = Symbol('mat-list');
export const MAT_LIST_GROUP_ACTIVATOR_KEY = Symbol('mat-list-group-activator');

/**
 * @param {string} interaction
 * @returns {boolean}
 */
export function isSelectableInteraction(interaction) {
  return interaction === 'single-select' || interaction === 'multi-select';
}
