"use strict"

class Sudoku {
    constructor(board_string){
      this.size=9;
      this.boardBox=[];
      this.boardVertical=[];
      this.boardHorizontal=[];
      this.angka=board_string;
    }
    // Create
    createHorizontal(){
        let tempNum=this.angka.split("");
        for(let i=0;i < this.size;i++){
            let tempArr=[];
            for(let j=0;j < this.size;j++){
                tempArr.push(parseInt(tempNum[0]));
                tempNum.shift();
            }
            this.boardHorizontal.push(tempArr);
        }
        return this.boardHorizontal;
    }
    createVertical(){
        let tempNum=this.angka.split("");
        for(let i=0;i < this.size;i++){
            let counter=i;
            let tempArr=[];
            for(let j=0;j < this.size;j++){
                tempArr.push(parseInt(tempNum[counter]));
                counter+=9;
            }
            this.boardVertical.push(tempArr);
        }
        return this.boardVertical;
    }
    createBox(){
        let tempStart=0;
        let countSplit=0;
        let tempNum=this.angka.split("");
        for(let i=0;i < this.size;i++){
            let counter=0;
            let start=i * 3;
            let tempArr=[];
            if(i > 2 && i % 3 === 0){
                start*=3;
                tempStart=start;
            }else if(i > 2){
                countSplit++;
                start=3 * countSplit + tempStart;
                countSplit === 2 ? countSplit=0 : countSplit=countSplit;
            }
            for(let j=0;j < this.size;j++){
                if(counter === 3){
                    start+=6;
                    counter=0;
                }
                counter++;
                tempArr.push(parseInt(tempNum[start]));
                start++;
            }
            this.boardBox.push(tempArr);
        }
        return this.boardBox;
    }
    solve(){}
    // Returns a string representing the current state of the board / Print result board
    board(){}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

//var game = new Sudoku(board_string);
var game = new Sudoku("105802000090076405200400819019007306762083090000061050007600030430020501600308900");

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log(game.board());
