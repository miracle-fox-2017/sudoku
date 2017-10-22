"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string=board_string.split('');
    this.irisan=[];
    this.arrZero=[];
    this.makeResult=[];
  }
  board() {
    let counter = 0;
    for (let i = 0; i < 9; i++) {
      this.irisan.push([]);
      for (let j = 0; j < 9; j++) {
        this.irisan[i].push(this.board_string[counter]);
        counter++;
      }
    }
    // console.log(this.irisan);
    return this;
  }


  //method findZero mencari nilai 0
  findZero (){
    this.board();
    // console.log(this.board());
    for (let i = 0; i < this.irisan.length; i++) {
      for (let j = 0; j < this.irisan.length; j++) {
        if (this.irisan[i][j] == 0) {
          let zeroCoor = i+''+j;
          this.arrZero.push(zeroCoor);
        }
      }
    }
    // console.log(this.arrZero)
    return this;
  }

    //method rowCheck untuk mengecek nilai per BARIS
  rowCheck(baris, check) {
    let getRow = baris[1];
    for (let i = 0; i < 9; i++) {
      if (this.irisan[i][getRow] === check) {
        return true;
      }
    }
    return false;
  }
  //method colCheck ntuk mengecek nilai per KOLOM
  colCheck(kolom,check){
    let getCol = kolom[0];
    for(let i = 0; i < 9;i++){
      if (this.irisan[getCol][i]===check){
        return true;
      }
    }
    return false;
    }
  //method checkArea untuk mengecek area 3x3 di board
  checkArea(baris, check) {
    let getCol = Math.floor(baris[1] / 3) * 3;
    let getRow = Math.floor(baris[0] / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
          if (this.irisan[getRow+i][getCol+j] == check) {
            return true;
          }
        }
      }
  return false;
}
//method untuk mengganti nilai 0 dengan result dengan memanggil 3 method checker
 solve() {
  this.findZero();
  // console.log(arrZero)
  for (let i = 0; i < this.arrZero.length; i++) {
    let check = 1;
    let set = true;
    for (let j = 0; j <9; j++) {
      if (this.colCheck(this.arrZero[i], check) == false) {
      if (this.rowCheck(this.arrZero[i], check) == false) {
      if (this.checkArea(this.arrZero[i], check) == false) {
            this.irisan[this.arrZero[i][0]][this.arrZero[i][1]] = String(check);
            set = false;
            }
          }
        }
        check++;
      }
    }
    return this.irisan;
  }
  //method yang akan mencetak board hasil
  resultBoard() {
    this.solve();
    let rowBoard = this.irisan.length;
    let colBoard = this.irisan[0].length/3;

    for (let i = 0; i < rowBoard; i++){
      this.makeResult.push([]);
      // console.log(this.makeResult)
      for (let j = 0; j < colBoard; j++){
        this.makeResult[i].push([]);
        for (let k = j*3; k < 3*(j+1);k++){
          this.makeResult[i][j].push(this.irisan[i][k])
        }
      }
    }
    return this.makeResult
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// var game = new Sudoku(‘105802000090076405200400819019007306762083090000061050007600030430020501600308900’);

// Remember: this will just fill out what it can and not "guess"
// game.solve()

// console.log(game.board())
// console.log(game.findZero())
console.log(game.resultBoard())
// console.log(game.solve())
