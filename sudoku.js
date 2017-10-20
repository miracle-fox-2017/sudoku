"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.boardSave = []
  }

  solve() {
    let empty = this.checkEmpty()
    for (var i = 0; i < empty.length; i++) {
      debugger
      let status = false
      let row = empty[i][0]
      let col = empty[i][1]
      let value = 0
      while(!status && value < 9){
        value++
        if(this.checkRow(row, value)&&this.checkCol(col, value)&&this.checkSquare(col, row, value)){
          this.boardSave[row][col] = value.toString()
          status = true
        }
      }
    }
    return this.boardSave
  }

  // Returns a string representing the current state of the board
  board() {
    let strCount = 0
    for (var i = 0; i < 9; i++) {
      let tmp = []
      for (var j = 0; j < 9; j++) {
        tmp.push(this.string[strCount])
        strCount++
      }
      this.boardSave.push(tmp)
    }
    return this.boardSave
  }

  checkRow(row, value){
    for (var i = 0; i < 9; i++) {
      if(this.boardSave[row][i] == value){
        return false
      }
    }
    return true
  }

  checkCol(col, value){
    for (var i = 0; i < 9; i++) {
      if(this.boardSave[i][col] == value){
        return false
      }
    }
    return true
  }

  checkSquare(col, row, value){
    col = Math.floor(col/3)*3
    row = Math.floor(row/3)*3
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(this.boardSave[row+i][col+j] == value){
          return false
        }
      }
    }
    return true
  }

  checkEmpty(){
    let temp = []
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if(this.boardSave[i][j] == 0){
          temp.push([i, j])
        }
      }
    }
    return temp
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
console.log(game.board());
console.log('================================================');
console.log(game.solve());

// game.solve()
// console.log(game.checkSquare(1, 2, 8))
