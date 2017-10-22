"use strict"

class Sudoku {
  constructor(str) {
    this.str = str;
  }

  generateBoard() {
    const block = [];
    let index = 0;

    for (let i = 0; i < 3; i++) {
      block.push([], [], []);

      for (let j = 0; j < 3; j++) {
        const subStr = this.str.split('').slice(index, index + 9);
        index += 9;
  
        block[i * 3 + 0] = block[i * 3 + 0].concat(subStr.slice(0, 3));
        block[i * 3 + 1] = block[i * 3 + 1].concat(subStr.slice(3, 6));
        block[i * 3 + 2] = block[i * 3 + 2].concat(subStr.slice(6, 9));
      }
    }

    return block;
  }

  rowCheck(indexI, indexJ, k, board) {
    if (indexI < 3) {
      for (let i = 0; i < 3; i++) {

        if (indexJ < 3) {
          for (let j = 0; j < 3; j++) {
            
            if (Number(board[i][j]) === k) {
              return 1;
            }
          }
        } else if (indexJ > 2 && indexJ < 6) {
          for (let j = 3; j < 6; j++) {
            
            if (Number(board[i][j]) === k) {
              return 1;
            }
          }
        } else if (indexJ > 5) {
          for (let j = 6; j < 10; j++) {
            
            if (Number(board[i][j]) === k) {
              return 1;
            }
          }
        }
      }

      return 0;
    } else if (indexI > 2 && indexI < 6) {
      for (let i = 3; i < 6; i++) {

        if (indexJ < 3) {
          for (let j = 0; j < 3; j++) {
            
            if (Number(board[i][j] === k)) {
              return 1;
            }
          }
        } else if (indexJ > 2 && indexJ < 6) {
          for (let j = 3; j < 6; j++) {

            if (Number(board[i][j] === k)) {
              return 1;
            }
          }
        } else if (indexJ > 5) {
          for (let j = 6; j < 10; j++) {

            if (Number(board[i][j] === k)) {
              return 1;
            }
          }
        }
      }

      return 0;
    } else if (indexI > 5) {
      for (let i = 6; i < 9; i++) {
        
        if (indexJ < 3) {
          for (let j = 0; j < 3; j++) {
            
            if (Number(board[i][j] === k)) {
              return 1;
            }
          }
        } else if (indexJ > 2 && indexJ < 6) {
          for (let j = 3; j < 6; j++) {

            if (Number(board[i][j] === k)) {
              return 1;
            }
          }
        } else if (indexJ > 5) {
          for (let j = 6; j < 10; j++) {

            if (Number(board[i][j] === k)) {
              return 1;
            }
          }
        }
      }

      return 0;
    }
  }

  colCheck(j, k, board) {
    for (let i = 0; i < 9; i++) {

      if (Number(board[i][j]) === k) {
        return 1;
      }
    }
    
    return 0;
  }

  groupCheck(indexI, k, board) {
    for (let i = 0; i < 9; i++) {

      if (Number(board[indexI][i]) === k) {
        return 1;
      }
    }

    return 0;
  }

  solve() {
    const board = this.generateBoard();

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        
        if (Number(board[i][j]) === 0) {
          // console.log(true, board[i][j]);
          for (let k = 1; k < 10; k++) {
            if (this.rowCheck(i, j, k, board) === 0
             && this.colCheck(j, k, board) === 0
              && this.groupCheck(i, k, board) === 0) {      
              // console.log(true);
              board[i].splice(j, 1, k);
            }
          }
        }
      }
    }

    let newBoard = '';

    for (let i = 0; i < 9; i++) {
      if (i < 1) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            newBoard += board[j][k];
          }
        }
      } else if (i === 2) {
        for (let j = 0; j < 3; j++) {
          for (let k = 3; k < 6; k++) {
            newBoard += board[j][k];
          }
        }
      } else if (i === 3) {
        for (let j = 0; j < 3; j++) {
          for (let k = 6; k < 9; k++) {
            newBoard += board[j][k];
          }
        }
      } else if (i === 4) {
        for (let j = 3; j < 6; j++) {
          for (let k = 0; k < 3; k++) {
            newBoard += board[j][k];
          }
        }
      } else if (i === 5) {
        for (let j = 3; j < 6; j++) {
          for (let k = 3; k < 6; k++) {
            newBoard += board[j][k];
          }
        }
      } else if (i === 6) {
        for (let j = 3; j < 6; j++) {
          for (let k = 6; k < 9; k++) {
            newBoard += board[j][k];
          }
        }
      } else if (i === 7) {
        for (let j = 6; j < 9; j++) {
          for (let k = 0; k < 3; k++) {
            newBoard += board[j][k];
          }
        }
      } else if (i === 8) {
        for (let j = 6; j < 9; j++) {
          for (let k = 3; k < 6; k++) {
            newBoard += board[j][k];
          }
        }
      } else {
        for (let j = 6; j < 9; j++) {
          for (let k = 6; k < 9; k++) {
            newBoard += board[j][k];
          }
        }
      }
    }

    const result = [];
    let length = 0;
    newBoard = newBoard.split('');
    
    for (let i = 0; i < 9; i++) {
      result.push(newBoard.slice(length, length + 9));
      length += 9;
    }

    return result;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// const game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900');
// const game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900');
// game.solve();

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.solve())
