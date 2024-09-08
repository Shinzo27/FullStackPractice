import { sum } from "../index";
import { describe, expect, it } from "@jest/globals";

describe("sum", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds 1 + 2 to equal 3", () => {
    expect(sum(2, 2)).toBe(3);
  });
});