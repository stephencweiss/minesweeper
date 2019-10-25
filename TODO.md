# TODOs

- [x] Generate the board with mines randomly distributed
- [x] Generate a masked board
- [ ] Render the board
  - [ ] Handle the fact that `prompt-skeleton` now returns a promise (^1.0.0)
- [ ] Add board navigation (arrows + h,j,k,l)
  - _Note_ Other keybindings will need to be added manually as `prompt-skeleton` is currently listening for the arrows for methods like up/down, left/right.
- [ ] Create board controls - flag (f) and reveal (space / r)
- [ ] Calculate game state on flag and reveal (active, win, lose)
  - [ ] Lose: reveal = isMine(true)
  - [ ] Win: two conditions - flaggedMines = mineCount† and flagCount = mineCount;‡
- [ ] Create a game play dashboard for the current session
  - [ ] mineCount & flagCount
- [ ] Create an all-time record score board (win/loss)

† flaggedMines are flags that is on the location of a mine -- do not display to the user since it would indicate that they have (in)correctly placed the flag.
‡ flagCount is the number of flags that have been placed. A winning board should not have extra flags.
