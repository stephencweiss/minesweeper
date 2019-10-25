#!/usr/bin/env node

const yargs = require("yargs");

const game = require("../src/index.js");

const options = yargs
  .usage("Usage: minesweeper [--size <size>]")
  .options("s", {
    alias: "size",
    describe: "The size of the board (number of rows/columns).",
    type: "number"
  })
  .options("d", {
    alias: "difficulty",
    describe: "The difficulty of the board ('E[asy]', 'M[edium]', 'H[ard]'",
    type: "string"
  }).argv;

const size = +options.size || 20;
const difficulty = options.difficulty
  ? options.difficulty.toLowerCase()
  : "medium";

game({ difficulty, size }); //.on("abort", () => process.exit(1));
