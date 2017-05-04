import debounce from '../debounce';
import { flow, invokeMethod } from '@mfl/fp';

import { describe, beforeEach, it, expect, jasmine } from './jasmine.js';

describe('debounce', function() {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should be a function', () => {
    expect(debounce).toEqual(jasmine.any(Function));
  });

  it('should call on the leading edge', function() {
    debounce(spy, 1000, true)();

    expect(spy).toHaveBeenCalledOnce();
  });

  it('should call after timeout expires', function(done) {
    debounce(done, 0)();
  });

  it('should debounce successive calls within wait', function(done) {
    const debouncer = debounce(spy, 0);

    const expected = flow(
      expect,
      invokeMethod('toHaveBeenCalledOnceWith', ['a', 'b', 'c']),
      done
    ).bind(null, spy);

    debouncer('a', 'b', 'c');
    debouncer('a', 'b', 'c');

    setTimeout(expected, 10);
  });

  it('should debounce immediate calls', done => {
    const debouncer = debounce(spy, 0, true);

    const expected = flow(
      expect,
      invokeMethod('toHaveBeenCalledOnceWith', ['a', 'b', 'c']),
      done
    ).bind(null, spy);

    debouncer('a', 'b', 'c');
    debouncer('a', 'b', 'c');

    setTimeout(expected, 10);
  });
});
