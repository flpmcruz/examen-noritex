// Junio developer

// Escrite un algorithmo de sort desde 0

const myList = [2, 99, 0, 56, 8, 1];

const orderList = (list = []) => {
  if (!Array.isArray(list)) return "It is not an Array";

  let filteredList = list.filter((item) => typeof item === "number");

  return filteredList.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    if (a === b) return 0;
  });
};

// console.log(orderedList(myList));

module.exports = { orderList };
