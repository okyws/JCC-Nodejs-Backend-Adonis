"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _promises = _interopRequireDefault(require("fs/promises"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _Karyawan = _interopRequireDefault(require("./Karyawan"));

var _Siswa = _interopRequireDefault(require("./Siswa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Sekolah = /*#__PURE__*/function () {
  function Sekolah(employees) {
    _classCallCheck(this, Sekolah);

    this.employees = employees;
    this.path = './data.json';
    this.siswa = [];
  }

  _createClass(Sekolah, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newKaryawan) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.employees.push(newKaryawan);
                _context.next = 4;
                return _promises["default"].writeFile(this.path, JSON.stringify(this.employees));

              case 4:
                console.log("Berhasil Register");
                console.log(newKaryawan);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.log("Gagal Register");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function register(_x) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, password) {
        var findEmployee, employeeLogin, findIndex;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                findEmployee = this.employees.find(function (employee) {
                  return employee.name === name;
                });

                if (!(findEmployee.password == password)) {
                  _context2.next = 12;
                  break;
                }

                employeeLogin = new _Karyawan["default"](findEmployee.name, findEmployee.password, findEmployee.role, findEmployee.isLogin);
                employeeLogin.isLogin = true;
                findIndex = this.employees.findIndex(function (emp) {
                  return emp.name === employeeLogin.name;
                });
                this.employees.splice(findIndex, 1, employeeLogin);
                _context2.next = 9;
                return _promises["default"].writeFile(this.path, JSON.stringify(this.employees));

              case 9:
                console.log("Berhasil Login sebagai ".concat(findEmployee.role, "\n"), employeeLogin);
                _context2.next = 13;
                break;

              case 12:
                throw new Error("Gagal Login");

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                console.log("Gagal Login");

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 15]]);
      }));

      function login(_x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "addSiswa",
    value: function () {
      var _addSiswa = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name, trainer_name) {
        var findEmployee, employeeLogin, siswaBaru, findIndex;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                findEmployee = this.employees.find(function (employee) {
                  return employee.name === trainer_name;
                });

                if (!(findEmployee.isLogin == true || findEmployee.role.toLowerCase() == "trainer")) {
                  _context3.next = 14;
                  break;
                }

                employeeLogin = new _Karyawan["default"](findEmployee.name, findEmployee.password, findEmployee.role, findEmployee.isLogin);
                siswaBaru = new _Siswa["default"](name);
                this.siswa.push(siswaBaru);
                employeeLogin.siswa = this.siswa;
                findIndex = this.employees.findIndex(function (emp) {
                  return emp.name === employeeLogin.name;
                });
                this.employees.splice(findIndex, 1, employeeLogin);
                _context3.next = 11;
                return _promises["default"].writeFile(this.path, JSON.stringify(this.employees));

              case 11:
                console.log("Berhasil add Siswa");
                _context3.next = 15;
                break;

              case 14:
                throw new Error("Gagal add Siswa");

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](0);
                console.log("Gagal add Siswa");

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 17]]);
      }));

      function addSiswa(_x4, _x5) {
        return _addSiswa.apply(this, arguments);
      }

      return addSiswa;
    }()
  }]);

  return Sekolah;
}();

exports["default"] = Sekolah;