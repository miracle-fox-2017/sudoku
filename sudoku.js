"use strict"

class Sudoku {
  constructor(board_string)
  {
    this.unsolved_board = this.board()
    this.zero_block = this.coordinate()

  }

  solve() {}

  horizontal(y, x, num)
  {
    for(let i = 0; i < 9; i++)
    {
      if(this.unsolved_board[y][i] == num)
      {
        return false
      }
    }
    return true
    // let coordinate = this.zero_block[i]
    // let x = coordinate[i][1]
    // let y = coordinate[i][0]
    // let poss_num = []
    // let num = 1
    // for(let i = 0; i < 9; i++)
    // {
    //   for(let j = 0; j < 9; j++)
    //   {
    //     if(num != this.unsolved_board[i][j])
    //     {
    //       poss_num.push(num)
    //       num + 1
    //     }
    //     else
    //     {
    //         num + 1
    //     }
    //   }
    // }
    // return poss_num
  }

  vertical(y, x , num)
  {
    for(let i = 0; i < 9; i++)
    {
      if(this.unsolved_board[i][x] == num)
      {
        return false
      }
    }
    return true
  }

  quadrant(y, x, num)
  {
    let yStart = 0
    let xStart = 0
    if(y < 3)
    {
      yStart = 0
    }
    if(y > 2 && y < 6)
    {
      yStart = 3
    }
    if(y > 5)
    {
      yStart = 6
    }
    if(x < 3)
    {
      xStart = 0
    }
    if(x > 2 && x < 6)
    {
      xStart = 3
    }
    if(x > 5)
    {
      xStart = 6
    }
    for(let i = yStart; i < yStart + 3; i++)
    {
      for(let j = xStart; j < xStart + 3; j++)
      {
        if(this.unsolved_board[i][j] == num)
        {
          return false
        }
      }
    }
    return true
  }

  coordinate()
  {
    let arr = []
    for(let i = 0; i < this.unsolved_board.length; i++)
    {
      for(let j = 0; j < this.unsolved_board[i].length; j++)
      {
        if(this.unsolved_board[i][j] == 0)
        {
          arr.push([i,j])
        }
      }
    }
    return arr
  }

  // Returns a string representing the current state of the board
  board()
  {
    let arr = []
    let index = 0;
    for(let i = 0; i < 9; i++)
    {
      arr.push([])
      for(let j = 0; j < 9; j++)
      {
        arr[i].push(board_string[index])
        index = index + 1
      }
    }
    // this.problem_board = arr
    return arr
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

console.log(game.board())
// console.log(game.coordinate())
console.log(game.horizontal(0,1,2))
console.log(game.vertical(0,1,2))
console.log(game.quadrant(0,1,2))
