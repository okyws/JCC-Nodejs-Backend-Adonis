const { input, soal1, soal2, soal3, soal4, soal5, } = require("./lib/funcLib");

var args = process.argv;
// console.log(args)

switch (args[2]) {
  case "range":
    var start = parseInt(args[3]);
    var end = parseInt(args[4]);
    var hasil = soal1(start, end);
    console.log(hasil);
    break;
  case "rangeWithStep":
    var startNum = parseInt(args[3]);
    var finishNum = parseInt(args[4]);
    var step = parseInt(args[5]);
    var hasil = soal2(startNum, finishNum, step);
    console.log(hasil);
    break;
  case "sum":
    var start = parseInt(args[3]);
    var end = parseInt(args[4]);
    var step = parseInt(args[5] || 1);
    var hasil = soal3(start, end, step);
    console.log(hasil);
    break;
  case "dataHandling":
    soal4(input);
    break;
  case "balikKata":
    var word = String(args[3]);
    console.log(soal5(word));
    break;
  default:
    console.log("Perintah yang anda masukan salah");
    break;
}