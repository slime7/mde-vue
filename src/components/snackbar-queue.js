/**
 * @typedef {object} SnackbarQueueEntry
 * @property {() => void} activate
 */

/** @type {SnackbarQueueEntry[]} */
const queue = [];
/** @type {SnackbarQueueEntry | null} */
let activeEntry = null;

function activateNext() {
  if (activeEntry || queue.length === 0) {
    return;
  }

  activeEntry = queue.shift();
  activeEntry.activate();
}

/**
 * @param {SnackbarQueueEntry} entry
 */
export function enqueueSnackbar(entry) {
  if (entry === activeEntry || queue.includes(entry)) {
    return;
  }

  queue.push(entry);
  activateNext();
}

/**
 * @param {SnackbarQueueEntry} entry
 */
export function cancelSnackbar(entry) {
  const index = queue.indexOf(entry);

  if (index !== -1) {
    queue.splice(index, 1);
  }
}

/**
 * @param {SnackbarQueueEntry} entry
 */
export function completeSnackbar(entry) {
  if (activeEntry !== entry) {
    return;
  }

  activeEntry = null;
  activateNext();
}
