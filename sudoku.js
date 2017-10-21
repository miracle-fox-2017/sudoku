"use strict"

class Sudoku {
  constructor(board_string) {
    this.strBoard = board_string
    this.layout = []
    this.emptyPositions = []
  }

  solve() {
    const changeZero = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    for (let r = 0; r < this.layout.length; r++) {
      for (let c = 0; c < this.layout.length; c++) {
        if (this.layout[r][c] == 0) {
          // console.log('====== masuk if');
          for (let i = 0; i < changeZero.length; i++) {
            let zero = changeZero[i]
            if (this.checkRows(r, zero) && this.checkCols(c, zero) && this.check3x3Square(r, c, zero)) {
              this.layout[r][c] = zero.toString()
            }
          }
        }
      }
    }
    return this.layout
  }

  zeroChecker() {
    for (let r = 0; r < this.layout.length; r++) {
      for (let c = 0; c < this.layout.length; c++) {
        if (this.layout[r][c] === '0') {
          this.emptyPositions.push([r, c])
        }
      }
    }
    // console.log(this.emptyPositions)
    return this.emptyPositions
  }

  backTrack(){
    this.zeroChecker()
    // console.log(this.zeroChecker());
    let limit = 9

    for(let i = 0; i < this.emptyPositions.length;) {
      let row = this.emptyPositions[i][0]
      let column = this.emptyPositions[i][1]
      let value = Number(this.layout[row][column]) + 1
      let found = false

      while(!found && value <= limit) {
        if(this.checkRows(row, value) && this.checkCols(column, value) && this.check3x3Square(row, column, value)) {
          found = true
          this.layout[row][column] = value.toString()
          i++
        } else {
          value++
        }
      }
      // If no valid value was found and the limit was
      // reached, move back to the previous position
      if(!found) {
        this.layout[row][column] = 0
        i--
      }
    }
    return this.layout
  }

  // Returns a string representing the current state of the board
  square() {
    let arr = this.strBoard.split('')

    for(let i = 0; i < 9; i++){
      this.layout.push(arr.splice(0, 9))
    }
    return this.layout
  }

  board() {
    let line = ''
    for (let r = 0; r < 9; r++) {
      if (r === 0) {
        line += line += '---------------\n- S U D O K U -\n---------------\n'
      }
      for (let c = 0; c < 9; c++) {
        line += this.layout[r][c]
        if (c === 2 || c === 5) {
          line += ` | `
        }
      }
      line += `\n`
      if ((r + 4) % 3 === 0) {
        line += '---------------\n'
      }
    }
    return line
  }

  checkRows(row, target) {
    // return this.layout[row]
    if (this.layout[row].indexOf(target.toString()) === -1) {
      return true
    }
    return false
  }

  checkCols(col, target) {
    let arrColom = []
    for (let i = 0; i < this.layout.length; i++) {
      arrColom.push(this.layout[i][col])
    }
    if (arrColom.indexOf(target.toString()) === -1) {
      return true
    }
    return false

  }

  check3x3Square(row, col, target) {

    let value = []
    let lengthCol = 0
    let idxPlusCol = 0
    let lengthRow = 0
    let idxPlusRow = 0

    // cek index 3x3
    if (col <= 2) {
      lengthCol += 3
    } else if (col <= 5) {
      lengthCol += 3
      idxPlusCol += 3
    } else if (col <= 8) {
      lengthCol += 3
      idxPlusCol += 6
    }

    if (row <= 2) {
      lengthRow += 3
    } else if (row <= 5) {
      lengthRow += 3
      idxPlusRow += 3
    } else if (row <= 8) {
      lengthRow += 3
      idxPlusRow += 6
    }

    for (let j = 0; j < lengthRow; j++) {
      for (let i = 0; i < lengthCol; i++) {
        value.push(this.layout[j + idxPlusRow][i + idxPlusCol])
      }
    }

    if (value.indexOf(target.toString()) === -1) {
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

let game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')
let game_backTrack = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"



// game.square()
// game.board()
// game.checkRows(1, 4)
// game.checkCols(0,5)
// game.check3x3Square(0,8,4)
// game.solve()
game_backTrack.square()
game_backTrack.board()
game_backTrack.backTrack()
// game.zeroChecker()


// console.log(game.square())
// console.log(game.board())
console.log(game_backTrack.board())
// console.log(game.check3x3Square(8,7,7))
// console.log(game.solve())
// console.log(game.zeroChecker())
// console.log(game.checkCols(8,7))
// console.log(game.checkRows(0,7))
