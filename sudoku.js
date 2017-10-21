"use strict"

class Sudoku {
  constructor(board_string) {
    this.strBoard = board_string
    this.layout   = []
  }

  solve() {

    const changeZero = [1,2,3,4,5,6,7,8,9]

    for(let r=0; r<this.layout.length; r++){
      for(let c=0; c<this.layout.length; c++){
        if(this.layout[r][c] == 0){
          // console.log('====== masuk if');
          for(let i=0; i<changeZero.length; i++){
            let zero = changeZero[i]
            if(this.cekRow(r, zero) && this.cekCol(c, zero) && this.cek3x3(r, c, zero)) {
              this.layout[r][c] = zero.toString()
            }
          }
        }
      }
    }
    return this.layout
  }

  // Returns a string representing the current state of the board
  square(){
    let arr = this.strBoard.split('')

    for(let i=0; i<9; i++){
      this.layout.push(arr.splice(0,9))
    }
    return this.layout
  }

  board(){
    let line = ''
    for(let r=0; r<9; r++){
      if(r === 0){
        line += line += '-----------\n'
      }
      for(let c=0; c<9; c++){
        line += this.layout[r][c]
        if(c === 2 || c === 5){
          line += `|`
        }
      }
      line+=`\n`
      if ((r + 4) % 3 === 0) {
                line += '-----------\n'
            }
    }
    return line
  }

  cekRow(row, target){
    // return this.layout[row]
    if (this.layout[row].indexOf(target.toString()) === -1 ){
      return true
    }
    return false
  }

  cekCol(col, target){
    let arrColom = []
    for(let i=0; i<this.layout.length; i++){
      arrColom.push(this.layout[i][col])
    }
    // console.log('==== col' + arrColom);
    if (arrColom.indexOf(target.toString()) === -1 ){
      return true
    }
    return false

  }

  cek3x3(row, col, target){

   let value = []
   let lengthCol = 0
   let idxPlusCol = 0
   let lengthRow = 0
   let idxPlusRow = 0

   // cek index 3x3
   if(col <= 2 ){
     lengthCol += 3
   }else if(col <= 5){
     lengthCol += 3
     idxPlusCol += 3
   }else if(col <= 8){
     lengthCol += 3
     idxPlusCol += 6
   }

   if(row <= 2 ){
     lengthRow += 3
   }else if(row <= 5){
     lengthRow += 3
     idxPlusRow += 3
   }else if(row <= 8){
     lengthRow += 3
     idxPlusRow += 6
   }

   // console.log(resultCol)
   for(let j=0; j<lengthRow; j++){
    for(let i=0; i<lengthCol; i++){
     value.push(this.layout[j+idxPlusRow][i+idxPlusCol])
    }
   }

  //  console.log('===== 3x3 ' + value);
   if (value.indexOf(target.toString()) === -1 ){
     return true
   }
   return false
 }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')

// Remember: this will just fill out what it can and not "guess"



game.square()
game.board()
// game.cekRow(1, 4)
// game.cekCol(0,5)
// game.cek3x3(0,8,4)
game.solve()


// console.log(game.square())
console.log(game.board())
// console.log(game.cek3x3(8,7,7))
// console.log(game.solve())
// console.log(game.cekCol(8,7))
// console.log(game.cekRow(0,7))
