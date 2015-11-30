/* @flow */

export default function debounce (fn: Function, wait: number, immediate: Boolean): Function {
  let timeout;

  return function debounceTick (): void {
    const args = arguments;
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow)
      fn(...args);

    function later (): void {
      timeout = null;

      if (!immediate)
        fn(...args);
    }
  };
}
