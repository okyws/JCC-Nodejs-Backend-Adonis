"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Employee = /*#__PURE__*/function () {
  function Employee(name, password, role) {
    _classCallCheck(this, Employee);

    this._name = name;
    this._password = password;
    this._role = role;
    this._isLogin = false;
  }

  _createClass(Employee, [{
    key: "isLogin",
    get: function get() {
      return this._isLogin;
    },
    set: function set(status) {
      this._isLogin = status;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(newName) {
      this._name = newName;
    }
  }, {
    key: "password",
    get: function get() {
      return this._password;
    },
    set: function set(pwd) {
      this._password = pwd;
    }
  }, {
    key: "role",
    get: function get() {
      return this._role;
    },
    set: function set(rl) {
      this._role = rl;
    }
  }]);

  return Employee;
}();

var _default = Employee;
exports["default"] = _default;