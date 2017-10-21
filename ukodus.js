class Sudoku {
  constructor(str) {
    this.str = str;
  }

  // Fungsi untuk buat block
  generateBlock() {
    // Inisialisasi 2D array
    const block = [];

    // perulangan untuk masukan 9 array ke block diatas
    for (let i = 0; i < 9; i++) {
      // masukan nested block
      block.push([]);
      // panggil fungsi untuk masukan value
      this.generateValue(block, i);
    }

    return block;
  }

  generateValue(block, index) {
    let counter = 0;

    // Perulangan input sudoku
    for (let i = 0; i < this.str.length; i++) {
      // Cek jika block i di fungsi generateBlock() kurang dari 10
      if (block[index].length < 10) {
        // Counter untuk masukan 3 value ke dalam block[i]
        if (counter < 3) {
          // push 3 length pertama
          block[index].push(this.str[i]);
          counter++;
        } else {  // kalau counter lebih dari 3
          // Tambahin i jadi skip 6 index dari inputan sudoku value
          i += 6;
          // Push index setelah diskip
          block[index].push(this.str[i]);
          // push 3 length lagi
          counter = 0;
        }
      }
    }
  }

  block() {
    const block = this.generateBlock();
    return block;
  }
}

const game = new Sudoku('105 802 000 090 076 405 200 400 819 019 007 306 762 083 090 000 061 050 007 600 030 430 020 501 600 308 900');

/* Draw the pattern 
 *
 * [ [ 1, 0, 5,  0, 9, 0,  2, 0, 0 ]
 *   [ 8, 0, 2,  0, 7, 6,  4, 0, 0 ]
 *   [ 0, 0, 0,  4, 0 ,5,  8, 1, 9 ]
 * 
 *   [ 0, 1, 9,  7, 6, 2,  0, 0, 0 ]
 *   [ 0, 0, 7,  0, 8, 3,  0, 6, 1 ]
 *   [ 3, 0, 6,  0, 9, 0,  0, 5, 0 ]
 * 
 *   [ 0, 0, 7,  4, 3, 0,  6, 0, 0 ]
 *   [ 6, 0, 0,  0, 2, 0,  3, 0, 8 ]
 *   [ 0, 3, 0,  5, 0, 1,  9, 0, 0 ] ]
 * 
 * 
 * [ [ 1, 0, 5,  [ 8, 0, 2,  [ 0, 0, 0
 *     0, 9, 0,    0, 7, 6,    4, 0, 5
 *     2, 0, 0 ]   4, 0, 0 ]   8, 1, 9 ]
 * 
 *   [ 0, 1, 9,  [ 0, 0, 7,  [ 3, 0, 6
 *     7, 6, 2,    0, 8, 3,    0, 9, 0
 *     0, 0, 0 ]   0, 6, 1 ]   0, 5, 0 ]
 * 
 *   [ 0, 0, 7   [ 6, 0, 0,  [ 0, 3, 0,
 *     4, 3, 0     0, 2, 0,    5, 0, 1,
 *     6, 0, 0 ]   3, 0, 8 ]   9, 0, 0 ] ]
 */

// game.solve();
console.log(game.printBoard());
