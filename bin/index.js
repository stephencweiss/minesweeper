#!/usr/bin/env node

const yargs = require("yargs");

// const game = require('../index.js);

const options = yargs.usage("Usage: minesweeper [--size <size>]").options("s", {
  alias: "size",
  describe: "The size of the board (number of rows/columns).",
  type: "number"
}).argv;

const size = +argv.size || 5;

// game({ size }).on("abort", () => process.exit(1));
