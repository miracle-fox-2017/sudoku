"use strict"

 class Sudoku {
   constructor(board_string) {
     this.board_string = board_string;
     this.zeroPos = [];
     this.board = []

  }
  solve() {}

  // Returns a string representing the current state of the board
  print_board() {
    //membuat papan sudoku dan assign inputannya
    let counter = 0
    for(let i = 0 ; i < 9; i++){
      this.board.push([])
      for(let j = 0; j < 9; j++){
        this.board[i].push(this.board_string[counter])
        counter++
      }
    }
    //mengumpulkan index angka 0
    for(let i = 0; i < this.board.length;i++){
      for(let j = 0; j < this.board[i].length;j++){
        if(this.board[i][j]==0){
          this.zeroPos.push(i+''+j)
        }
      }

    }


  }
  //nomor random untuk input posisi 0
  randomNum(){
    return Math.floor(Math.random()*9+1)
  }


    angkaBawah(){
      //kumpulkan nilai bawah
      let nilaibawah = []
      for(let i = 0; i < this.board.length; i++){
        nilaibawah.push(this.board[i][+this.zeroPos[0][1]])

      }
      return nilaibawah
    }

  //masukan angka 0 dan cek
  assignZero(){

    debugger
    while(this.zeroPos.length > 0){
      debugger
      //simpan nomor random
      let a = this.randomNum().toString()


      //cek angka a apa ada yang sama dengan sampingnya
      if(this.board[+this.zeroPos[0][0]].indexOf(a)===-1 ){
        debugger
        //jika tidak cek kebawah..
        let b = this.angkaBawah()
        if(b.indexOf(a) === -1){
          this.board[+this.zeroPos[0][0]][+this.zeroPos[0][1]]=a
          this.zeroPos.shift()
          //b.shift()
          //console.log(b)
        }

      }

    }

    console.log(this.board)
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
//console.log(game.board())
game.print_board()
//console.log(game.board)
//console.log(game.assignZero())
//console.log(game.checkSamping())
//console.log(game.board)
console.log(game.assignZero())
// console.log(Sudoku(board_string))
