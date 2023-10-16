const { describe, expect, test } = require("@jest/globals");

const { orderList } = require("./SortingAlgorithm");

describe("Test on SortingAlgorithm", () => {
  test("Should return 'It is not an Array' if params is not an Array", () => {
    const myList = 2;
    const result = orderList(myList);

    expect(result).toBe("It is not an Array");
  });

  test("Should return ordered Array if it is array of numbers", () => {
    const myList = [2, 99, 0, 56, 8, 1];
    const result = orderList(myList);

    expect(result).toEqual([0, 1, 2, 8, 56, 99]);
  });

  test("Should return ordered Array with only numbers if it is a mixed array items", () => {
    const myList = ["i", 2, 99, "b", 0, 56, 8, 1, "s"];
    const result = orderList(myList);

    expect(result).toEqual([0, 1, 2, 8, 56, 99]);
  });
});
