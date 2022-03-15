"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Kelas = /*#__PURE__*/function () {
  function Kelas(name, difficult, instructor) {
    _classCallCheck(this, Kelas);

    this._name = name;
    this._students = [];
    this._level = difficult;
    this._instructor = instructor;
  }

  _createClass(Kelas, [{
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
    }
  }, {
    key: "level",
    get: function get() {
      return this._level;
    },
    set: function set(name) {
      this._level = name;
    }
  }, {
    key: "instructor",
    get: function get() {
      return this._instructor;
    },
    set: function set(name) {
      this._instructor = name;
    }
  }, {
    key: "student",
    get: function get() {
      return this._students;
    }
  }, {
    key: "addStudent",
    value: function addStudent(newStudent) {
      this._students.push(newStudent);
    }
  }, {
    key: "generateRandomScore",
    value: function generateRandomScore() {
      return Math.floor(Math.random() * (100 - 50)) + 50;
    }
  }, {
    key: "generateNilai",
    value: function generateNilai() {
      var _this = this;

      this._students.map(function (student) {
        student.addScore(_this.generateRandomScore());
      });
    }
  }, {
    key: "getFinalScore",
    value: function getFinalScore(scores) {
      var sum = scores.reduce(function (a, b) {
        return a + b;
      }, 0);
      return Math.ceil(sum / scores.length);
    }
  }, {
    key: "graduate",
    value: function graduate() {
      var _this2 = this;

      var output = {
        participant: [],
        completed: [],
        mastered: []
      };

      this._students.map(function (student) {
        var finalScore = _this2.getFinalScore(student.scores);

        student.finalScore = finalScore;

        if (finalScore > 85) {
          output.mastered.push(student);
        } else if (finalScore <= 85 && finalScore >= 60) {
          output.completed.push(student);
        } else {
          output.participant.push(student);
        }
      });

      return output;
    }
  }]);

  return Kelas;
}();

module.exports = Kelas;