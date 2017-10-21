"use strict"

class Sudoku {
    constructor(board_string) {
        this.board_string = board_string;
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    solve() {
        let arrBoard = this.board();
        let counter = 0;

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (arrBoard[i][j] == 0) {
                    arrBoard[i][j] = this.getSudokuNumber(arrBoard, i, j);
                }
                // console.log(arrBoard);
                counter++;
                // console.log(`Run ${counter} \n`);
                // this.sleep(300);
                // console.log(arrBoard[i][j]+' - pos: '+i+j);
            }
        }

        console.log(arrBoard);
    }

    getRestOfNumbers(arrNum) {
        let arrRest = [];

        for (var i = 0; i < 9; i++) {
            arrRest.push(i + 1)
        }

        var arrLeft = arrRest.filter(function(obj) {
            return arrNum.indexOf(obj) == -1;
        });

        return arrLeft;
    }

    getEmptyPositionSingle(arrBoard, baris = 'all', kolom = 'all') {
        let arrIndexO = [];

        for (var i = 0; i < 9; i++) {
            if (baris !== 'all' || kolom != 'all') {
                if (baris === i) {
                    for (var j = 0; j < 9; j++) {
                        if (arrBoard[i][j] == 0) {
                            arrIndexO.push([i, j]);
                        }
                    }
                }

                for (var j = 0; j < 9; j++) {
                    if (kolom === j) {
                        if (arrBoard[i][j] == 0) {
                            arrIndexO.push([i, j]);
                        }
                    }
                }
            } else {
                for (var j = 0; j < 9; j++) {
                    if (arrBoard[i][j] == 0) {
                        arrIndexO.push([i, j]);
                    }
                }
            }
        }

        return arrIndexO;
    }

    getEmptyPositionAllBoard(arrBoard) {
        let arrIndexO = [];

        for (var i = 0; i < arrBoard.length; i++) {
            for (var j = 0; j < arrBoard[i].length; j++) {
                if (arrBoard[i][j] === 0) {
                    arrIndexO.push([i, j]);
                }
            }
        }

        return arrIndexO;
    }

    getNotEmptyRowCol(arrBoard, baris, kolom) {
        let arrNotEmpty = [];

        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 9; j++) {
                if (arrBoard[baris][j] !== 0) {
                    arrNotEmpty.push(arrBoard[i][j])
                }
            }
        }


        for (var x = 0; x < 9; x++) {
            if (arrBoard[x][kolom] !== 0) {
                arrNotEmpty.push(arrBoard[x][kolom])
            }
        }

        return Array.from(new Set(arrNotEmpty));
    }

    get3x3Box(arrBoard, baris, kolom) {
        let locArr = [];
        let arr3x3 = [];
        let counter = 0;
        let maxLoop = 3;
        let arrLocation = [
            [
                [0, 0],
                [0, 3],
                [0, 6]
            ],
            [
                [3, 0],
                [3, 3],
                [3, 6]
            ],
            [
                [6, 0],
                [6, 3],
                [6, 6]
            ],
        ]

        // 1, 1
        // console.log(arrLocation[baris][kolom]);

        let startBaris = arrLocation[baris][kolom][0];
        let startKolom = arrLocation[baris][kolom][1];

        for (var i = startBaris; i < startBaris + 3; i++) {
            for (var j = startKolom; j < startKolom + 3; j++) {
                locArr.push(arrBoard[i][j])
            }
        }

        return locArr;
    }

    getBoxArr(arr) {
        let arrBox = [];
        let counter = 0;

        for (var x = 0; x < 3; x++) {
            arrBox.push([]);

            for (var y = 0; y < 3; y++) {
                arrBox[x].push(arr[counter]);
                counter++;
            }
        }

        return arrBox;
    }

    // Kembalikan posisi kotak 3x3 dari suatu posisi angka
    get3x3BoxLocation(baris, kolom) {
        if (baris < 3 && kolom < 3) {
            return [0, 0]
        }

        if (baris < 3 && (kolom > 2 && kolom < 6)) {
            return [0, 1];
        }

        if (baris < 3 && (kolom > 5 && kolom < 9)) {
            return [0, 2];
        }

        if ((baris > 2 && baris < 6) && kolom < 3) {
            return [1, 0];
        }

        if ((baris > 2 && baris < 6) && (kolom > 2 && kolom < 6)) {
            return [1, 1];
        }

        if ((baris > 2 && baris < 6) && (kolom > 5 && kolom < 9)) {
            return [1, 2];
        }

        if ((baris > 5 && baris < 9) && (kolom < 3)) {
            return [2, 0];
        }

        if ((baris > 5 && baris < 9) && (kolom > 2 && kolom < 6)) {
            return [2, 1];
        }

        if ((baris > 5 && baris < 9) && (kolom > 5 && kolom < 9)) {
            return [2, 2];
        }
    }

    // [0, 1]
    getSudokuNumber(arrboard = this.board(), baris, kolom) {
        let arrIndexO = []; //[baris, kolom]
        let arrIndexNum = [];
        let arrEmpty = this.getEmptyPositionAllBoard(arrboard); // Seluruh Array yang kosong
        let chosenArray = [];

        let arrNotEmptyTarget = this.getNotEmptyRowCol(arrboard, baris, kolom); // dnms Ambil seluruh nilai di baris kolom yg tidak '0' di target
        let numberToEntersRowCol = this.getRestOfNumbers(arrNotEmptyTarget);
        let target3x3 = this.get3x3BoxLocation(baris, kolom); // dnms
        let getTarget3x3Square = this.get3x3Box(arrboard, target3x3[0], target3x3[1]); //fix

        // console.log(arrEmpty); 
        // console.log("Nilai not empty (0,1): "+arrNotEmptyTarget); // 
        // console.log("Nilai bisa masuk (0,1): "+numberToEntersRowCol) // dapatkan nilai sisa yang memungkinan masuk ke target 

        // Get quadran kotak berdasarkan posisi : (0, 1) ada di kota (0, 0)
        // console.log("Lokasi 3x3 target "+target3x3);
        // console.log("Isi 3x3 target: "+getTarget3x3Square) // get 3x3 target

        chosenArray = numberToEntersRowCol.filter((val) => getTarget3x3Square.indexOf(val) == -1);

        if (chosenArray.length > 0) {
            return chosenArray[0];
        } else {
            // console.log('POSISI'+baris+kolom);
            // this.getEmptyPositionSingle(arrboard, baris, kolom);
            // this.getNotEmptyRowCol(arrboard, baris, kolom);
            let arNotemp = this.getEmptyPositionSingle(arrboard, baris, kolom);
            let insertNumber = this.getRestOfNumbers(arNotemp);

            // return this.getSudokuNumber(arrboard, baris, kolom);

            // HOT FIX! Masih Bug!
            if (kolom < 8) {
                if (arrboard[baris][kolom + 1] + 1 > 8) {
                    return arrboard[baris][kolom + 1] - 1;
                } else {
                    return arrboard[baris][kolom + 1] + 1;
                }

            } else {
                if (arrboard[baris][kolom + 1] + 1 > 9) {
                    return arrboard[baris][kolom - 1] - 1;
                } else {
                    return arrboard[baris][kolom - 1] + 1;
                }
            }
        }

    }

    // Returns a string representing the current state of the board
    board() {
        let arrNum = this.board_string.split('').map((strNum) => +strNum);
        let box = [];
        let counter = 0;

        for (var i = 0; i < 9; i++) {
            let boxItem = [];
            box.push(boxItem);

            for (var j = 0; j < 9; j++) {
                box[i].push(arrNum[counter]);
                counter++;
            }
        }

        return box;
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
// console.log(game.getSudokuNumber(0, 1))

// Jika 0, ISI
let board = game.board();

// console.log(game.getSudokuNumber(board,0,1));
// board[0][1] = game.getSudokuNumber(board,0,1);

// console.log(board)

// console.log(game.getSudokuNumber(board,0,4));
// board[0][4] = game.getSudokuNumber(board,0,4);

// console.log(board)

// console.log(game.getSudokuNumber(board,0,6));
// board[0][6] = game.getSudokuNumber(board,0,6);

// console.log(board)

// console.log(game.getSudokuNumber(board,0,7));
// board[0][7] = game.getSudokuNumber(board,0,7);

// console.log(board)


// console.log(game.getSudokuNumber(board,0,8));
// board[0][8] = game.getSudokuNumber(board,0,8);

// console.log(board)