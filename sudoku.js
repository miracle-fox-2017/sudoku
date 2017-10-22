"use strict"

class Sudoku {
  constructor(board_string) {
    this.papan = board_string.split("")
    this.arr = []
    this.arrEmpty = []
  }

  solve() {
    let index = 0;
    let baris, kolom, angka, cekStatus
    while (index < this.arrEmpty.length) {
      baris = this.arrEmpty[index][0]
      kolom = this.arrEmpty[index][1]
      angka = Number(this.arr[baris][kolom]) + 1
      cekStatus = false

      while (!cekStatus && angka <= 9) {
        // debugger
        if (this.cekBaris(angka, baris) && this.cekKolom(angka, kolom) && this.cekRegion(angka, baris, kolom)) {
          cekStatus = true
          this.arr[baris][kolom] = angka.toString()
          index++
        } else {
          angka++
        }
      }
      if (!cekStatus) {
        this.arr[baris][kolom] = 0
        index--
      }
    }

    return this.arr

  }

  arrKosong() {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length; j++) {
        if (this.arr[i][j] == 0) {
          this.arrEmpty.push([i, j])
        }
      }
    }
    console.log(this.arrEmpty.length)
    return this.arrEmpty
  }

  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < this.papan.length; i++) {
      this.arr.push(this.papan.splice(0, 9))
    }
    return this.arr

  }

  cekBaris(angka, baris) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[baris][i] == angka) {
        return false;
      }
    }
    return true
  }
  cekKolom(angka, kolom) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i][kolom] == angka) {
        return false
      }
    }
    return true;
  }


  cekRegion(angka, baris, kolom) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.arr[(i + baris) - (baris % 3)][(j + kolom) - (kolom % 3)] == angka) {
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
  //var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  // set-02_project-euler_50-easy-puzzles
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// console.log(game.board())
// console.log(game.arrKosong())
game.board()
game.arrKosong()
console.log(game.solve())
