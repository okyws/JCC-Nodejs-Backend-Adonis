"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _promises = _interopRequireDefault(require("fs/promises"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _employee = _interopRequireDefault(require("./employee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// data.json
var path = 'data.json'; // import class Karyawan

// Membuat class Bootcamp mewakili interface Bootcamp yang banyak metode static di dalamnya
var Bootcamp = /*#__PURE__*/function () {
  function Bootcamp() {
    _classCallCheck(this, Bootcamp);
  }

  _createClass(Bootcamp, null, [{
    key: "register",
    value: function register(input) {
      var _input$split = input.split(','),
          _input$split2 = _slicedToArray(_input$split, 3),
          name = _input$split2[0],
          password = _input$split2[1],
          role = _input$split2[2];

      _fs["default"].readFile(path, function (err, data) {
        if (err) console.log(err);
        var existingData = JSON.parse(data);
        var employee = new _employee["default"](name, password, role);
        existingData.push(employee);

        _fs["default"].writeFile(path, JSON.stringify(existingData), function (err) {
          if (err) console.log(err);else console.log("Berhasil register");
        });
      });
    } // release 1

  }, {
    key: "login",
    value: function login(input) {
      // mendapatkan nama dan password dari input
      var _input$split3 = input.split(','),
          _input$split4 = _slicedToArray(_input$split3, 2),
          name = _input$split4[0],
          password = _input$split4[1];

      _promises["default"].readFile(path).then(function (data) {
        var employees = JSON.parse(data); // mencari index data employee pada employees dengan nama sesuai parameter menggunakan methode array yaitu findIndex => jika ketemu return index array, jika tidak ditemukan maka return -1

        var indexEmp = employees.findIndex(function (emp) {
          return emp._name == name;
        });

        if (indexEmp == -1) {
          console.log("data tidak ditemukan");
        } else {
          // data employee yang ditemukan
          var employee = employees[indexEmp];

          if (employee._password == password) {
            // jika password cocok, ubah status _isLogin menjadi true, lalu simpan kembali ke data.json
            employee._isLogin = true; // ubah array employees yang existing untuk elemen pada index ke indexEmp dengan menggunakan method splice

            employees.splice(indexEmp, 1, employee);
            return _promises["default"].writeFile(path, JSON.stringify(employees));
          } else {
            console.log("password salah");
          }
        }
      }).then(function (saved) {
        console.log("Berhasil Login");
      })["catch"](function (err) {
        return console.log(err);
      });
    } // release 2 async await

  }, {
    key: "addSiswa",
    value: function () {
      var _addSiswa = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
        var _input$split5, _input$split6, studentName, trainerName, employeesRaw, employees, admin, indexTrainer, trainer, write;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _input$split5 = input.split(','), _input$split6 = _slicedToArray(_input$split5, 2), studentName = _input$split6[0], trainerName = _input$split6[1]; // baca data employees dari data.json

                _context.next = 3;
                return _promises["default"].readFile(path);

              case 3:
                employeesRaw = _context.sent;
                //ubah data raw/buffer dengan json parse
                employees = JSON.parse(employeesRaw); // cek apakah admin sedang login atau tidak

                admin = employees.find(function (emp) {
                  return emp._role == "admin";
                }); // jika tidak sedang login (login == false) kembalikan error

                if (admin._isLogin) {
                  _context.next = 9;
                  break;
                }

                console.log("not allowed to add siswa");
                return _context.abrupt("return");

              case 9:
                // cari terlebih dahulu trainer dari array employees menggunakan findIndex
                indexTrainer = employees.findIndex(function (emp) {
                  return emp._name == trainerName;
                }); // jika trainer tidak ditemukan

                if (!(indexTrainer == -1)) {
                  _context.next = 14;
                  break;
                }

                console.log("trainer tidak ditemukan");
                _context.next = 21;
                break;

              case 14:
                // ambil data trainer
                trainer = employees[indexTrainer]; // dicek terlebih dahulu apakah sudah punya students atau belum

                if (trainer._students) {
                  trainer._students.push({
                    name: studentName
                  });
                } else {
                  trainer._students = [{
                    name: studentName
                  }];
                } // update data employees menggunakan metode splice


                employees.splice(indexTrainer, 1, trainer); //simpan kembali ke data.json

                _context.next = 19;
                return _promises["default"].writeFile(path, JSON.stringify(employees));

              case 19:
                write = _context.sent;
                console.log("berhasil add siswa");

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addSiswa(_x) {
        return _addSiswa.apply(this, arguments);
      }

      return addSiswa;
    }()
  }]);

  return Bootcamp;
}();

var _default = Bootcamp;
exports["default"] = _default;