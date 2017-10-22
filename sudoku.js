"use strict"

 class Sudoku {
   constructor(board_string) {
     this.board_string = board_string;
     this.zeroPos = [];
     this.board = []

  }

  solve() {
    while(this.zeroPos.length > 0){
      //simpan angka tebakan
      let tebakAngka = this.randomNum()
      //panggil semua fungsi cek dengan parameter elemen array posisi 0 dan angka tebakan
      if(this.cekSamping(this.zeroPos[0],tebakAngka)===false && this.cekKebawah(this.zeroPos[0],tebakAngka)===false && this.cekKotak(this.zeroPos[0],tebakAngka)===false){
        //jika semua kondisi terpenuhi masukan tebakan angka ke index posisi 0
        this.board[+this.zeroPos[0][0]][this.zeroPos[0][1]] = tebakAngka.toString()
        this.zeroPos.shift()
      }
    }
  }

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

//fungsi untuk cek samping
  cekSamping(posisinol,tebakan){
    for(let i = 0; i < this.board[+posisinol[0]].length; i++){
      if(this.board[+posisinol[0]][i]==tebakan){
        return true
      }
    }
    return false
  }

//fungsi untuk cek menurun
  cekKebawah(posisinol,tebakan){
    for(let i = 0; i < this.board.length; i++){
      if(this.board[i][+posisinol[1]]==tebakan){
        return true
      }
    }
    return false
  }
  //cek Kotak 3x3
  cekKotak(posisinol,tebakan){
    let kotak1zone = ['00','01','02','10','11','12','20','21','22']
    let kotak2zone = ['03','04','05','13','14','15','23','24','25']
    let kotak3zone = ['06','07','08','16','17','18','26','27','28']

    let kotak4zone = ['30','31','32','40','41','42','50','51','52']
    let kotak5zone = ['33','34','35','43','44','45','53','54','55']
    let kotak6zone = ['36','37','38','46','47','48','56','57','58']

    let kotak7zone = ['60','61','62','70','71','72','80','81','82']
    let kotak8zone = ['63','64','65','73','74','75','83','84','85']
    let kotak9zone = ['66','67','68','76','77','78','86','87','88']

    if(kotak1zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak1zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak1zone[i][0]][+kotak1zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak2zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak2zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak2zone[i][0]][+kotak2zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak3zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak3zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak3zone[i][0]][+kotak3zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak4zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak4zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak4zone[i][0]][+kotak4zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak5zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak5zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak5zone[i][0]][+kotak5zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak6zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak6zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak6zone[i][0]][+kotak6zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak7zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak7zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak7zone[i][0]][+kotak7zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak8zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak8zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak8zone[i][0]][+kotak8zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    if(kotak9zone.indexOf(posisinol)!==-1){
      for(let i = 0; i < kotak9zone.length;i++){
        //console.log(this.board[+kotak1zone[i][0]][+kotak1zone[i][1]])
        if(+this.board[+kotak9zone[i][0]][+kotak9zone[i][1]]==tebakan){
          //console.log(this.board[kotak1zone[i][0][kotak1zone[i][1]]],tebakan)
          return true
        }
      }
    }
    return false
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
//
console.log(game.solve())
console.log(game.board)
