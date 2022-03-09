var funcLib = require('./lib/funcLib');

var soal1 = funcLib.soal1;
var soal2 = funcLib.soal2;
var soal3 = funcLib.soal3;
var soal4 = funcLib.soal4;
var soal5 = funcLib.soal5;

var args = process.argv;

switch(args[2]) {
  case "while":
    soal1();
    break;
  case "for":
    soal2();
    break;
  case "persegiPanjang":
    var panjang = args[3];
    var lebar = args[4];
    var hasil = soal3(panjang, lebar);
    console.log(hasil);
    break;
  case "tangga":
    var dimensi = args[3];
    console.log(soal4(dimensi));
    break;
  case "catur":
    var dimensi = args[3];
    soal5(dimensi);
    break;
  default:
    console.log("Perintah yang anda masukan salah");
    break;
}


