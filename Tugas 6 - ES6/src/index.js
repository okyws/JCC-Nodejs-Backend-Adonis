const { sapa, 
  convert, 
  checkScore, 
  filterData, 
  data, 
} = require("./lib/funcLib");

let args = process.argv;

switch (args[2]) {
  case "sapa":
    const input = args.slice(3)
    let [name] = input
    console.log(sapa(name))
    break;
  case "convert":
    // let nama = args[3]
    // let domisili = args[4]
    // let umur = parseInt(args[5])
    // console.log(convert(nama, domisili, umur));

    // cara destruction
    const param = args.slice(3)
    // console.log("param", param)
    let [nama, domisili, umur] = param
    console.log(convert(nama, domisili, umur))
    break;
  case "checkScore":
    const parameter = args.slice(3)
    // console.log("param", parameter)
    let [arr] = parameter
    console.log(checkScore(arr))
    break;
  case "filterData":
    let className = args[3].toLowerCase()
    console.log(filterData(data, className))
    break;
  default:
    console.log("perintah salah")
    break;
  }