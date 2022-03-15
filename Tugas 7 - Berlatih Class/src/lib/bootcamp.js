import Kelas from "./kelas"

class Bootcamp {
  constructor(name) {
    this._name = name
    this._classes = []
  }
  
  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get classes() {
    return this._classes
  }

  createClass(className, difficult, instructor) {
    let newClass = new Kelas(className, difficult, instructor)
    this._classes.push(newClass)
  }

  register(className, student) {
    let thisClass = this._classes.find(kelas => kelas.name == className)
    thisClass.addStudent(student)
  }

  studentGraduate() {
    // for (let j = 0; j < this._classes.length; j++) {
      let currentClass = this._classes[1]
      for (let i = 0; i < 4; i++) {
        currentClass.generateNilai()
      }
      console.log(currentClass.graduate())
    // }
  }

  runBatch() {
    for (let j = 0; j < this._classes.length; j++) {
      let currentClass = this._classes[j]
      for (let i = 0; i < 4; i++) {
        currentClass.generateNilai()
      }
      console.log(`graduate from ${currentClass.name}:`, currentClass.graduate())
    }
  }
}


module.exports = Bootcamp