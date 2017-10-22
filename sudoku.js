"use strict"

class Sudoku {
  constructor(board_string) {
  	this.board_string = board_string
  	this.papan = []
  }

  solve() {
  	let koordinatNull = this.cekNull()
  	for(let i = 0; i < koordinatNull.length; i++) {
  	  let baris = koordinatNull[i][0]
  	  let kolom = koordinatNull[i][1]
  	  let nilai = +this.papan[baris][kolom] + 1
  	  let solve = false
  	  
  	  while(!solve && nilai <= 9) {
  	  	debugger
  	  	if(this.cekSemua(baris, kolom, nilai)) {
  	  	  this.papan[baris][kolom] = nilai.toString()
  	  	  solve = true
  	  	} else {
  	  	  nilai++
  	  	}
  	  	// console.log(nilai)
  	  }
  	  if(!solve) {
  	  	this.papan[baris][kolom] = 0
  	  	i -= 2
  	  }
  	  // console.log(nilai)
  	}
  	return this.papan
  }

  // Returns a string representing the current state of the board
  board() {
  	this.board_string = this.board_string.split('')
    for (let i = 0; i < this.board_string.length; i++) {
      this.papan.push(this.board_string.splice(0, 9));
    }
    return this.papan;
  }

  cekBaris(baris, nilai) {
  	for(let i = 0; i < this.papan.length; i++) {
  	  if(this.papan[baris][i] == nilai) {
  	  	return false
  	  }
  	}
  	return true
  }

  cekKolom(kolom, nilai) {
  	for(let i = 0; i < this.papan.length; i++) {
  	  if(this.papan[i][kolom] == nilai) {
  		return false
  	  }
  	}
  	return true
  }

  cek3x3(baris, kolom, nilai) {
  	baris = Math.floor(baris / 3) * 3
  	kolom = Math.floor(kolom / 3) * 3
  	for(let i = 0; i < 3; i++) {
  	  for(let j = 0; j < 3; j++) {
  	  	if(this.papan[baris+i][kolom+j] == nilai) {
  	  	  return false
  	  	}
  	  }
  	}
  	return true
  }

  cekSemua(baris, kolom, nilai) {
  	debugger
  	if(this.cekBaris(baris, nilai) && this.cekKolom(kolom, nilai) && this.cek3x3(baris, kolom, nilai)) {
  		return true
  	} else {
  		return false
  	}
  }

  cekNull() {
  	let koordinatNull = []
  	for(let i = 0; i < this.papan.length; i++) {
  	  for(let j = 0; j < this.papan[i].length; j++) {
  	  	if(this.papan[i][j] == 0) {
  	  	  koordinatNull.push([i, j])
  	  	}
  	  }
  	}
  	return koordinatNull
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
console.log('Sudoku board')
console.log(game.board())
console.log('---------------------------------------------------')
console.log('Sudoku solved')
console.log(game.solve())

// console.log(game.board())
// console.log('cek baris --> ' + game.cekBaris(0, 5))
// console.log('cek kolom --> ' + game.cekKolom(2, 5))
// console.log('cek 3x3 --> ' + game.cek3x3(0, 2, 5))
// console.log('cek semua --> ' + game.cekSemua(0, 2, 5))
// console.log(game.cekNull())