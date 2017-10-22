"use strict"

class Sudoku {
  constructor(board_string) {
        this.papan = this.board();
        this.arrZero = [];
        this.koor = this.getZero();
  }

  solve(arr) {

  }

  board() {
    let arr = [];
    let tampung = 0;
    for(let i = 0 ; i < 9 ; i++) {
      arr.push([]);
        for(let j = 0 ; j < 9 ; j++) {
          arr[i].push(board_string[tampung]);
            tampung++;
        }
    }
      return arr;
  }

  getZero() { // fungsi untuk menentukan koordinat baris dan kolom
    for(let i = 0 ; i < this.papan.length ; i++) {
      for(let j = 0 ; j < this.papan[i].length ; j++) {
        if(this.papan[i][j] === '0') {
          this.arrZero.push([i,j]);
        }
      }
    }
    return this.arrZero;
  }

  horizontal(kolom, angka) { // fungsi untuk mengecek horizontal
    for(let i = 0; i < this.papan.length; i++) {
        if(angka == this.papan[i][kolom]) {
          return false;
        }
    }
    return true;
  }

  vertikal(kolom, angka) { // fungsi untuk mengecek vertikal
    for(let i = 0; i < this.papan.length; i++) {
        if(angka == this.papan[i][kolom]) {
          return false;
        }
    }
    return true;
  }

  kuadran(baris, kolom, angka) { // fungsi untuk mengecek kotak 3 x 3
    let awalbaris = 0;
    let awalkolom = 0;

    if(baris < 3) {
        awalbaris = 0; // start baris dari 0
    } else if(baris < 6) {
        awalbaris = 3; // start baris dari 3
    } else if(baris < 9) {
        awalbaris = 6; // start baris dari 6
    }

    if(kolom < 3) {
        awalkolom = 0;
    } else if(kolom < 6) {
        awalkolom = 3;
    } else if(kolom < 9) {
        awalkolom = 6;
    }

    for(let i = awalbaris ; i < awalbaris + 3 ; i++) { // tambah 3 karena dia zona barisnya 3 x 3
      for(let j = awalkolom ; j < awalkolom + 3 ; j++) { // tambah 3 karena dia zona kolomnya 3 x 3
          if(angka == this.papan[i][j]) {
            return false;
          }
      }
    }
    return true;
  }

}



// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
//

console.log(game.board())
// console.log(game.getZero())
// console.log(game.horizontal(0,2))
// console.log(game.vertikal(4,2))
console.log(game.kuadran(0,2,5));
