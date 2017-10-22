'use strict'

class Sudoku {
  constructor(board_string) {
  	this.boardList = board_string
  	this.papan = []
  }

  solve(){
  	var temp = 0
    for(var i = 0; i < 9; i++) {
      var arrTemp = []
      for(var j = 0; j < 9; j++) {
        arrTemp.push(+this.boardList[temp++])
      }
      this.papan.push(arrTemp)
    }

    var kordinat_kosong = []

    for(var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
        if(this.papan[i][j] == 0) {
          kordinat_kosong.push([i, j])
        }
      }
    }


    var i = 0

    while(i < kordinat_kosong.length) {

      // var baris = kordinat_kosong[i][0]
      var kolom = kordinat_kosong[i][1]
      var nilai = this.papan[baris][kolom] + 1
      var status = false
      console.log(kolom)

      while(nilai <= 9) {
        if(this.cekBaris(nilai, baris) && this.cekKolom(nilai, kolom) && this.cek3x3(nilai, baris, kolom)) {
          i++
          this.papan[baris][kolom] = nilai
          status = true
          break
        }
        else {
          nilai++
        }
      }
      if(!status) {
        this.papan[baris][kolom] = 0
        i--
      }
    }

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


}


let sudoku = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')

// sudoku.board()

// console.log(sudoku.cekBaris(5, 0))
// console.log(sudoku.cekKolom(7, 2))
// console.log(sudoku.cek3x3(7,1,2))
sudoku.solve()
console.log(sudoku.board());