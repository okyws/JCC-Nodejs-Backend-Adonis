class Student {
  constructor(name) {
    this._name = name
    this._scores = []
    this._finalScore = 0
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  addScore(score) {
    this._scores.push(score)
  }

  getFinalScore() {
    return this._finalScore
  }

  /**
   * @param {number} score
   */
  set finalScore(score) {
    this._finalScore = score
  }

  get scores() {
    // console.log(this._scores)
    return this._scores
  }
}

module.exports = Student