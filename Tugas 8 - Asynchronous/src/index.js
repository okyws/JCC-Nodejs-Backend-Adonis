// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import Sekolah from './lib/Sekolah'
// import Karyawan from './lib/Karyawan'

// import fspromises from 'fs/promises'

// const path='data.json'
// let [command,arg]=process.argv.slice(2)

// switch (command){
// 	case "register":
// 		let [name,password,role]=arg.split(',')
// 		let newkaryawan= new Karyawan(name,password,role)
// 		let karyawans

// 		fspromises.readFile(path)
// 		.then(data => {
// 		   karyawans=JSON.parse(data)
// 		   let newSchool= new Sekolah(karyawans)
// 		   newSchool.register(newkaryawan)
// 		})
// 		.catch(function(error) {
// 		   console.log(error);
// 		})
// 		break;
// 	case "login":
// 		let [nama,katasandi]=arg.split(',')

// 		fspromises.readFile(path)
// 		.then(data => {
// 		   karyawans=JSON.parse(data)
// 		   let newSchool= new Sekolah(karyawans)
// 		   newSchool.login(nama,katasandi)
// 		})
// 		.catch(function(error) {
// 		   console.log(error);
// 		})
// 		break;
// 	case "addSiswa":
// 		let [nama_siswa,trainer_name]=arg.split(',')

// 		fspromises.readFile(path)
// 		.then(data => {
// 		   karyawans=JSON.parse(data)
// 		   let newSchool= new Sekolah(karyawans)
// 		   newSchool.addSiswa(nama_siswa,trainer_name)
// 		})
// 		.catch(function(error) {
// 		   console.log(error);
// 		})
// 		break;
// 	default:
// 		console.log("perintah yang anda masukan salah")
// 		break;
// }


// Jawaban dari trainer
// import bootcamp 
import Bootcamp from './lib/bootcamp'

const args = process.argv.slice(2)
const command = args[0]
let input = args[1]

switch (command) {
  case "register":
    Bootcamp.register(input)
    break;
  case "login":
    Bootcamp.login(input)
    break;
  case "addSiswa":
    Bootcamp.addSiswa(input)
    break;

  default:
    break;
}