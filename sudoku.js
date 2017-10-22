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
        this.boardHorizontal=[];
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
        this.boardVertical=[];
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
        let boxLoc=[];
        let tempStart=0;
        let countSplit=0;
        this.boardBox=[];
        let tempNum=this.angka.split("");
        for(let i=0;i < this.size;i++){
            let counter=0;
            let start=i * 3;
            let tempArr=[];
            let tempLoc=[];
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
                tempLoc.push(start);
                start++;
            }
            boxLoc.push(tempLoc);
            this.boardBox.push(tempArr);
        }
        return {val:this.boardBox,loc:boxLoc}; // Return each box value and location in index
    }
    // Set Row, Col, Box Check
    setRow(splicePos,row=0){
        if(splicePos >= 9 && splicePos <= 17){
            row=1;
        }else if(splicePos >= 18 && splicePos <= 26){
            row=2;
        }else if(splicePos >= 27 && splicePos <= 35){
            row=3;
        }else if(splicePos >= 36 && splicePos <= 44){
            row=4;
        }else if(splicePos >= 45 && splicePos <= 53){
            row=5;
        }else if(splicePos >= 54 && splicePos <= 62){
            row=6;
        }else if(splicePos >= 63 && splicePos <= 71){
            row=7;
        }else if(splicePos >= 72 && splicePos <= 80){
            row=8;
        }
        return row;
    }
    setCol(splicePos,col=0){
        if(splicePos % 9 === 1){
            col=1;
        }else if(splicePos % 9 === 2){
            col=2;
        }else if(splicePos % 9 === 3){
            col=3;
        }else if(splicePos % 9 === 4){
            col=4;
        }else if(splicePos % 9 === 5){
            col=5;
        }else if(splicePos % 9 === 6){
            col=6;
        }else if(splicePos % 9 === 7){
            col=7;
        }else if(splicePos % 9 === 8){
            col=8;
        }
        return col;
    }
    setBox(splicePos,box=0){
        const index=this.createBox().loc;
        if(index[0].includes(splicePos)){
            box=0;
        }else if(index[1].includes(splicePos)){
            box=1;
        }else if(index[2].includes(splicePos)){
            box=2;
        }else if(index[3].includes(splicePos)){
            box=3;
        }else if(index[4].includes(splicePos)){
            box=4;
        }else if(index[5].includes(splicePos)){
            box=5;
        }else if(index[6].includes(splicePos)){
            box=6;
        }else if(index[7].includes(splicePos)){
            box=7;
        }else if(index[8].includes(splicePos)){
            box=8;
        }
        return box;
    }
    // Solving
    solve(){
        let locArr=[];
        let splicePos=0; // Splice Position
        let tempNum=this.angka.split("");
        for(let i=0;i < this.size;i++){ // Perulangan jumlah baris
            for(let j=0;j < this.size;j++){ // Perulangan jumlah angka per baris
                if(this.createHorizontal()[i][j] === 0){ // Jika ditemukan angka 0 pada setiap baris maka splicePos akan di temukan
                    locArr.push(splicePos);
                    let row=this.setRow(splicePos);
                    let col=this.setCol(splicePos);
                    let box=this.setBox(splicePos);
                    for(let k=1;k <= this.size;k++){ // Cek setiap angka dari 1 - 9
                        if(!this.createHorizontal()[row].includes(k) && !this.createVertical()[col].includes(k) && !this.createBox().val[box].includes(k)){
                            tempNum.splice(splicePos,1,k.toString());
                            this.angka=tempNum.join("");
                        }
                    }
                }
                splicePos++; // Increament 0,1,2,3,4,5,......
            }
        }
    }
    // Returns a string representing the current state of the board / Print result board
    board(){
        return this.createHorizontal();
    }
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
console.log("Papan Awal");
console.log(game.board());
console.log("================================");
game.solve();
console.log("Papan Akhir");
console.log(game.board());
console.log("================================");
