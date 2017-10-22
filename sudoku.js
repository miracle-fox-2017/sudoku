"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.arr_board = []
  }

  solve() {
    var k = 0
    for(var i = 0; i < 9; i++) {
      var arrTampung = []
      for(var j = 0; j < 9; j++) {
        arrTampung.push(+this.board_string[k++])
      }
      this.arr_board.push(arrTampung)
    }

    var posisi_kosong = []

    //mencari Posisi nol
    for(var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
        if(this.arr_board[i][j] == 0) {
          posisi_kosong.push([i, j])
        }
      }
    }


    //mencari Solusi
    var i = 0

    while(i < posisi_kosong.length) {
      var baris = posisi_kosong[i][0]
      var kolom = posisi_kosong[i][1]
      var nilaiBaru = this.arr_board[baris][kolom] + 1
      var status = false

      while(nilaiBaru <= 9) {
        if(this.cekBaris(nilaiBaru, baris) && this.cekKolom(nilaiBaru, kolom) && this.cek3X3(nilaiBaru, baris, kolom)) {
          i++
          this.arr_board[baris][kolom] = nilaiBaru
          status = true
          break
        }
        else {
          nilaiBaru++
        }
      }
      if(!status) {
        this.arr_board[baris][kolom] = 0
        i--
      }
    }
    // return this.arr_board
  }

  cekBaris(angka, baris) {
    if(this.arr_board[baris].indexOf(angka) == -1) {
      return true
    }
    else {
      return false
    }
  }

  cekKolom(angka, kolom) {
    for(var i = 0; i < this.arr_board.length; i++) {
      if(this.arr_board[i][kolom] == angka) {
        return false
      }
    }
    return true
  }

  cek3X3(angka, baris, kolom) {
    var mulaiBaris = Math.floor((baris/3)) * 3
    var akhirBaris = mulaiBaris + 3
    var mulaiKolom = Math.floor((kolom/3)) * 3
    var akhirKolom = mulaiKolom + 3


    for(var i = mulaiBaris; i < akhirBaris; i++) {
      for(var j = mulaiKolom; j < akhirKolom; j++) {
        if(this.arr_board[i][j] == angka) {
          return false
        }
      }
    }
    return true
  }

  // Returns a string representing the current state of the board
  board() {

    //ubah mendapatkan arr_board dari board_string
    // var k = 0
    // for(var i = 0; i < 9; i++) {
    //   var arrTampung = []
    //   for(var j = 0; j < 9; j++) {
    //     arrTampung.push(+this.board_string[k++])
    //   }
    //   this.arr_board.push(arrTampung)
    // }

    // method untuk membuat board string
    return this.arr_board
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
//game.solve()

game.solve()
console.log(game.board());
