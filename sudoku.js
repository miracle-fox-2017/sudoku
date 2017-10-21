"use strict"

/* Step
1. Buat Papan / board nya dahulu.
2. Masukkan string angka yang diberikan kedalam board
3.
*/

class Sudoku {
  constructor(board_string) {
    this.str = board_string
    this.angka = [1,2,3,4,5,6,7,8,9]
    this.puzzle = []

  }

  solve() {
   for (let x = 0; x < 9; x++) {
     for (let y = 0; y < 9; y++) {
       // 3. Menghasilkan puzzle posisi ke [y][x] samadengan hasil dari method check dengan parameter yang diberikan dari this.puzzle, x, y saat ini.
       // dengan cara mencari nilai pada baris, kolom dan array.

       if (this.puzzle[x][y] == 0) {
         this.angka.map(angka=> {
           if (this.barisArr(angka, x) && this.kolomArr(angka, y) && this.groupBox(angka, x, y)) {
             // Mengembalikan nilai puzzle posisi ke [x][y] dengan nilai dari angka yang telah di cek
             this.puzzle[x][y] = angka
           }
         });
       }
     }
   }
   return this.puzzle;
  }

  // Returns a string representing the current state of the board

  // 1. Mencetak nested array dengan nilai dari this.str
  // 2. Kemudian mengembalikan nilai ke this.puzzle sebagai global.
  board() {
    let jum = 0;
    for (var i = 0; i < 9; i++) {
      this.puzzle.push([])
      for (var y = 0; y < 9; y++) {

          this.puzzle[i].push(parseInt(this.str[jum]));
          jum+=1
      }
    }

    return this.puzzle
  }

  // 4. Mengecek nilai angka pada baris, apakah nilai tersebut sudah ada atau belum disini akan menghasilkan boolean
  barisArr(angka, index){
    let baris = this.puzzle[index];

    return baris.indexOf(angka === -1)
  }

  // 5. Mengecek nilai angka pada kolom, apakah nilai tersebut sudah ada atau belum disini akan menghasilkan boolean
  kolomArr(angka, index){
    let kolom = this.puzzle.map(function(baris) { return baris[index]; });

    return kolom.indexOf(angka) === -1
  }

  // 6. Mengecek nilai angka pada GroupBox, apakah nilai tersebut sudah ada atau belum disini akan menghasilkan boolean
  groupBox(angka, x, y){

    let baris = Math.floor(x/3) * 3
    let kolom = Math.floor(y/3) * 3

    let arr = []
    for (var i = baris; i < baris + 3; i++) {
      for (var j = kolom; j < kolom + 3; j++) {

        arr.push(this.puzzle[i][j])
      }
    }

    return arr.indexOf(angka) === -1

  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string =fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string)

console.log('========================= BOARD ============================')
console.log(game.board());

console.log('========================= SOLVER ============================')
console.log(game.solve());
