"use strict";

const esc = require("ansi-escapes");
const chalk = require("chalk");
const wrap = require("prompt-skeleton");

const {
  countCells,
  updateCountMapWithCounts,
  generateMinesMap,
  generateEmptyMap
} = require("./helpers/boardGenHelpers");

const gameMethods = {
  moveCursor: function moveCursor(x, y) {
    this.cursorX = x;
    this.cursorY = y;
  },

  up: function moveUp() {
    if (this.cursorY === 0) return this.bell(); //can't move up from the top of the board
    this.moveCursor(this.cursorX, this.cursorY - 1);
    this.render();
  },

  down: function moveDown() {
    if (this.cursorY === this.minesMap.length - 1) return this.bell(); //can't move down from the bottom of the board
    this.moveCursor(this.cursorX, this.cursorY + 1);
    this.render();
  },

  left: function moveLeft() {
    if (this.cursorX === 0) return this.bell(); //can't move left from the left side of the board
    this.moveCursor(this.cursorX - 1, this.cursorY);
    this.render();
  },

  right: function moveRight() {
    if (this.cursorX === this.minesMap.length - 1) return this.bell(); //can't move right from the right side of the board
    this.moveCursor(this.cursorX + 1, this.cursorY);
    this.render();
  },

  // 💣📍🏴‍☠️🏁🚩
  render: function renderBoard() {
    const isGameOver = this.aborted;
    const isWon = this.done && !this.aborted;
    const headerEmoji = isGameOver ? "😵" : isWon ? "🦄" : "🙏";
    let output = `Game Status: ${headerEmoji} \n ${chalk.grey(
      `There are ${this.mines} on the map`
    )}`;

    // Paint map
    for (let y = 0; y < this.minesMap.length; y += 1) {
      for (let x = 0; x < this.minesMap.length; x += 1) {
        // Determine cell value on various maps
        const isFlagged = this.flaggedMap[y][x];
        const isOpened = this.openedMap[y][x];
        const isMine = this.minesMap[y][x];
        const count = this.countMap[y][x];
        const selectedCell = x === this.cursorX && y === this.cursorY;

        let cell;
        if (isFlagged && !isGameOver) cell = "🚩";
        else if (isMine && isWon) cell = "🚩";
        else if (!isGameOver && !isOpened) cell = "🤔";
        // alternative '?'
        else if (isMine) cell = selectedCell ? "💥" : "💣";
        else if (count === 1) cell = chalk.blue(count);
        else if (count === 2) cell = chalk.yellow(count);
        else if (count === 3) cell = chalk.orange(count);
        else if (count >= 4) cell = chalk.bold.red(count);
        else cell = "x"; // should have 0 of these;

        // Update output
        output += selectedCell && !isWon ? chalk.bgWhite.bold(cell) : cell; // highlight the background for the cell we're on
      }
      output += "\n"; // paint the next row
    }
    this.output.write(esc.eraseLines(this.mines.length + 3) + output); // Each time we render, we erase the previous board
  }
};

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

  const [cells, mines, unopened] = countCells(minesMap, height, width);

  let game = Object.assign(Object.create(gameMethods), {
    cursorX: 0, // we start in the top left of the board
    cursorY: 0,
    size: options.size,
    done: false, // game starts in a false state and can be evaluated later
    aborted: false, // user can abort the game
    mines, // the # of mines on the board
    cells, // the # of cells on the board
    unopened, // the # of unopened cells on the board
    minesMap,
    flaggedMap,
    openedMap,
    countMap // the various boards
  });

  return wrap(game);
  // .then(res => {
  //   console.log(`yay!`, JSON.stringify(res, null, 2));
  //   return res;
  // })
  // .catch(error => console.log(error));
}

module.exports = Object.assign(setupMinesweeper, { gameMethods });
