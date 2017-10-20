class Sudoku {
    
    constructor() {
        this.arr = []
        this.tes = ""
    }
    
    createBoard(input) {
        var num =  "105802000090076405200400819019007306762083090000061050007600030430020501600308900";
        // var arr = []
        var k = 0
        for(var i = 0; i < input; i++){
            var arrRow = [];
            for(var j = 0; j < input; j++){
                arrRow.push(num[k])
                k++
            }
            this.arr.push(arrRow)
        }
        console.log( this.arr)
    }

    checker() {
        console.log(this.arr)
        var isiArr = this.createBoard()
        console.log(isiArr)
    }
}

var sudoku = new Sudoku()
sudoku.createBoard(9)
