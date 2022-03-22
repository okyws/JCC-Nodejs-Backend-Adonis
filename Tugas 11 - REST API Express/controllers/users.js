const fs = require('fs')

const path = 'data.json'

class UsersController {
  static findAll (req, res) {
    fs.readFile (path, (err, data) => {
      if (err) {
        res.status(400).json({ errors: "Gagal baca data" })
      } else {
        let realData = JSON.parse(data)
        res.status(200).json({ message: "Berhasil ambil data users", data: realData })
      }
    });
  }


  static async register(req, res) {
    fs.readFile(path, (err, data) => {
      if (err) {
        res.status(400).json({errors: "error membaca data"})
      } else {
        let existingData = JSON.parse(data)
        let { users } = existingData
        let { name, role, password } = req.body
        let newUser = { name, role, password, isLogin:false, students:[] }
        users.push(newUser)
        let newData = { ...existingData, users }
        fs.writeFile(path, JSON.stringify(newData), (err) => {
          if (err) {
            res.status(400).json({ errors: "Gagal menyimpan data" })
          } else {
            res.status(200).json({ message: "Berhasil registrasi", data: newUser})
          }
        })
      }
    })
  }

  static async login(req, res) {
    fs.readFile(path, (err, data) => {
      if (err) {
        res.status(400).json({errors: "error membaca data"})
      } else {
        let existingData = JSON.parse(data)
        let { users } = existingData
        let { name, password } = req.body
        let indexEmp = users.findIndex(emp => emp.name == name)
        if (indexEmp == -1) {
          res.status(400).json({errors: "data tidak ditemukan"})
        } else {
          let employee = users[indexEmp]
          if (employee.password == password) {
            employee.isLogin = true
            users.splice(indexEmp, 1, employee)
          } else {
            res.status(400).json({ errors: "password salah" })
          }
          let newData = { ...existingData, users }
          fs.writeFile(path, JSON.stringify(newData), (err) => {
            if (err) {
              res.status(400).json({ errors: "Gagal Login" })
            } else {
              res.status(200).json({ message: "Berhasil Login", data: employee})
            }
          })
        }
      }
    })
  }

  static async addStudent(req, res) {
    fs.readFile(path, (err, data) => {
      if (err) {
        res.status(400).json({error: "error membaca data"})
      } else {
        let existingData = JSON.parse(data)
        let { users } = existingData
        let { student, trainer } = req.body
        let admin = users.find(emp => emp.role == "admin")
        if (!admin.isLogin) {
          res.status(400).json({errors:"not allowed to add siswa"})
        }
        let indexTrainer = users.findIndex(emp => emp.name == trainer)
        if (indexTrainer == -1) {
          res.status(400).json({error: "trainer tidak ditemukan"})
        } else {
          let trainer = users[indexTrainer]
          if (trainer) {
            trainer.push([{ name: student }])
          } else {
            trainer = [{ name: student }]
          }
          users.splice(indexTrainer, 1, trainer)
          let newData = { ...existingData, trainer }
          fs.writeFile(path, JSON.stringify(newData), (err) => {
            if (err) {
              res.status(400).json({ errors: "Gagal tambah murid" })
            } else {
              res.status(200).json({ message: "Berhasil tambah murid", data: newData})
            }
          })
        }
      }
    })
  }


  
}

module.exports = UsersController