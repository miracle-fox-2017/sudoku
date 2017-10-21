"use strict"

class Sudoku {
  constructor(board_string) {
    this.number = board_string
    this.checker = [1,2,3,4,5,6,7,8,9]
    this.papan = []
    this.sisaKosong = []
  }

  solve() {
   for (let row = 0; row < this.papan.length; row++) {
     for (let col = 0; col < this.papan.length; col++) {
       if (this.papan[row][col] == 0) {
         this.checker.forEach(checker=> {
           if (this.cekRows(row, checker) && this.cekCols(col, checker) && this.cek3X3(row, col, checker)) {
             this.papan[row][col] = checker.toString();
           }
         });
       }
     }
   }
   return this.papan;
  }

  backtrack(){
    //CARI YANG MASIH KOSONG
    let sisaKosong = []
    for (let e = 0; e < this.papan.length; e++) {
      for (let f = 0; f < this.papan.length; f++) {
        if (this.papan[e][f] === '0') {
          sisaKosong.push([e,f]);
        }
      }
    }
    // PROCCESS ISI DATA YANG MASIH KOSONG
    let maxValue = 9;
    for (var idx = 0; idx < sisaKosong.length;) {
      let row = sisaKosong[idx][0]
      let col = sisaKosong[idx][1]
      let value = +(this.papan[row][col]) + 1;
      let finded = false;
      debugger
      while(!finded && value <= maxValue){
        // CEK DATA TRUE FALSE
         if (this.cekRows(row, value) && this.cekCols(col, value) && this.cek3X3(row, col, value)) {
          finded = true
          this.papan[row][col] = value.toString();
           idx++
        } else {
        // TRY NEW value
          value++
        }
      }
      // PROCESS BACKTRACK
      if(!finded){
        this.papan[row][col] = 0
        idx--
      }
    }
    return this.papan
  }

  // Returns a string representing the current state of the board
  board() {
    for (var row = 0; row < 9; row++) {
      let rows =[]
      for (var col = 0; col < 9; col++) {
          rows.push(this.number[col])
      }
      this.number = this.number.slice(9, this.number.length)
      this.papan.push(rows)
    }
    return this.papan
  }
  cekRows(rowNumber, cari){
    let rows = this.papan[rowNumber];
    // console.log(row);
    return (rows.indexOf(cari.toString()) === -1) ? true : false;
  }
  cekCols(colNumber, cari){
    let data = [];
    for (let idx = 0; idx < 9; idx++) {
      data.push(this.papan[idx][colNumber]);
    }
    return (data.indexOf(cari.toString()) === -1) ? true : false;
  }
  cek3X3(posX, posY, cari){

    let startX = Math.floor(posX/3) * 3
    let startY = Math.floor(posY/3) * 3
    let endX = startX + 3
    let endY = startY + 3
    let valueInBox = []
    for (var hor = startX; hor < endX; hor++) {
      for (var ver = startY; ver < endY; ver++) {
        // console.log(`X : ${hor} ~~ Y : ${ver}`);
        // console.log('PAPAN',this.papan[0][7]);
        valueInBox.push(this.papan[hor][ver])
      }
    }
    // console.log(valueInBox.indexOf(cari.toString()));
    return (valueInBox.indexOf(cari.toString())===-1)? true : false

  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
let masalah ='302609005500730000000000900000940000000000109000057060008500006000000003019082040'
var game = new Sudoku(board_string)
var gameBacktrack = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// console.log(game.cek3X3(4,1,1))
// console.log(game.cekRows(4,0));
// console.log(game.cekCols(5, 0));
gameBacktrack.board()
console.log('~~~~~~~~~~~~~~~~~~~~~~~~PAPAN AWAL~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log(game.board());
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('__________________________SOLVE____________________________');
console.log(game.solve());
console.log('-----------------------------------------------------------');
console.log('________________________BACKTRACK__________________________');
console.log(gameBacktrack.backtrack());
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
