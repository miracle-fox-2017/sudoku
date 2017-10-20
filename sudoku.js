"use strict"

class Sudoku {
  constructor(board_string) {
    this.number = board_string
    this.checker = [1,2,3,4,5,6,7,8,9]
    this.papan = []
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

  // Returns a string representing the current state of the board
  board() {
    // console.log(number);
    for (var row = 0; row < 9; row++) {
      let rows =[]
      for (var col = 0; col < 9; col++) {
        let angka;
          rows.push(this.number[col])
      }
      this.number= this.number.slice(9, this.number.length)
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
var game = new Sudoku(masalah)



// Remember: this will just fill out what it can and not "guess"
// game.solve()

console.log(game.board());
// console.log(game.cek3X3(4,1,1))
// console.log(game.cekRows(4,0));
// console.log(game.cekCols(5, 0));
console.log(game.solve());
