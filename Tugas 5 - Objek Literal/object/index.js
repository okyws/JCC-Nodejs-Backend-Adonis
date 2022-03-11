const { people, people2, sample, arrayToObject, shoppingTime, naikAngkot, nilaiTertinggi, } = require("./lib/funcLib");

var args = process.argv;
// console.log(args)

switch (args[2]) {
  case "arrayToObject":
    arrayToObject(sample)
    arrayToObject(people)
    arrayToObject(people2)
    arrayToObject([])
    break;
  case "shoppingTime":
    console.log(shoppingTime('1820RzKrnWn08', 2475000));
    console.log(shoppingTime('82Ku8Ma742', 170000));
    console.log(shoppingTime('', 2475000));
    console.log(shoppingTime('234JdhweRxa53', 15000));
    console.log(shoppingTime());
    break;
  case "naikAngkot":
    console.log(naikAngkot([['Dimitri', 'B', 'F'], ['Icha', 'A', 'B']]));
    console.log(naikAngkot([]));
    break;
  case "nilaiTertinggi":
    console.log(nilaiTertinggi([
      {
        name: 'Asep',
        score: 90,
        class: 'adonis'
      },
      {
        name: 'Ahmad',
        score: 85,
        class: 'vuejs'
      },
      {
        name: 'Regi',
        score: 74,
        class: 'adonis'
      },
      {
        name: 'Afrida',
        score: 78,
        class: 'reactjs'
      },
    ]));
    console.log(nilaiTertinggi([
      {
        name: 'Bondra',
        score: 100,
        class: 'adonis'
      },
      {
        name: 'Putri',
        score: 76,
        class: 'laravel'
      },
      {
        name: 'Iqbal',
        score: 92,
        class: 'adonis'
      },
      {
        name: 'Tyar',
        score: 71,
        class: 'laravel'
      },
      {
        name: 'Hilmy',
        score: 80,
        class: 'vuejs'
      }
    ]));
    console.log(nilaiTertinggi([]));
    break;
  default:
    console.log("Perintah yang anda masukan salah");
    break;
}