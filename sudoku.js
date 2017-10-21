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
                    arrBoard[i][j] = this.getSudokuNumber(arrBoard, i, j)[0];
                }
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

    // Release 1 : Cek Perbaris 
    getNotEmptyRowValue(arrBoard, baris) {
        let arrNotEmpty = [];

        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 9; j++) {
                if (arrBoard[baris][j] !== 0) {
                    arrNotEmpty.push(arrBoard[baris][j])
                }
            }
        }

        return arrNotEmpty;
    }

    // Release 2 : Cek Perkolom 
    getNotEmptyColValue(arrBoard, kolom) {
        let arrNotEmpty = [];

        for (var i = 0; i < 9; i++) {
            if (arrBoard[i][kolom] !== 0){
               arrNotEmpty.push(arrBoard[i][kolom])
            }
        }


        return arrNotEmpty;
    }

    // Release 3 : Cek 3x3
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
    getSudokuNumber(arrBoard = this.board(), baris, kolom) {
        let chosenArray = [];
        // RELEASE 1 dan 2
        // Gabungkan seluruh Angka di baris dan kolom yg tidak 0
        let arrNotEmptyTarget = Array.from(new Set(this.getNotEmptyRowValue(arrBoard, baris).concat(this.getNotEmptyColValue(arrBoard, kolom)))).sort(); 

        // Release 3
        // Ambil seluruh nilai yang tidak 0 di 3x3
        let target3x3 = this.get3x3BoxLocation(baris, kolom); // 
        let getTarget3x3Square = this.getRestOfNumbers(Array.from(new Set(this.get3x3Box(arrBoard, target3x3[0], target3x3[1]))).filter((num) => num > 0 )); 

        // Gabungkan nilai unik dari baris, kolom dan 3x3. Kemudian dari nilai gabungan itu,
        // cari nilai 1 - 9 yang tidak termasuk dalam nilai gabungan. Array hasil tersebut adalah angka pilihan yang kemungkinan masuk kedalam yg bernilai 0.
        chosenArray = getTarget3x3Square.filter( (num) => arrNotEmptyTarget.indexOf(num) == -1 );

        if (chosenArray.length > 0) {
            return chosenArray;
        } else {
            let empPos = this.getNotEmptyRowValue(arrBoard, baris);
            let insertNumber = this.getRestOfNumbers(this.getNotEmptyRowValue(arrBoard, baris));
     
            return insertNumber;
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
game.solve();

let board = game.board();


// // testing();s

// // console.log(game.getRestOfNumbers([1,2,3,4,5,6,7,8])[0]);
// function testing() {
//    let board = game.board();
//    console.log(game.getSudokuNumber(board,0,1)[0]);
//    board[0][1] = game.getSudokuNumber(board,0,1)[0];

//    console.log(board)

//    // console.log(game.getSudokuNumber(board,0,4));
//    // board[0][4] = game.getSudokuNumber(board,0,4)[0];

//    // console.log(board)

//    // console.log(game.getSudokuNumber(board,0,6)[0]);
//    // board[0][6] = game.getSudokuNumber(board,0,6)[0];

//    // console.log(board)

//    // console.log(game.getSudokuNumber(board,0,7)[0]);
//    // board[0][7] = game.getSudokuNumber(board,0,7)[0];

//    // console.log(board)

//    // console.log(game.getSudokuNumber(board,0,8)[0]);
//    // board[0][8] = game.getSudokuNumber(board,0,8);

//    // console.log(board)

//    // console.log(game.getSudokuNumber(board,1,0)[0]);
//    // board[1][0] = game.getSudokuNumber(board,1,0)[0];

//    // console.log(board)

//    // console.log(game.getSudokuNumber(board,1,2)[0]);
//    // board[1][2] = game.getSudokuNumber(board,1,2);

//    // console.log(board)
// }

