const { describe, expect, test } = require("@jest/globals");
const { evaluate } = require("./spreadsheet");

describe("Test on Spreadsheet", () => {
  describe("validations", () => {
    test("Should return 'Invalid matrix' if it is invalid matrix", () => {
      const matrix = "invalid matrix";
      const result = evaluate(matrix);
      expect(result).toBe("Invalid matrix");
    });
    test("Should return 'Empty matrix' if matrix.length === 0", () => {
      const matrix = [];
      const result = evaluate(matrix);
      expect(result).toBe("Empty matrix");
    });
    test("Should return 'Matrix too large' if matrix.length > 26", () => {
      const matrix = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
      ];
      const result = evaluate(matrix);
      expect(result).toBe("Matrix too large");
    });
  });

  describe("Should return Errors if formula is invalid", () => {
    test("Should return 'ZeroDivisionError", () => {
      const matrixToEvaluate = [0, "=2/A1"];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ZeroDivisionError");
    });
    test("Should return 'ZeroDivisionError", () => {
      const matrixToEvaluate = [[1, "=A1 - 1", "=A1 / 0"]];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ZeroDivisionError");
    });
    test("Should return 'ValueError'", () => {
      const matrixToEvaluate = [[1, "=A1 +"]];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ValueError");
    });
    test("Should return 'ValueError'", () => {
      const matrixToEvaluate = [[1, "=A1 $ A1"]];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ValueError");
    });
    test("Should return 'ValueError'", () => {
      const matrixToEvaluate = [[1, "=A1+5+6+7"]];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ValueError");
    });
    test("Should return 'ReferenceError'", () => {
      const matrixToEvaluate = [
        [1, "2"],
        ["=C1", 4],
      ];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ReferenceError");
    });
    test("Should return 'ValueError'", () => {
      const matrixToEvaluate = [["A1"]];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ValueError");
    });
    test("Should return 'ValueError'", () => {
      const matrixToEvaluate = [[""]];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ValueError");
    });
    test("Should return 'ValueError' with circular reference", () => {
      const matrixToEvaluate = [
        ["=B1 + 1", "=A1 + 1"],
        ["=A1 + 1", "=B2 + 1"],
      ];
      const result = evaluate(matrixToEvaluate);
      expect(result).toBe("ValueError");
    });
  });

  describe("Test on evaluate matrix", () => {
    test("Should return correct matrix with example1", () => {
      const matrixToEvaluate = [1, "=2+2"];
      const correctExpected = [1, 4];
      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
    });
    test("Should return correct matrix with example2", () => {
      const matrixToEvaluate = [
        [1, "2"],
        ["3", 4],
      ];
      const correctExpected = [
        [1, 2],
        [3, 4],
      ];
      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
    });
    test("Should return correct matrix with example3", () => {
      const matrixToEvaluate = [
        [1, "2"],
        ["=A1", 4],
      ];
      const correctExpected = [
        [1, 2],
        [1, 4],
      ];
      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
    });
    test("Should return correct matrix with example4", () => {
      const matrixToEvaluate = [
        [1, "=A1+1"],
        [3, "=A2+1"],
      ];
      const correctExpected = [
        [1, 2],
        [3, 4],
      ];
      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
    });
    test("Should return correct matrix with example5", () => {
      const matrixToEvaluate = [[1, "=A1"]];
      const correctExpected = [[1, 1]];
      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
    });
    test("Should return correct matrix with example6", () => {
      const matrixToEvaluate = [
        [1, "=1-1", "=A1+1", "=B1+1"],
        [3, "=A2+1", "5", "=B3+1"],
        [3, "6", "=B3+1", "=A4+1"],
        [8, "=A4+1", "=B1+5", "=C2*B3"],
      ];
      const correctExpected = [
        [1, 0, 2, 1],
        [3, 4, 5, 7],
        [3, 6, 7, 9],
        [8, 9, 5, 30],
      ];
      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
    });
    test("Should return correct matrix with example7 negative numbers", () => {
      const matrixToEvaluate = [[1, "=A1 / -1"]];
      const correctExpected = [[1, -1]];
      const matrixToEvaluate1 = [[1, "=-2 + a1"]];
      const correctExpected1 = [[1, -1]];
      const matrixToEvaluate2 = [[1, "=A1 + -5"]];
      const correctExpected2 = [[1, -4]];
      const matrixToEvaluate3 = [[1, "=-A1 + 1"]];
      const correctExpected3 = [[1, 0]];

      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
      const result1 = evaluate(matrixToEvaluate1);
      expect(result1).toEqual(correctExpected1);
      const result2 = evaluate(matrixToEvaluate2);
      expect(result2).toEqual(correctExpected2);
      const result3 = evaluate(matrixToEvaluate3);
      expect(result3).toEqual(correctExpected3);
    });
    test("Should return correct matrix with example8 recursive", () => {
      const matrixToEvaluate = [
        [1, "=1-1", "=A1+1", "=B1+1"],
        [3, "=A2+1", "5", "=B3+1"],
        [3, "6", "=B3+1", "=B2+1"],
        [8, "=A4+1", "=B1+5", "=C2*B3"],
      ];
      const correctExpected = [
        [1, 0, 2, 1],
        [3, 4, 5, 7],
        [3, 6, 7, 5],
        [8, 9, 5, 30],
      ];
      const result = evaluate(matrixToEvaluate);
      expect(result).toEqual(correctExpected);
    });

    /* Falto por resolver este Caso */
    // test("Should return correct matrix with example9 highly recursive", () => {
    //   const matrixToEvaluate = [
    //     ["=C1+5", "=A3/2", "=c2-1"],
    //     ["=b3+7", 1, "=B1*4"],
    //     ["=B2+5", "=a1/5", "=A2-2"],
    //   ];
    //   const correctExpected = [
    //     [16, 3, 11],
    //     [10.2, 1, 12],
    //     [6, 3.2, 8.2],
    //   ];

    //   const result = evaluate(matrixToEvaluate);
    //   console.log(result);
    //   expect(result).toEqual(correctExpected);
    // });
  });
});
