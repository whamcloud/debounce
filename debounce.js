/* @flow */

export default (fn: (any[]) => mixed, wait: number, immediate: Boolean) => {
  let timeout;

  return (...args: any[]): void => {
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) fn(...args);

    function later(): void {
      timeout = null;

      if (!immediate) fn(...args);
    }
  };
};
