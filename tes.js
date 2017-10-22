'use strict'

class Sudoku {
  constructor(board_string) {
  	this.boardList = board_string
  	this.papan = []
  }

  solve(){
  	let empty = this.checkKosong()
    for (var i = 0; i < empty.length; i++) {
      debugger
      let status = false
      let col = empty[i][1]
      let row = empty[i][0]
      let value = this.mainBoard[row][col]+1
      while(!status && value <= 9){
        if(this.checkBaris(row, value)&&this.checkKolom(col, value)&&this.checkSquare(col, row, value)){
          this.mainBoard[row][col] = value
          status = true
        }
        value++
      }
      if(!status){ // rjika status masih false mundur ke index 0 sebelumnya
        this.mainBoard[row][col] = 0
        i = i-2
      }
    }
    return this.mainBoard

  }


  // Returns a string representing the current state of the board
  board() {
  	let papan = Array(9).fill().map(()=>Array(9).fill(0)),
  		c = 0,
  		r = 0

  	for(var i = 0; i < this.boardList.length; i++){
  		papan[c][r] = this.boardList[i]
  		if(r < 8){
  				r++
  			}
  		else{
	  			c ++
	  			r = 0
  			}
  	}
	this.papan = papan
	console.log(this.papan)
  }

  cekBaris(cek, baris){
  	for(var i = 0; i < this.papan[baris].length;i++){
  		if(this.papan[baris][i] == cek){
  			return false
  		}
  	}
  	return true
  }


  cekKolom(cek, kolom){
  	let r = kolom,
  		c = 0
  	for(var i = 0; i < this.papan.length;i++){
	  		if(r < this.papan.length){
		  			if(this.papan[c][r] == cek){
		  				
		  				return false
		  			}

		  			c++
	  			}
	  		else{
	  			cek = 0
	  		}
  	}
  	return true
  }

  cek3x3(angka, baris, kolom){
  	let startX = Math.floor(baris / 3) * 3,
  		endX = startX + 3,
  		startY = Math.floor(baris / 3) * 3,
  		endY = startY + 3

  	for(var i = startX; i < endX; i++){
  		for(var j = startY; j < endY; j++){
  			if(this.papan[i][j] == angka){
  				return false
  			}
  		}
  	}
  	return true

  }

  checkKosong(){ 
    let temp = []
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if(this.papan[i][j] === 0){
          temp.push([i, j])
        }
      }
    }
    return temp
  }


}


let sudoku = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
// var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split('\n')

// for (var i = 0; i < board_string.length; i++) { // tes dengan looping sebanyak isi sample file
//   console.log("\x1B[2J")
var game = new Sudoku(board_string[0])
console.log('Sudoku Board ');
console.log(game.board());
console.log('=================================');
console.log('Sudoku Solve ');
console.log(game.solve());