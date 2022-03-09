const { kenalan } = require('./lib/funcLib');
var funcLib = require('./lib/funcLib')

var teriak = funcLib.teriak;
var kalikan = funcLib.kalikan;
var introduce = funcLib.introduce;

var args = process.argv;

switch (args[2]) {
  case "teriak":
    console.log(teriak());
    break;
  case "kalikan":
    var num1 = args[3];
    var num2 = args[4];
    var hasil = kalikan(num1, num2);
    console.log(hasil);
    break;
  case "kenalan":
    var name = args[3];
    var age = args[4];
    var address = args[5];
    var hobby = args[6];
    var perkenalan = kenalan(name, age, address, hobby)
    console.log(perkenalan);
    break;
  default:
    console.log("Perintah yang anda masukan salah");
    break;
}