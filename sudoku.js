"use strict"

class Sudoku {
  constructor(board_string,emptyPos) {
    this.row = [];
    this.data = board_string
    this.emptyPos = []
  }

  solve() {
    let limit = 9;
    let row = 0;
    let col = 0;
    let value = 0;
    let found = '';
    for(let i = 0; i < this.emptyPos.length;){
      row = this.emptyPos[i][0];
      col = this.emptyPos[i][1];
      value = this.row[row][col];
      found = false
      while(found !== true && value <= limit){
        if(game.allCheck(col,row,value) === true){
          found = true;
          this.row[row][col] = value.toString();
          i++
        }
        else{
          value++
        }
      }
      if(found !== true){
        this.row[row][col] = 0;
        i--
      }
    }
    return this.row
  }

  // Returns a string representing the current state of the board
  board() {
    for(let i = 0; i < 9; i++){
      for(let y = 0; y < 9; y++){
        this.row.push(this.data.split('',9));
        this.data = this.data.slice(9,this.data.length);
      }
      return this.row
    }
  }

  saveEmptyPos() {
    for(let i = 0; i < this.row.length; i++){
      for(let y = 0; y < this.row[i].length; y++){
        if(this.row[i][y] === '0'){
          this.emptyPos.push([i,y])
        }
      }
    }
    return this.emptyPos
  }

  rowCheck(row,value) {
    for(let i = 0; i < this.row.length; i++){
      if(this.row[row][i] === value.toString()){
        return false
      }
    }
    return true
  }

  colCheck(col,value) {
    for(let i = 0; i < this.row.length; i++){
      if(this.row[i][col] === value.toString()){
        return false
      }
    }
    return true
  }

  regCheck(col,row,value) {
    let colCorner = 0;
    let rowCorner = 0;
    let squareSize = 3;
    while(col >= colCorner + squareSize){
      colCorner += squareSize
    }
    while(row >= rowCorner + squareSize){
      rowCorner += squareSize
    }
    for(let i = rowCorner; i < rowCorner + squareSize; i++){
      for(let y = colCorner; y < colCorner + squareSize; y++){
        if(this.row[i][y] === value.toString()){
          return false
        }
      }
    }
    return true
  }

  allCheck(col,row,value){
    if(game.colCheck(col,value) === true && game.rowCheck(row,value) === true && game.regCheck(col,row,value) === true){
      return true
    }
    else{
      return false
    }
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
game.board()
game.saveEmptyPos()
console.log(game.solve())
