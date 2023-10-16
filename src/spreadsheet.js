const indice = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26,
};

const calcular = (data = "", matrix = []) => {
  let formula = data.substring(1).replace(/\s/g, "");
  let result;
  let referenceValues = [];

  const getValuesFromMatrix = (letter, number) => {
    if (number >= 1 && number <= matrix.length) {
      return Array.isArray(matrix[number - 1])
        ? matrix[number - 1][indice[letter.toUpperCase()] - 1]
        : matrix[number - 1];
    }
  };

  const validateIfIsAReference = (val1, val2) => {
    let value1 = getValueFromReference(val1);
    let value2 = getValueFromReference(val2);
    return [value1, value2];
  };

  const getValueFromReference = (value) => {
    let matchValue = String(value).match(/^(-?[A-Z])(\d+)/i);

    if (matchValue) {
      if (referenceValues.includes(matchValue[0])) return "";
      referenceValues.push(matchValue[0]);

      let letter = matchValue[1];
      let number = parseInt(matchValue[2]);
      let isNegative = false;

      if (letter.startsWith("-")) {
        letter = letter.substring(1);
        isNegative = true;
      }

      value = getValuesFromMatrix(letter, number);
      if (isNegative) value = -value;

      if (String(value).startsWith("=")) {
        value = value.substring(1);
      }

      if (String(value).match(/^(-?[A-Z])(\d+)/i)) {
        value = getValueFromReference(value);
      }
    }
    return value;
  };

  if (formula.includes("*")) {
    const values = formula.split("*");
    if (values.length > 2) return "ValueError";
    const [value1, value2] = values;
    [val1, val2] = validateIfIsAReference(value1, value2);
    if (val1 === "" || val2 === "") return "ValueError";

    if (!isNaN(val1) && !isNaN(val2)) {
      result = parseFloat(val1) * parseFloat(val2);
      return result;
    }
  }

  if (formula.includes("/")) {
    const values = formula.split("/");
    if (values.length > 2) return "ValueError";
    const [value1, value2] = values;
    [val1, val2] = validateIfIsAReference(value1, value2);
    if (val1 === "" || val2 === "") return "ValueError";

    if (parseFloat(val2) === 0) return "ZeroDivisionError";

    if (!isNaN(val1) && !isNaN(val2)) {
      result = parseFloat(val1) / parseFloat(val2);
      return result;
    }
  }

  if (formula.includes("+")) {
    const values = formula.split("+");
    if (values.length > 2) return "ValueError";
    const [value1, value2] = values;

    [val1, val2] = validateIfIsAReference(value1, value2);
    if (val1 === "" || val2 === "") return "ValueError";

    if (!isNaN(val1) && !isNaN(val2)) {
      result = parseFloat(val1) + parseFloat(val2);
      return result;
    }
  }

  if (formula.includes("-")) {
    const values = formula.split("-");
    if (values.length > 2) return "ValueError";
    const [value1, value2] = values;

    [val1, val2] = validateIfIsAReference(value1, value2);
    if (val1 === "" || val2 === "") return "ValueError";

    if (!isNaN(val1) && !isNaN(val2)) {
      result = parseFloat(val1) - parseFloat(val2);
      return result;
    }
  }

  let match = formula.match(/^([A-Z])([1-9]|1[0-9]|2[0-6])$/i);
  if (match) {
    let letter = match[1];
    let number = parseInt(match[2]);
    let value = getValuesFromMatrix(letter, number);
    return value;
  } else {
    return "ValueError";
  }
};

const evaluate = (m) => {
  /* Validations */
  if (!Array.isArray(m)) return "Invalid matrix";
  if (m.length === 0) return "Empty matrix";
  if (m.length > 26) return "Matrix too large";
  /*  */
  let matrix = [...m];
  let error = "";

  for (let i = 0; i <= matrix.length - 1; i++) {
    /*  */
    if (Array.isArray(matrix[i])) {
      /*  */
      for (let j = 0; j <= matrix[i].length - 1; j++) {
        /*  */
        if (String(matrix[i][j]).replace(/\s/g, "").startsWith("=")) {
          const result = calcular(matrix[i][j], matrix);
          if (result === "ZeroDivisionError") {
            error = result;
            break;
          } else if (result === undefined) {
            error = "ReferenceError";
            break;
          } else if (result === "ValueError") {
            error = "ValueError";
            break;
          }
          matrix[i][j] = result;
        } else {
          if (matrix[i][j] === "") return "ValueError";
          if (!isNaN(matrix[i][j])) {
            matrix[i][j] = parseFloat(matrix[i][j]);
          } else {
            error = "ValueError";
            break;
          }
        }
      }
    } else {
      /*  */
      if (String(matrix[i]).startsWith("=")) {
        const result = calcular(matrix[i], matrix);
        if (result === "ZeroDivisionError") {
          error = result;
          break;
        } else if (result === undefined) {
          error = "ReferenceError";
          break;
        } else if (result === "ValueError") {
          error = "ValueError";
          break;
        }
        matrix[i] = result;
      } else {
        if (!isNaN(matrix[i])) {
          matrix[i] = parseFloat(matrix[i]);
        } else return "ValueError";
      }
    }
  }

  return error ? error : matrix;
};

module.exports = { evaluate };
