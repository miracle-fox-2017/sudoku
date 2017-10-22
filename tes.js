function sudoku(angka) {
  let deret = [1,2,3,4,5,6,7,8,9];
    for(let i = 0 ; i < deret.length ; i++){
      if(angka === deret[i]) {
        return false;
      } else {
        return true;
      }
    }
}

console.log(sudoku(5))
console.log(sudoku(10))
