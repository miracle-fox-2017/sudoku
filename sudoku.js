class Sudoku {
	constructor(board){
		this.board = this.convertToArr(board);
	}

// convert string menjadi board 9x9	
	convertToArr(board){
		let arr = [];
		let newArr = []
		for (let i = 0 ; i<board.length ; i++){
			newArr.push(board[i])
			if((i+1)%9 === 0){
				arr.push(newArr);
				newArr = []
			}
		}
		return this.convertToNumber(arr);
	}	

// convert to num , for good interface
	convertToNumber(board){
		for (let i = 0 ; i<board.length ; i++){
			for (let j = 0 ; j<board.length ; j++){
				board[i][j] = Number(board[i][j])
			}
		}
		// console.log("First Board")
		// console.log((board))
		this.firstBoard(board)
		return this.checkBoard(board);
	}	

//print first Board	
	firstBoard(board){
		console.log("First Board")
		console.log("---------------------")		
		for (let i = 0 ; i<9 ; i++){
			let temp = '';
			for (let j = 0 ; j <9 ; j++){
				if (j == 2 || j == 5){
				temp = temp + board[i][j] + " | "	
				}
				else{
				temp = temp + board[i][j] +" "
				}
			}
			console.log(temp)
			if (i == 2 || i == 5){
				console.log("---------------------")
			}
		}
		console.log("---------------------")		
	}

// make Vertical Array to make easier check Vertical
	convertVerticalArray(board, index){
		let newArr = []
		for (let i = 0 ; i<board.length ; i++){
			newArr.push(board[i][index]);
		}
		return newArr;
	}	
//check board 0
	checkBoard(board){
		let num = 1;
		for (let i = 0 ; i <board.length ; i++){
			for (let j = 0 ; j<board.length ; j++){	
				let num = 1;
				if (board[i][j] === 0){
					while(num <10){
						if (this.checkHorizontal(board,i,j,num) && this.checkVertical(board,i,j,num) && this.checkSquare(board,i,j,num)) {
								board[i][j] = num;
								num++
								break;
							//step by step console log here
							//console.log(board)
						}	
						else {
							num++
						}
					}	
				}	
			}	
		}
		return this.board = board;
	}

//checkHorizontal	
	checkHorizontal(board,baris, index,num){
		// console.log(num , baris)
		if(board[baris].indexOf(num) === -1){
			return true;
		}
		return false 
	}

//checkVertical
	checkVertical(board,baris, index,num){
		// console.log(num , baris , index)
		if(this.convertVerticalArray(board,index).indexOf(num) === -1){
				return true
		}
		return false;
	}	

//checkSquare	
	checkSquare(board,baris, index,num){
		this.checkIndexSquareLength(index)
		this.checkIndexSquareStart(index)
		if (baris < 3){
			for (let i = 0; i<3 ; i++){
				for (let j = this.checkIndexSquareStart(index) ; j<this.checkIndexSquareLength(index) ; j++){
					// console.log(num,baris,index,this.checkIndexSquareStart(index), this.checkIndexSquareLength(index),i,j)
					if (board[i][j] === num && j !== index){
						return false
					}  
				}
			}
			return true;
		}
		if (baris > 2 && baris < 6){
			for (let i = 3; i<6 ; i++){
				for (let j = this.checkIndexSquareStart(index) ; j<this.checkIndexSquareLength(index) ; j++){
					if (board[i][j] === num && j !== index){
						return false
					}  
				}
			}
			return true;			
		}
		if (baris > 5 && baris < 9){
			for (let i = 6; i<9 ; i++){
				for (let j = this.checkIndexSquareStart(index) ; j<this.checkIndexSquareLength(index) ; j++){
					if (board[i][j] === num && j !== index){
						return false
					}  
				}
			}
			return true;
		}
	}

//check length Square
	checkIndexSquareLength(index){
		if (index <3) return 3
		if (index >2 && index <6) return 6
		if (index >5 && index <9) return 9		
	}

//check Start Square
	checkIndexSquareStart(index){
		if (index <3) return 0
		if (index >2 && index <6) return 3
		if (index >5 && index <9) return 6		
	}

//Sudoku Finish solve
	solve(){
		console.log("Finished Board")
		console.log("---------------------")		
		for (let i = 0 ; i<9 ; i++){
			let temp = '';
			for (let j = 0 ; j <9 ; j++){
				if (j == 2 || j == 5){
				temp = temp + this.board[i][j] + " | "	
				}
				else{
				temp = temp + this.board[i][j] +" "
				}
			}
			console.log(temp)
			if (i == 2 || i == 5){
				console.log("---------------------")
			}
		}
		console.log("---------------------")
	}
}

var game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')
game.solve();