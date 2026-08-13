/**
 * @param {string} value
 * @returns {string[]}
 */
function readAnchorNames(value) {
  return value.split(',').map((name) => name.trim()).filter(Boolean);
}

/**
 * @param {HTMLElement} element
 * @param {string} anchorName
 * @returns {void}
 */
function addAnchorName(element, anchorName) {
  const names = readAnchorNames(element.style.getPropertyValue('anchor-name'));

  if (!names.includes(anchorName)) {
    element.style.setProperty('anchor-name', [...names, anchorName].join(', '));
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} anchorName
 * @returns {void}
 */
function removeAnchorName(element, anchorName) {
  const names = readAnchorNames(element.style.getPropertyValue('anchor-name'))
    .filter((name) => name !== anchorName);

  if (names.length > 0) {
    element.style.setProperty('anchor-name', names.join(', '));
  } else {
    element.style.removeProperty('anchor-name');
  }
}

export { addAnchorName, removeAnchorName };
