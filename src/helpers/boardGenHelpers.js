"use strict";

function generateRow(size, fn) {
  return new Array(size).fill(null).map(fn);
}

/**
 * Looks at a cell and determines if it's equivalent in the bomb map is adjacent a bomb in any direction.
 * returns the count
 *
 */
function calculateCellCounts(countMap, minesMap) {
  const height = countMap.length;
  const width = countMap[0].length;
  let count = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      countMap[y][x] = calculateCellCount(x, y, height - 1, minesMap, count);
    }
  }
  return countMap;
}

function calculateCellCount(x, y, mapSize, minesMap, count) {
  let newCount = count;

  // make sure cell is valid (i.e. within the board)
  if (x > 0 && y > 0) newCount += minesMap[y - 1][x - 1]; // top left x-1, y-1
  if (y > 0) newCount += minesMap[y - 1][x]; // top center x, y-1
  if (x < mapSize && y > 0) newCount += minesMap[y - 1][x + 1]; // top right x+1, y-1
  if (x > 0 && y < mapSize) newCount += minesMap[y][x - 1]; // center left x-1, y
  if (x < mapSize) newCount += minesMap[y][x + 1]; // center right, x+1 , y
  if (x > 0 && y < mapSize) newCount += minesMap[y + 1][x - 1]; // bottom left x-1, y+1
  if (y < mapSize) newCount += minesMap[y + 1][x]; // bottom center x, y+1
  if (x < mapSize && y < mapSize) newCount += minesMap[y + 1][x + 1]; // bottom right x+1, y+1

  return newCount;
}

module.exports = { generateRow, calculateCellCounts };
