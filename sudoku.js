"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string
    this.papan = this.board()
    this.arrNol = []
  }

  solve() {
    // for(let i =0; i < 9; i++){
    //   this.horizontal()
    //   this.vertical()
    //   // this.square()
    // }
  }

  board() {
  let arr = []
  let count = 0;

    for(let i = 0; i < 9; i++){
      arr.push([])
      for(let j = 0; j < 9; j++){
          arr[i].push(this.boardString[count])
          count++
      }
    }
    return arr
  }

  getNol(){
    for(let i = 0; i < this.papan.length; i++){
      for(let j = 0; j < this.papan.length; j++){
        if(this.papan[i][j] == 0){
          this.arrNol.push([i,j])
        }
      }
    }
    return this.arrNol
  }

  horizontal(baris, tebakan){
    for(let i = 0; i < this.papan[0].length; i++){
      if(this.papan[baris][i] == tebakan){
        return false
      }
    }
  return true
  }

  vertical(kolom, tebakan){
    for(let i = 0; i < this.papan[0].length; i++){
      if(this.papan[i][kolom] == tebakan){
        return false
      }
    }
  return true
  }

  square(baris, kolom, tebakan){
    var startKolom = 0;
    var startBaris = 0;

    if(kolom < 3){
      startKolom = 0
    }
    else if(kolom < 6){
      startKolom = 3
    }
    else if(kolom < 9){
      startKolom = 6
    }

    if(baris < 3){
      startBaris = 0
    }
    else if(baris < 6){
      startBaris = 3
    }
    else if(baris < 9){
      startBaris = 6
    }

    for(let i = startKolom; i < startKolom+3; i++){
      for(let j = startBaris; j < startBaris+3; j++){
        if(this.papan[i][j] == tebakan){
          return false
        }
      }
    }
    return true
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// game.solve()
// console.log(game.getNol())
console.log(game.board())
console.log(game.horizontal(0,3))
console.log(game.vertical(0,4))
console.log(game.square(2,1,9))

console.log(game.solve())
