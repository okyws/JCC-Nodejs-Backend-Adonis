"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Karyawan = /*#__PURE__*/function () {
  function Karyawan(name, password, role) {
    _classCallCheck(this, Karyawan);

    this.name = name;
    this.password = password;
    this.role = role;
    this.isLogin = false;
  }

  _createClass(Karyawan, [{
    key: "changeLogin",
    value: function changeLogin() {
      this.isLogin = !this.isLogin;
    }
  }]);

  return Karyawan;
}();

exports["default"] = Karyawan;