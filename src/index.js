"use strict";

// const esc = require("ansi-escapes");
// const chalk = require("chalk");
// const wrap = require("prompt-skeleton");

const {
  countCells,
  updateCountMapWithCounts,
  generateMinesMap,
  generateEmptyMap
} = require("./helpers/boardGenHelpers");

/**
 *
 * @param {*} options - An object that will contain size of the board (rows and columns);
 */
function setupMinesweeper(options) {
  const height = options.size;
  const width = options.size;

  const minesMap = generateMinesMap(options.size, options.difficulty);
  const flaggedMap = generateEmptyMap(options.size, false);
  const openedMap = generateEmptyMap(options.size, false);
  const countMap = generateEmptyMap(options.size, 0);

  updateCountMapWithCounts(countMap, minesMap, height, width);

  let [cells, mines, unopened] = countCells(minesMap, height, width);
  console.log({ cells, mines, unopened, minesMap, flaggedMap, openedMap });
}

module.exports = Object.assign(setupMinesweeper, {});
