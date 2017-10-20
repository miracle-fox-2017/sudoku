"use strict"

class Sudoku {
  constructor(board_string) {
    this.problem = board_string;
    this.play = [];
  }

  solve() {
    //init
    this.play = this.board();
    // cari 0, push posisi berapa aja yang mau kita isi
    // pos adalah posisi yang 0
    let pos = [];
    for(let i = 0; i<this.play.length; i++){
      for(let j = 0; j<this.play[i].length; j++){
        if(this.play[i][j] == 0){
          // console.log(i,j,this.play[i][j]);
          pos.push([i,j])
        }
      }
    }
    //yang mau dirubah/yang kosong
    // console.log(pos);

    // cari possibility X
    // pos[lokasi][Y=baris][X=kolom]
    let posX = [];
    for(let x = 0; x<9; x++){
      let tempPosy = []; //1,5,8,2
      // console.log(pos[x]);
      for(let i = 0; i<9; i++){
        if(this.play[x][i] != 0){
          tempPosy.push(Number(this.play[x][i]));
        }
      }
      tempPosy.sort().reverse();

      //generate posy
      //counter 1-9
      let posy = [1,2,3,4,5,6,7,8,9]; //3,4,6,7,9
      let lok = []
      //iris posy dengan tempPosy
      for(let i = 0; i<tempPosy.length; i++){
        posy.splice(posy.indexOf(tempPosy[i]),1);
      }
      posX.push(posy);
    }
    // console.log('possibilityX ======',posX);

    // cari possibility Y
    // pos[lokasi][Y=baris][X=kolom]
    let posY = [];
    for(let y = 0; y<9; y++){
      // console.log('-------',y)
      let tempPosy = []; //3, 5, 8, 9
      // console.log(pos[5]);
      for(let i = 0; i<9; i++){
        if(this.play[i][y] != 0){
          tempPosy.push(Number(this.play[i][y]));
        }
      }
      tempPosy.sort().reverse();
      //generate posy
      //counter 1-9
      let posy = [1,2,3,4,5,6,7,8,9]; //3,4,6,7,9
      let lok = []
      //iris posy dengan tempPosy
      for(let i = 0; i<tempPosy.length; i++){
        posy.splice(posy.indexOf(tempPosy[i]),1);
      }
      posY.push(posy);
    }
    // console.log('possibilityY ======',posY);

    //cari possibility dari region [X,Y]
    //ada 9 region
    //[0-2,0-2], [3-5,0-2], [6-8,0-2]
    //[0-2,3-5], [3-5,3-5], [6-8,3-5]
    //[0-2,6-8], [3-5,6-8], [6-8,6-8]
    let region = [
   // [i,i2,j,j2]
      [], //yang 0 di buat 0 karena region 1-9
      [0,3,0,3],
      [0,3,3,6],
      [0,3,6,9],
      [3,6,0,3],
      [3,6,3,6],
      [3,6,6,9],
      [6,9,0,3],
      [6,9,3,6],
      [6,9,6,9]
    ];
    //tambahkan region diakhir pos
    for(let r = 0; r<pos.length; r++){
      //region 1
      if(pos[r][0]<3 && pos[r][1]<3){
        pos[r].push(1);
      }
      //region 2
      if(pos[r][0]<3 && 2<pos[r][1] && pos[r][1]<6){
        pos[r].push(2);
      }
      //region 3
      if(pos[r][0]<3 && pos[r][1]>5){
        pos[r].push(3);
      }
      //region 4
      if(2<pos[r][0] && pos[r][0]<6 && pos[r][1]<3){
        pos[r].push(4);
      }
      //region 5
      if(2<pos[r][0] && pos[r][0]<6 && 2<pos[r][1] && pos[r][1]<6){
        pos[r].push(5);
      }
      //region 6
      if(2<pos[r][0] && pos[r][0]<6 && pos[r][1]>5){
        pos[r].push(6);
      }
      //region 7
      if(pos[r][0]>5 && pos[r][1]<3){
        pos[r].push(7);
      }
      //region 8
      if(pos[r][0]>5 && 2<pos[r][1] && pos[r][1]<6){
        pos[r].push(8);
      }
      //region 9
      if(pos[r][0]>5 && pos[r][1]>5){
        pos[r].push(9);
      }

    }

    let posR = [];
    posR.push([0])
    for(let r = 1; r<region.length; r++){
      let tempPosyRegion = [];
      for(let i = region[r][0]; i<region[r][1]; i++){
        // console.log(r,i)
        for(let j = region[r][2]; j<region[r][3]; j++){
          // console.log(j)
          // if(r==1){

            if(this.play[i][j] != 0){
              tempPosyRegion.push(this.play[i][j])
            }

          // }
        }
      }
      // console.log(tempPosyRegion);
      tempPosyRegion.sort().reverse();
      //generate posR
      //counter 1-9
      let posr = [1,2,3,4,5,6,7,8,9]; //3,4,6,7,9
      //iris posy dengan tempPosy
      for(let i = 0; i<tempPosyRegion.length; i++){
        posr.splice(posr.indexOf(tempPosyRegion[i]),1);
      }
      posR.push(posr);
    }
    // console.log('possibilityR ======',posR);

    //posisi + proses penimpaan + hapus
    for(let i = 0; i<pos.length; i++){
      let p = pos[i];
      let x = posX[p[0]];
      let y = posY[p[1]];
      let r = posR[p[2]];
      // console.log(p);
      // console.log('possibilityX nya '+x);
      // console.log('possibilityY nya '+y);
      // console.log('possibilityR nya '+r);
      let c = 1;
      let tampungInput = [];
      let stat;
      while(c < 10){
        stat = 0;
        for(let i = 0; i<posX[p[0]].length; i++){
          if(c==posX[p[0]][i]){
            stat += 1;
          }
        }

        for(let i = 0; i<posY[p[1]].length; i++){
          if(c == posY[p[1]][i]){
            stat += 1;
          }
        }

        for(let i = 0; i<posR[p[2]].length; i++){
          if(c==posR[p[2]][i]){
            stat += 1;
          }
        }

        if(stat==3){
          tampungInput.push(c);
        }
        c += 1;
      }

      let input = tampungInput[0];
      // console.log("input ",input);

      //replace tempat
      // console.log(p[0], p[1]);
      if(input == undefined){
        input = 0;
      }
      this.play[p[0]][p[1]] = input;

      //hapus input disemua possibility
      x.splice(x.indexOf(input),1);
      y.splice(y.indexOf(input),1);
      r.splice(r.indexOf(input),1);
      // console.log('NpossibilityX nya '+x);
      // console.log('NpossibilityY nya '+y);
      // console.log('NpossibilityR nya '+r);

    }


    console.log(this.prettyBoard(this.play));
    return '';
  }

  // Returns a string representing the current state of the board
  board() {
    let count = 0;
    let board = [];
    //print to board
    for(let i = 0; i<9; i++){
      board.push([]);
      for(let j = 0; j<9; j++){
        board[i].push(Number(this.problem[count]));
        count += 1;
      }
    }

    return board;
  }

  //pretty print
  prettyBoard(board){
    let printLine = "";
    console.log('-----------------------');
    for(let i = 0;i<9;i++){
    printLine = "";

      for(let j = 0; j<9; j++){
        printLine += board[i][j];
        printLine += " ";
        if((j+1)%3 == 0){
          printLine += '| ';
        }
      }
      if((i+1)%3 == 0){
        printLine += '\n-----------------------';
      }
      console.log(printLine);
    }
    return "";
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
game.solve()
// game.prettyBoard(game.board())
// console.log(game.board())
