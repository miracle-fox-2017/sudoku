"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string
  }

  solve() {
    

  }

  // Returns a string representing the current state of the board
  board() {
    let line = [];
    let batas = '|';
    let jum = 0;

    for (var i = 0; i < 9; i++) {
      line.push([])
      for (var j= 0; j < 9;j++) {
        line[i].push(this.str[jum])
        line[i].join();
        jum+=1
      }
    }
    return line;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())
