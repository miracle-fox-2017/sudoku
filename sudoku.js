"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
  }

  solve() {
    //nggak ke solve/gak kelar
  }

  // Returns a string representing the current state of the board
  board() {
  let arr = [];
    let num = 0
      for (let i = 0; i < 9; i++) {
        arr.push([])
          for (let j = 0; j < 9; j++) {
            arr[i].push(this.string[num])
            num++
          }
          arr[i].splice(3,0, '|')
          arr[i].splice(7,0, '|')
          arr[i].join(' ')
        }
                  let garis = [];
                  for (let l = 0; l < 21; l++) {
                    garis.push('-');
                  }

                      garis = garis.join('');

                          for (let m = 0; m < 16; m += 4) {
                            arr.splice(m, 0, garis);
                          }
                          arr = arr.join('\n')
                        /*
                        for (let n = 0; n < arr.length; n++) {
                          var isi = 1
                            if(arr[n] == 0){
                              arr[n] += isi <--------------------------------------------------------//disini
                                  for(let o = 0; o < arr[n].length;o++){                            |
                                    if(isi == arr[o]){                                              |
                                      isi ++                                                        |
                                    }                                                               |
                                  }                                                                 |
                                }                                                                   |
                              }*/ //niatnya jadi tempat ngerubah 0 jadi angka 1-9 tapi kena eror di |
          return arr

  }

  input(){
    let tampung = ''
    let acak = '123456789'
    for (let i = 0; i < acak.length; i++) {
      tampung = acak.charAt(Math.round(Math.random()*9))
    }
    return tampung
  }

  chekRow(){

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
game.solve()

console.log(game.board())
