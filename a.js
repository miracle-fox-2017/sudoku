var arrHasil = []

var k = 1
for(var i = 0; i < 10; i++) {
  var arrTampung = []
  for(var j = 0; j < 10; j++) {
    arrTampung.push(k)
    k++
  }
  if(i % 2 == 1) {
    arrHasil.push(arrTampung.reverse())
  } else {
    arrHasil.push(arrTampung)
  }
}

console.log(arrHasil);
