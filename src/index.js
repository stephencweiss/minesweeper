"use strict";

// const esc = require("ansi-escapes");
// const chalk = require("chalk");
// const wrap = require("prompt-skeleton");

const {
  calculateCellCounts,
  generateRow
} = require("./helpers/boardGenHelpers");
const { DIFFICULTY_LEVEL } = require("./constants");
/**
 *
 * @param {*} options - An object that will contain size of the board (rows and columns);
 */
function minesweeper(options) {
  let mineCount = 0;
  let unopened = 0;

  const minesMap = generateRow(options.size, () =>
    generateRow(options.size, () => {
      const isMine = Math.random() <= DIFFICULTY_LEVEL[options.difficulty];
      if (isMine) mineCount += 1;
      else unopened += 1;
      return isMine; // puts a 1 if a mine; 0 otherwise;
    })
  );

  const flaggedMap = generateRow(options.size, () =>
    generateRow(options.size, () => false)
  );
  const openedMap = generateRow(options.size, () =>
    generateRow(options.size, () => false)
  );
  const countMap = generateRow(options.size, () =>
    generateRow(options.size, () => 0)
  );
  calculateCellCounts(countMap, minesMap);

  console.log({
    countMap,
    minesMap,
    unopened,
    mineCount,
    openedMap,
    flaggedMap
  });
}

minesweeper({ size: 10, difficulty: "medium" });

module.exports = Object.assign(minesweeper, {});
