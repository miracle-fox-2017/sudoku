"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string;
    this.solving = this.unsolved();
  }

//method cekBaris untuk mengecek nilai tebakan baris
cekBaris(area, baris, kolom, tebak){
    for (let newbaris = 0; newbaris < 9; newbaris++) {
      if (newbaris != baris && area[newbaris][kolom] == tebak) {
        return false;
      }
    }
    return true;
}

//method cekKolom untuk mengecek nilai tebakan 
cekKolom(area, baris, kolom, tebak){
  for (let newkolom = 0; newkolom < 9; newkolom++) {
    if (newkolom != kolom && area[baris][newkolom] == tebak) {
      return false;
    }
  }
  return true;
}

//method cekArea3x3 untuk mengecek nilai tebakan di area 3X3
cekArea3x3(area, baris, kolom, tebak){
  let y = Math.floor((baris / 3)) * 3;
  let x = Math.floor((kolom / 3)) * 3;

  for (let subBaris = 0; subBaris < 3; subBaris++) {
    for (let subKolom = 0; subKolom < 3; subKolom++) {
      if (subBaris != baris && subKolom != kolom && area[y + subBaris][x + subKolom] == tebak) {
        return false;
      }
    }
  }
  return true;
}

  unsolved() {
    let unsolvedArray = [];

    for (let i = 0; i < this.string.length; i += 9) {
      let setArray = [];
      for (let j = i; j < i+9; j++) {
        setArray.push(+this.string[j]);
      }
      unsolvedArray.push(setArray);
    }
    return unsolvedArray;
  }

  //solving semua area matrix kolom baris dan grup 3x3
  solve(area) {
    for (let baris = 0; baris < 9; baris++) {
      for (let kolom = 0; kolom < 9; kolom++) {

        if (area[baris][kolom] !== 0) {
          continue;
        }

        for (let tebak = 1; tebak <= 9; tebak++) {

          if (this.cekBaris(area, baris, kolom, tebak) && this.cekKolom(area, baris, kolom, tebak) && this.cekArea3x3(area, baris, kolom, tebak) == true) {
            area[baris][kolom] = tebak;
            let cekTebak = this.solve(area);

            if (cekTebak === true) {
              return true;
            }

            area[baris][kolom] = 0;
          }
        }

        return false;
      }
    }

    return true;
  }

  checkSolve() {
    this.solve(this.solving);
  }
  // Returns a string representing the current state of the board
  // method board untuk init dan solving sudoku
  board() {
    let init = this.unsolved();
    for (let i = 0; i < 9; i++) {
      init[i].splice(7, 0, '|');
      init[i].splice(3, 0, '|');
      init[i] = init[i].join(' ');
      this.solving[i].splice(3, 0, '|');
      this.solving[i].splice(7, 0, '|');
      this.solving[i] = this.solving[i].join(' ');
    }
    //cek line 
    let cekLine = [];
    for (let j = 0; j < 21; j++) {
      cekLine.push('-');
    }

    cekLine = cekLine.join('');

    for (let l = 0; l < 16; l += 4) {
      init.splice(l, 0, cekLine);
      this.solving.splice(l, 0, cekLine);
    }

    console.log("\n");
    console.log('Init Board :');
    console.log(init.join("\n"));
    console.log("\n");
    console.log('Sudoku : ');
    console.log(this.solving.join('\n'));
  }
}

// The file has newLines at the end of each Line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];
var game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900');

game.checkSolve();
game.board();