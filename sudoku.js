"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.arrZero = [];
    this.setZero = [];
    this.arrBoard = [];
    this.makeBoard = [];
  }

  //method makearray merubah boardString menjadi array 9x9
  makearray(){
    let setPanjang = this.boardString.length / 9;
    let counter = 0;
    for (let i = 0; i < setPanjang; i++) {
      this.arrBoard.push([]);
      for (let j = 0; j < setPanjang; j++) {
        this.arrBoard[i].push(this.boardString[counter]);
        counter++;
      }
    }
    return this.arrBoard;
  }

  //method getZero mencari nilai 0 dan menentukan koordinat nilai 0
  getZero(){
    this.makearray();
    // console.log(this.makearray());
    for (let i = 0; i < this.arrBoard.length; i++) {
      for (let j = 0; j < this.arrBoard.length; j++) {
        if (this.arrBoard[i][j] == 0) {
          let koorZero = i+''+j;
          this.arrZero.push(koorZero);
        }
      }
    }
    return this.arrZero;
  }

  //method chekKolom untuk mengecek nilai TEBAKAN kolom
  chekKolom(kolom,tebak){
    let getBaris = kolom[0];
    for(let k = 0; k < 9;k++){  
      if (this.arrBoard[getBaris][k]==tebak){
        return true;
      }
    }
    return false;
  }

  //method chekbaris untuk mengecek nilai TEBAKAN baris
  chekBaris(baris, tebak) {
    let getBaris = baris[1];
    for (let k = 0; k < 9; k++) {
      if (this.arrBoard[k][getBaris] == tebak) {
        return true;
      }
    }
    return false;
  }

  //method chekOrdo untuk mengecek nilai TEBAKAN 3X3
  chekOrdo(baris, tebak) {
    let getKolom = Math.floor(baris[1] / 3) * 3;
    let getBaris = Math.floor(baris[0] / 3) * 3;  
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++){
            if (this.arrBoard[getBaris+k][getKolom+l] == tebak) {
              return true;
            }
          }
        }
    return false;
  }

  //method solve sebagai method pemanggil data getZero,chekKolom,chekOrdo 
  solve() {
    this.getZero();
    for (let i = 0; i < this.arrZero.length; i++) {
      let tebak = 1;
      let set = true;
      for (let j = 1; j <= 9; j++) {

        if (this.chekKolom(this.arrZero[i], tebak) === false) {
          if (this.chekBaris(this.arrZero[i], tebak) === false) {
            if (this.chekOrdo(this.arrZero[i], tebak) === false) {
              this.arrBoard[this.arrZero[i][0]][this.arrZero[i][1]] = String(tebak);
              set = false;
            }
          }
        }
        tebak++;
      }
     
    }
    return this.arrBoard;
  }

  // method board membuat board dari hasil pencarian dan menghasilkan board [[[]]]
  board() {
    this.solve();
    let barisBoard = this.arrBoard.length;
    let kolomBoard = this.arrBoard[0].length / 3; 
    for (let i = 0; i < barisBoard; i++){
      this.makeBoard.push([]);
      for (let j = 0; j < kolomBoard; j++){
        this.makeBoard[i].push([]);
        for (let k = j*3; k < 3*(j+1);k++){
          this.makeBoard[i][j].push(this.arrBoard[i][k])
        }
      }
    }
    return this.makeBoard
  }
  
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900');

// Remember: this will just fill out what it can and not "guess"
// game.solve()

//console.log(game.makearray());

console.log(game.board());
