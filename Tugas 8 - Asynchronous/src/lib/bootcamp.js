import fs from 'fs'
import fsPromises from 'fs/promises'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// data.json
const path = 'data.json'

// import class Karyawan
import Employee from './employee'

// Membuat class Bootcamp mewakili interface Bootcamp yang banyak metode static di dalamnya
class Bootcamp {
  static register(input) {
    let [name, password, role] = input.split(',')
    fs.readFile(path, (err, data) => {
      if (err) console.log(err)
      let existingData = JSON.parse(data)
      let employee = new Employee(name, password, role)
      existingData.push(employee)
      fs.writeFile(path, JSON.stringify(existingData), (err) => {
        if (err) console.log(err)
        else console.log("Berhasil register")
      })
    })
  }

  // release 1
  static login(input) {
    // mendapatkan nama dan password dari input
    let [name, password] = input.split(',')

    fsPromises.readFile(path)
      .then(data => {
        let employees = JSON.parse(data)
        // mencari index data employee pada employees dengan nama sesuai parameter menggunakan methode array yaitu findIndex => jika ketemu return index array, jika tidak ditemukan maka return -1
        let indexEmp = employees.findIndex(emp => emp._name == name)
        if (indexEmp == -1) {
          console.log("data tidak ditemukan")
        } else {
          // data employee yang ditemukan
          let employee = employees[indexEmp]
          if (employee._password == password) {
            // jika password cocok, ubah status _isLogin menjadi true, lalu simpan kembali ke data.json
            employee._isLogin = true
            // ubah array employees yang existing untuk elemen pada index ke indexEmp dengan menggunakan method splice
            employees.splice(indexEmp, 1, employee)
            return fsPromises.writeFile(path, JSON.stringify(employees))
          } else {
            console.log("password salah")
          }
        }
      })
      .then(saved => {
        console.log("Berhasil Login")
      })
      .catch(err => console.log(err))

  }

  // release 2 async await
  static async addSiswa(input) {
    let [studentName, trainerName] = input.split(',')
    // baca data employees dari data.json
    let employeesRaw = await fsPromises.readFile(path)
    //ubah data raw/buffer dengan json parse
    let employees = JSON.parse(employeesRaw)

    // cek apakah admin sedang login atau tidak
    let admin = employees.find(emp => emp._role == "admin")
    // jika tidak sedang login (login == false) kembalikan error
    if (!admin._isLogin) {
      console.log("not allowed to add siswa")
      return
    }
    // cari terlebih dahulu trainer dari array employees menggunakan findIndex
    let indexTrainer = employees.findIndex(emp => emp._name == trainerName)

    // jika trainer tidak ditemukan
    if (indexTrainer == -1) {
      console.log("trainer tidak ditemukan")
    } else {
      // ambil data trainer
      let trainer = employees[indexTrainer]
      // dicek terlebih dahulu apakah sudah punya students atau belum
      if (trainer._students) {
        trainer._students.push({ name: studentName })
      } else {
        trainer._students = [{ name: studentName }]
      }

      // update data employees menggunakan metode splice
      employees.splice(indexTrainer, 1, trainer)

      //simpan kembali ke data.json
      let write = await fsPromises.writeFile(path, JSON.stringify(employees))
      console.log("berhasil add siswa")
    }
  }


}

export default Bootcamp