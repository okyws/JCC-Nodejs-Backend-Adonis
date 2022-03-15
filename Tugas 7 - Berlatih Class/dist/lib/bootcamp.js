"use strict";

var _kelas = _interopRequireDefault(require("./kelas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Bootcamp = /*#__PURE__*/function () {
  function Bootcamp(name) {
    _classCallCheck(this, Bootcamp);

    this._name = name;
    this._classes = [];
  }

  _createClass(Bootcamp, [{
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
    }
  }, {
    key: "classes",
    get: function get() {
      return this._classes;
    }
  }, {
    key: "createClass",
    value: function createClass(className, difficult, instructor) {
      var newClass = new _kelas["default"](className, difficult, instructor);

      this._classes.push(newClass);
    }
  }, {
    key: "register",
    value: function register(className, student) {
      var thisClass = this._classes.find(function (kelas) {
        return kelas.name == className;
      });

      thisClass.addStudent(student);
    }
  }, {
    key: "studentGraduate",
    value: function studentGraduate() {
      // for (let j = 0; j < this._classes.length; j++) {
      var currentClass = this._classes[1];

      for (var i = 0; i < 4; i++) {
        currentClass.generateNilai();
      }

      console.log(currentClass.graduate()); // }
    }
  }, {
    key: "runBatch",
    value: function runBatch() {
      for (var j = 0; j < this._classes.length; j++) {
        var currentClass = this._classes[j];

        for (var i = 0; i < 4; i++) {
          currentClass.generateNilai();
        }

        console.log("graduate from ".concat(currentClass.name, ":"), currentClass.graduate());
      }
    }
  }]);

  return Bootcamp;
}();

module.exports = Bootcamp;