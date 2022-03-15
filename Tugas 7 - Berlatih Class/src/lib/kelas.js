class Kelas {
  constructor(name, difficult, instructor) {
    this._name = name
    this._students = []
    this._level = difficult
    this._instructor = instructor
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get level() {
    return this._level
  }
  
  set level(name) {
    this._level = name
  }

  get instructor() {
    return this._instructor
  }

  set instructor(name) {
    this._instructor = name
  }

  get student() {
    return this._students
  }

  addStudent(newStudent) {
    this._students.push(newStudent)
  }

  generateRandomScore() {
    return Math.floor(Math.random() *(100 - 50)) + 50
  }

  generateNilai() {
    this._students.map(student => {
      student.addScore(this.generateRandomScore())
    })
  }

  getFinalScore(scores) {
    let sum = scores.reduce((a, b) => a + b, 0)
    return Math.ceil(sum / scores.length)
  }

  graduate() {
    let output = {
      participant: [],
      completed: [],
      mastered: []
    }

    this._students.map(student => {
      let finalScore = this.getFinalScore(student.scores)
      student.finalScore = finalScore
      if (finalScore > 85) {
        output.mastered.push(student)
      } else if (finalScore <= 85 && finalScore >= 60) {
        output.completed.push(student)
      } else {
        output.participant.push(student)
      }
    })

    return output
  }
}

module.exports = Kelas