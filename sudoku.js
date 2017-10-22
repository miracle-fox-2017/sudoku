"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.arrBoard = []
    this.numbers = ['1','2','3','4','5','6','7','8','9']
  }

  

  // Returns a string representing the current state of the board
  board(input) {
    var k = 0
    for (var i = 0; i < input; i++) {
      var arrRow = [];
      for (var j = 0; j < input; j++) {
        arrRow.push(this.board_string[k])
        k++
      }
      this.arrBoard.push(arrRow)
    }
    return this.arrBoard

  }

  solve(){ //solve sequence looping through array of checker 'numbers' solve horizontal -> vertical if both true print number
    for(var i = 0; i < this.arrBoard.length;i++){
      for(var j = 0; j < this.arrBoard[i].length;j++){
        if(this.arrBoard[i][j] == 0){
          this.numbers.forEach(numbers => {
            if(this.solveHorizontal(i, numbers) && this.solveVertical(j, numbers) && this.solveGroup(i, j, numbers)){
            // if(this.solveHorizontal(i, numbers) && this.solveVertical(j, numbers)){
              this.arrBoard[i][j] = numbers
            }
          });
           
        }
      }
    }
   return this.arrBoard
}
//SOLVERS
  solveHorizontal(i, numbers){
    let arr = this.arrBoard[i]
    if(arr.indexOf(numbers) === -1){
      return true
    }
    else{
      return false
    }
  }
  solveVertical(j, numbers){
    let arr = []
    for(var i = 0; i < this.arrBoard.length;i++){
      arr.push(this.arrBoard[i][j]);
       
      }
      if (arr.indexOf(numbers) === -1){
        return true
      }
      else{
        return false
      }
    }
    //EXPERIMENTAL SOLVER
  solveGroup(i, j, numbers){
    let x = Math.floor(i/3) * 3;
    let y = Math.floor(j/3) * 3;
    let endX = x + 3;
    let endY = y + 3;
    let arrCheck = [];
    for(var awal = 0; awal < endX; awal++){
      for(var yAx = 0; yAx < endY; yAx++){
        arrCheck.push(this.arrBoard[awal][yAx])
      }
    }
    if (arrCheck.indexOf(numbers) === -1){
      return true
    }
    else{
      return false
    }
  }
  }

var board_string =  "105802000090076405200400819019007306762083090000061050007600030430020501600308900"
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

console.log( '----------------Fresh GameBoard(board-string)-------------')
console.log(game.board(9))
console.log('-----------------Solved(no backtracking)--------------------')
console.log(game.solve())
