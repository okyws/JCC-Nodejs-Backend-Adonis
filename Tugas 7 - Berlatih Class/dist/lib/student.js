"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Student = /*#__PURE__*/function () {
  function Student(name) {
    _classCallCheck(this, Student);

    this._name = name;
    this._scores = [];
    this._finalScore = 0;
  }

  _createClass(Student, [{
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
    }
  }, {
    key: "addScore",
    value: function addScore(score) {
      this._scores.push(score);
    }
  }, {
    key: "getFinalScore",
    value: function getFinalScore() {
      return this._finalScore;
    }
    /**
     * @param {number} score
     */

  }, {
    key: "finalScore",
    set: function set(score) {
      this._finalScore = score;
    }
  }, {
    key: "scores",
    get: function get() {
      // console.log(this._scores)
      return this._scores;
    }
  }]);

  return Student;
}();

module.exports = Student;