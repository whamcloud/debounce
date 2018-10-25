import debounce from "../debounce";

import { describe, beforeEach, it, expect, jasmine } from "./jasmine.js";

describe("debounce", function() {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy("spy");
  });

  it("should be a function", () => {
    expect(debounce).toEqual(jasmine.any(Function));
  });

  it("should call on the leading edge", function() {
    debounce(spy, 1000, true)();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call after timeout expires", function(done) {
    debounce(done, 0)();
  });

  it("should debounce successive calls within wait", function(done) {
    const debouncer = debounce(spy, 0);

    debouncer("a", "b", "c");
    debouncer("a", "b", "c");

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith("a", "b", "c");
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });

  it("should debounce immediate calls", done => {
    const debouncer = debounce(spy, 0, true);

    debouncer("a", "b", "c");
    debouncer("a", "b", "c");

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith("a", "b", "c");
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });
});
