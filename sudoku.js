"use strict"

class Sudoku {
    constructor(board_string){
      this.size=9;
      this.boardBox=[];
      this.boardVertical=[];
      this.boardHorizontal=[];
      this.angka=board_string;
    }
    solve(){}
    // Returns a string representing the current state of the board
    board(){}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

//var game = new Sudoku(board_string);
var game = new Sudoku("105802000090076405200400819019007306762083090000061050007600030430020501600308900");

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log(game.board());
