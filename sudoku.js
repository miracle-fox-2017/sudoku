"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = this.board(board_string);
    this.arrKosong = this.arrZero;
    this.arr = [];
    this.tebakan = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  }

  solve() {
    for (let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(this.board_string[i][j] == '0'){
          this.tebakan.forEach(tebakan => {
            if(this.getRows(i,tebakan) && this.getColumn(j,tebakan) && this.get3X3(i,j,tebakan)){
              this.board_string[i][j] = tebakan;
            }
          });
        }
      }
    }
    return this.board_string
  }
  // Returns a string representing the current state of the board
  board() {
      let board = []; let counter = 0;
      for(let i = 0; i < 9; i ++){
        board.push([])
      for(let j = 0; j < 9; j++){
        board[i].push(board_string[counter])
        counter+= 1
      }
    }
  return board
  }
  arrZero(){ //method mencari angka 0
    let result = [];
    for(let i = 0; i < this.board().length; i++){
      for(let j = 0; j < this.board()[i].length; j++){
        if(this.board()[i][j] == '0'){
          result.push([i, j])
        }
      }
    }
    return result;
  }
  getRows(baris, search){ //(baris keberapa, angkatebakan)
    let rows = this.board_string[baris];
    // console.log(rows);
    for(let i = 0; i < rows[baris].length; i++){
      if(rows[i] === search){return false} //cari gibaris udah sama blm, kalo udah return false
      else{return true}
    }
  }
  getColumn(column, number){//(column keberapa, angkatebakan)
    let arr = [];
    for(let i = 0; i < 9; i++){
      arr.push(this.board_string[i][column])
      // console.log(arr);
    }
    for(let j = 0; j < 9; j++){
      if(arr[j] === number){return false}
      else{return true}
    }
  }
  get3X3 (rows, column, number){
    let checkRows = Math.floor(rows / 3) * 3; //0,3,6 (ditambah 3 buat batas)
    let checkColumn = Math.floor(column / 3) * 3;//0,3,6 (ditambah 3 buat batas)
    let arr = [];
    for(let i = checkRows; i < checkRows + 3; i++){
      for(let j = checkColumn; j < checkColumn + 3; j++){
        arr.push(this.board_string[i][j])
        // console.log(arr);
      }
    }
    return (arr.indexOf(number) === -1) ? true : false
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
console.log(game.solve());
// game.getColumn(0,'1');
// game.getRows(0, '3');
// console.log(game.get3X3(0,0, '9'));
// console.log(game.arrZero());
// console.log(game.board());
