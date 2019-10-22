"use strict";

// const esc = require("ansi-escapes");
// const chalk = require("chalk");
// const wrap = require("prompt-skeleton");

const {
  countCells,
  updateCountMapWithCounts,
  generateMinesMap,
  generateRow
} = require("./helpers/boardGenHelpers");

/**
 *
 * @param {*} options - An object that will contain size of the board (rows and columns);
 */
function minesweeper(options) {
  const height = options.size;
  const width = options.size;

  const minesMap = generateMinesMap(options.size, options.difficulty);
  const flaggedMap = generateRow(options.size, () =>
    generateRow(options.size, () => false)
  );
  const openedMap = generateRow(options.size, () =>
    generateRow(options.size, () => false)
  );
  const countMap = generateRow(options.size, () =>
    generateRow(options.size, () => 0)
  );

  updateCountMapWithCounts(countMap, minesMap, height, width);

  const [cells, mines, unopened] = countCells(minesMap, height, width);
  console.log({ cells, mines, unopened, minesMap, flaggedMap, openedMap });
}

module.exports = Object.assign(minesweeper, {});
