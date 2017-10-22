"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.array = [];

  }

  // Returns a string representing the current state of the board
  board() {
    let star = 0;
    for (var i = 0; i < 9; i++) {
      let tamp = [];
      for (var j = 0; j < 9; j++) {
        tamp.push(+this.board_string[star])
        star++
      }
      this.array.push(tamp)
    }
    return this.array
    // let splitboard = this.board_string.split('')
    // for(let i=0; i< 9; i++){
    //   let kolom = splitboard.splice(0,9)
    //   // console.log(kolom[i]);
    //
    //   this.array.push(kolom.join(' | '))
    // }
    //
    // return this.array
  }

  checkRow(row,values){
    //console.log(arr);
    for (let i = 0; i < 9; i++) {
      if ( this.array[row][i]== values) {
        return false
      }
      //console.log('ini this array row i --->',this.array[row]);
      //console.log('is row --->', this.array[row]);
    }
    return true
  }

  checkColom(line, cek){
    for (var i = 0; i < 9; i++) {
      if (this.array[i][line] == cek) {
        return false
      }
      //console.log('isi line', this.array[i][line]);
    }
    return true
  }

  checkArea(row,colom,cek){
    let area = 3;
    let line = 0;
    let poscolom = 0
    while (row >= line+area) {
      line+=area
    }
    while (colom>=poscolom+area) {
      poscolom+=area
    }
    for (var i = line; i < line+area; i++) {
      for (var j = poscolom; i <poscolom+area ; i++) {
        if (this.array[i][j] == cek) {
          return false
        }
      }
    }
    return true
  }

  cekAngka(row,col,cek){
    if(this.checkColom(col,cek)&&
     this.checkRow(row,cek)&&
     this.checkArea(row,col,cek)){
      return true;
    }else{
      return false
    }
  }

  solve(){
    var line=9
    for(var row=0;row<line;row++){
      for(var col=0;col<line;col++){
        if(this.array[row][col]==0){
          for(var cek=0;cek<=line;cek++){
            if(this.cekAngka(row,col,cek)){
              this.array[row][col]= cek;
              break;
            }
          }
        }
      }
    }
    return this.array
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]
let board_string='005030081902850060600004050007402830349760005008300490150087002090000600026049503'
var game = new Sudoku(board_string)
console.log(game.board());
console.log('---------------hasil-------------');
console.log(game.solve())

// console.log(game.checkRow(2,2));
// console.log(game.checkColom(0,2));

//console.log(game.checkArea(0,2,9));

// Remember: this will just fill out what it can and not "guess"
// game.solve()
//
// console.log(game.board())
