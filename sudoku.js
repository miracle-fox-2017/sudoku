"use strict"

class Sudoku {
  constructor(board_string) {
  	this.input = board_string
  	this.papan = ''
  	this.indexcheck = []
  }

  solve() {

  	let temp=[]
  	let a=0
  	let j=0
  	let temp1=[]
    let bt = 1
    let indexbt = []
    let change = false

  	this.board

	for(let i=0;i<9;i++){
		for(let j=0;j<9;j++){
			if(this.input[i][j]==='0'){
				temp[a]=i+''+j
				a++
			}
		}
	}

  	while(j<temp.length){
      change = false
  		temp1=temp[j].split('')

         

  		for(let i=bt;i<10;i++){
  			if(this.checkRow(temp1[0],i.toString()) && this.checkCol(temp1[1],i.toString()) && this.checkRegion(i.toString(),temp1[1],temp1[0])){
				  this.input[temp1[0]][temp1[1]]=i.toString()
          i=10
          change = true
  			}
  		}

      if(!change){
        this.input[temp1[0]][temp1[1]]='0'
        j--
        indexbt=temp[j].split('')
        bt=parseInt(this.input[indexbt[0]][indexbt[1]])+1
      }

      if(change){
        j++
        bt=0
      } 
  	}

  	return this
  }

  // Returns a string representing the current state of the board

  initBoard(){
  	let a=0
  	let b=9
  	let c=0
  	let temp=[]
  	let temp1=[]
  	let indexcheck=[]

  	for(let i=0;i<9;i++){
  		temp[i]=this.input.slice(a,b).split('')
  		a=a+9
  		b=b+9
  	}

  	temp1=board_string.split('')

  	for(let i=0;i<temp1.length;i++){
  		if(temp1[i]==='0'){
  			indexcheck[c]=i
  			c++
  		}
  	}

  	this.indexcheck=indexcheck
  	this.input=temp
  	return this
  }

  board() {

  	let temp=''
  	let a=0
  	let b=0

  	for(let i=0;i<13;i++){
  		if(i===0 || i===4 || i===8 || i===12 ){
  			temp+='-----------'
  		}else{
  			for(let k=0;k<11;k++){
  				if(k===3 || k===7){
  					temp+='|'
  				}else{
  					temp+=this.input[a][b]
  					b++
  				}
  			}
  		a++
  		b=0
  		}
  		temp+='\n'
  	}

  	this.papan=temp
  	return this

  }

  checkRow(RowNum,num){

  		if(this.input[RowNum].indexOf(num)!=-1){
  			return false
  		}

  		return true
  }

  checkCol(ColNum,num){

  	for(let i=0;i<9;i++){
  		if(this.input[i][ColNum]===num)
  			return false
  	}

  		return true
  }

  checkRegion(num, ColNum, RowNum){

  	//Region 1
  	if((ColNum>=0 && ColNum<3)&&(RowNum>=0 && RowNum<3)){
  		for(let i=0;i<3;i++){
  			for(let j=0;j<3;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}

  	//Region 2
  	if((ColNum>=3 && ColNum<6)&&(RowNum>=0 && RowNum<3)){
  		for(let i=0;i<3;i++){
  			for(let j=3;j<6;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}

  	//Region 3
  	if((ColNum>=6 && ColNum<9)&&(RowNum>=0 && RowNum<3)){
  		for(let i=0;i<3;i++){
  			for(let j=6;j<9;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}

	//Region 4
  	if((ColNum>=0 && ColNum<3)&&(RowNum>=3 && RowNum<6)){
  		for(let i=3;i<6;i++){
  			for(let j=0;j<3;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}

  	//Region 5
  	if((ColNum>=3 && ColNum<6)&&(RowNum>=3 && RowNum<6)){
  		for(let i=3;i<6;i++){
  			for(let j=3;j<6;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}

  	//Region 6
  	if((ColNum>=6 && ColNum<9)&&(RowNum>=3 && RowNum<6)){
  		for(let i=3;i<6;i++){
  			for(let j=6;j<9;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}  	

  	//Region 7
  	if((ColNum>=0 && ColNum<3)&&(RowNum>=6 && RowNum<9)){
  		for(let i=6;i<9;i++){
  			for(let j=0;j<3;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}

  	//Region 8
  	if((ColNum>=3 && ColNum<6)&&(RowNum>=6 && RowNum<9)){
  		for(let i=6;i<9;i++){
  			for(let j=3;j<6;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	}

  	//Region 9
  	if((ColNum>=6 && ColNum<9)&&(RowNum>=6 && RowNum<9)){
  		for(let i=6;i<9;i++){
  			for(let j=6;j<9;j++){
  				if(this.input[i][j]===num){
  					return false
  				}
  			}
  		}
  		return true
  	} 
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
let test = '105802000090076405200400819019007306762083090000061050007600030430020501600308900'
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
//game.solve()
game.initBoard()
game.solve()
game.board()
console.log(game.papan)
