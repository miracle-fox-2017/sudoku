"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string
    this.arr = []
    this.index = 0
    this.barisKolom = []
    this.counter = 1
    this.status = false
  }
  check_Kosong(){
    for(let i =0 ; i<9 ;i++){
      // counter++
      for (let j = 0; j <10; j++) {

        //ngecek nilai 0 dimana ajj trus push ke arr
        if (this.arr[i][j] === 0){
          this.barisKolom.push({x:i,y:j})
        }
      }
    }
  }



  //ngirim parameter buat dapetin tebakan
  check_tebakan(){
    for(let i = 0;i<this.barisKolom.length;i++){
      let x = this.barisKolom[i].x
      let y = this.barisKolom[i].y

      for (var tebakan = 1; tebakan <= 9; tebakan++) {
            if ( this.checkSolve(x , y, tebakan) ) {
                this.arr[x][y] = tebakan;

            }

          // else{
          //   this.counter++
          //   // hasilCheck = this.check_Row(x,this.counter,hasilCheck)
          //   if (this.counter > 9){
          //     this.counter = 1
          //   // }
          }
        }

    return this.arr
  }
  checkSolve(x,y,tebakan) {
      return this.check_Row(x,tebakan) && this.check_Colom(y, tebakan) && this.check3x3(x, y, tebakan);
  }

  check_Row(x,tebakan){ // ngecek counter ada yang sama ga di baris
    for (let i = 0;i<9;i++){
      if (this.arr[x][i] === tebakan){
        return false
      }
    }
    // console.log('ini tebakan ' + x + ' '+ this.counter + ' '+ this.check_Colom(x,tebakan));
    // console.log('ini tebakan ' + x + ' '+ this.counter + ' '+ this.check_Colom(y,tebakan));
    // let checkKolom = this.check_Colom(y,tebakan)
    return true
  }

  check_Colom(y,tebakan){
    for (let i = 0;i<9;i++){
      if (this.arr[i][y] === tebakan){
        return false
      }
    }
    return true
  }

  check3x3(x,y,tebakan){
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;

    for (var r = 0; r < 3; r++){
        for (var c = 0; c < 3; c++){
            if (this.arr[x + r][y + c] === tebakan){
                return false;
            }
          }
      }
    return true;

  }

  solve(tebak) {
    let counter = 0
    for(let i =0 ; i<9 ;i++){
      counter++
      for (let j = 0; j <9; j++) {
        if (this.arr[i][j] === 0){
        //   for (var tebakan = 1; tebakan <= 9; tebakan++) {
        //         if ( this.noConflicts(x , y, tebakan) ) {
        //             this.arr[x][y] = tebakan;
        //
        //         }
        // }
          // this.arr[i][j] = counter
        }
      }
    }
    console.log('-----------------------')
 console.log(this.arr)
  }

  // Returns a string representing the current state of the board
  board() {
    let counter = 0
    for(let i =0 ; i<9;i++){
      this.arr.push([]);
        for (let j =0; j<9;j++){
          this.arr[i].push(Number(this.boardString[counter]))
          counter++
        }
    }

    console.log('-----------------------')
    console.log(this.arr)
      console.log('-----------------------')
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

game.board()
game.check_Kosong()
console.log(game.check_tebakan())
// console.log(game.arr)
// game.solve()
