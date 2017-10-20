"use strict"

class Cell
{
  constructor(name)
  {
    this.name = name;
    this.element = [1,2,3,4,5,6,7,8,9];
  }

  removeElement(num)
  {
    this.element.splice(this.element.indexOf(num), 1);
  }

  checkElement(num)
  {
    return this.element.indexOf(num) === -1;
  }

  getLength()
  {
    return this.element.length;
  }

  getValue()
  {
    return this.element[0];
  }
}


class Sudoku {
  constructor(input)
  {
    this.field = this.initialize(input);
  }

  initialize(input)
  {
    let arr = [];
    let temp = 1;
    let k = 0;
    for (let i = 0; i < 9; i++)
    {
      arr.push([]);
      for (let j = 0; j < 9; j++)
      {
        if (input[k] === "0")
        {
          arr[i][j] = (new Cell(temp));
        }
        else
        {
          arr[i][j] = Number(input[k]);
        }
        k++;
        temp++;
      }
    }
    return arr;
  }

  solve ()
  {
    do
    {
      for (let i = 0; i < this.field.length; i++)
      {
        for (let j = 0; j < this.field.length; j++)
        {
          if (this.field[i][j].toString().length !== 1)
          {
            this.horizontalCheck(i, this.field[i][j]);
            this.verticalCheck(j, this.field[i][j]);
            this.blockCheck(i, j, this.field[i][j]);
            if (this.field[i][j].getLength() === 1)
            {
              let temp = this.field[i][j].getValue();
              this.field[i][j] = temp;
            }
          }
        }
      }
    } while (!this.isFull());
  }

  horizontalCheck (yLocation, cell)
  {
    for (let i = 0; i < this.field.length; i++)
    {
      debugger;
      if (!cell.checkElement(this.field[yLocation][i]))
      {
        cell.removeElement(this.field[yLocation][i]);
      }
    }
  }

  verticalCheck (xLocation, cell)
  {
    for (let i = 0; i < this.field.length; i++)
    {
      if (!cell.checkElement(this.field[i][xLocation]))
      {
        cell.removeElement(this.field[i][xLocation]);
      }
    }
  }

  blockCheck (xLocation, yLocation, cell)
  {
    let xStart = 0;
    let yStart = 0;

    if (xLocation < 3)
    {
      xStart = 0;
    }
    else if (xLocation < 6)
    {
      xStart = 3;
    }
    else
    {
      xStart = 6;
    }

    if (yLocation < 3)
    {
      yStart = 0;
    }
    else if (yLocation < 6)
    {
      yStart = 3;
    }
    else
    {
      yStart = 6;
    }

    for (let i = xStart; i < xStart + 3; i++)
    {
      for (let j = yStart; j < yStart + 3; j++)
        {
          if (!cell.checkElement(this.field[i][j]))
          {
            cell.removeElement(this.field[i][j]);
          }
        }
    }
  }

  isFull()
  {
    for (let i = 0; i < this.field.length; i++)
    {
      for (let j = 0; j < this.field.length; j++)
      {
        if (this.field[i][j].toString().length !== 1)
        {
          return false;
        }
      }
    }
    return true;
  }

  board()
  {
    return this.field;
  }
}



// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var game = new Sudoku("300200000000107000706030500070009080900020004010800050009040301000702000000008006")

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())




//
// let game = new Board(
//   [
//     [5,3,0,0,7,0,0,0,0],
//     [6,0,0,1,9,5,0,0,0],
//     [0,9,8,0,0,0,0,6,0],
//     [8,0,0,0,6,0,0,0,3],
//     [4,0,0,8,0,3,0,0,1],
//     [7,0,0,0,2,0,0,0,6],
//     [0,6,0,0,0,0,2,8,0],
//     [0,0,0,4,1,9,0,0,5],
//     [0,0,0,0,8,0,0,7,9]
//   ]);
//
// board.initialize();
//
// console.log(board.solve());
// console.log(JSON.stringify(board, 0, 2));
