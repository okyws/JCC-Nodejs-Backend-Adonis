const Bootcamp = require('./lib/bootcamp')
const Student = require('./lib/student')

console.log("********************************* Release 0 *********************************")

const jcc = new Bootcamp("jabarcodingcamp")
jcc.createClass("Laravel", "beginner", "abduh")
jcc.createClass("React", "beginner", "abdul")
console.log(jcc.classes)


console.log("********************************* Release 1 *********************************")

let names = ["regi", "ahmad", "bondra", "iqbal", "putri", "rezky"]
names.map((nama, index) => {
  let newStud = new Student(nama)
  let kelas = jcc.classes[index % 2].name
  jcc.register(kelas, newStud)
})
// menampilkan data kelas dan student nya
jcc.classes.forEach(kelas => {
  console.log(kelas)
});

console.log("********************************* Release 2 *********************************")
jcc.studentGraduate()

console.log("********************************* Release 3 *********************************")
jcc.runBatch()