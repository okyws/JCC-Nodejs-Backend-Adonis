const { soal1, soal2, soal3, soal4, soal5 } = require('./lib/funcLib');

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


