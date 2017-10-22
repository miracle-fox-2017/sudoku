"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.mainBoard = []
  }

  solve() {
    let empty = this.checkEmpty()
    for (var i = 0; i < empty.length; i++) {
      debugger
      let status = false
      let col = empty[i][1]
      let row = empty[i][0]
      let value = this.mainBoard[row][col]+1
      while(!status && value <= 9){
        if(this.checkRow(row, value)&&this.checkCol(col, value)&&this.checkSquare(col, row, value)){
          this.mainBoard[row][col] = value
          status = true
        }
        value++
      }
      if(!status){ // jika status masih false mundur ke index 0 sebelumnya
        this.mainBoard[row][col] = 0
        i = i-2
      }
    }
    return this.mainBoard
  }

  board() {
    let strCount = 0
    for (var i = 0; i < 9; i++) {
      let tmp = []
      for (var j = 0; j < 9; j++) {
        tmp.push(parseInt(this.string[strCount]))
        strCount++
      }
      this.mainBoard.push(tmp)
    }
    return this.mainBoard
  }

  checkRow(row, value){
    for (var i = 0; i < 9; i++) {
      if(this.mainBoard[row][i] === value){
        return false
      }
    }
    return true
  }

  checkCol(col, value){
    for (var i = 0; i < 9; i++) {
      if(this.mainBoard[i][col] === value){
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
        if(this.mainBoard[row+i][col+j] === value){
          return false
        }
      }
    }
    return true
  }

  checkEmpty(){ // cek posisi index 0
    let temp = []
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if(this.mainBoard[i][j] === 0){
          temp.push([i, j])
        }
      }
    }
    return temp
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
// var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split('\n')

// for (var i = 0; i < board_string.length; i++) { // tes dengan looping sebanyak isi sample file
//   console.log("\x1B[2J")
var game = new Sudoku(board_string[0])

console.log('Sudoku Board ');
console.log(game.board());
console.log('=================================');
console.log('Sudoku Solve ');
console.log(game.solve());
// game.sleep(500)
// }
