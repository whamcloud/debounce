// @flow

// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

export default (
  fn: (any[]) => mixed,
  wait: number,
  immediate?: boolean = false
) => {
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
