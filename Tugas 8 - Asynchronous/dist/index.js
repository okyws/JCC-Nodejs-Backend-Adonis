"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _Sekolah = _interopRequireDefault(require("./lib/Sekolah"));

var _Karyawan = _interopRequireDefault(require("./lib/Karyawan"));

var _promises = _interopRequireDefault(require("fs/promises"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var path = 'data.json';

var _process$argv$slice = process.argv.slice(2),
    _process$argv$slice2 = _slicedToArray(_process$argv$slice, 2),
    command = _process$argv$slice2[0],
    arg = _process$argv$slice2[1];

switch (command) {
  case "register":
    var _arg$split = arg.split(','),
        _arg$split2 = _slicedToArray(_arg$split, 3),
        name = _arg$split2[0],
        password = _arg$split2[1],
        role = _arg$split2[2];

    var newkaryawan = new _Karyawan["default"](name, password, role);
    var karyawans;

    _promises["default"].readFile(path).then(function (data) {
      karyawans = JSON.parse(data);
      var newSchool = new _Sekolah["default"](karyawans);
      newSchool.register(newkaryawan);
    })["catch"](function (error) {
      console.log(error);
    });

    break;

  case "login":
    var _arg$split3 = arg.split(','),
        _arg$split4 = _slicedToArray(_arg$split3, 2),
        nama = _arg$split4[0],
        katasandi = _arg$split4[1];

    _promises["default"].readFile(path).then(function (data) {
      karyawans = JSON.parse(data);
      var newSchool = new _Sekolah["default"](karyawans);
      newSchool.login(nama, katasandi);
    })["catch"](function (error) {
      console.log(error);
    });

    break;

  case "addSiswa":
    var _arg$split5 = arg.split(','),
        _arg$split6 = _slicedToArray(_arg$split5, 2),
        nama_siswa = _arg$split6[0],
        trainer_name = _arg$split6[1];

    _promises["default"].readFile(path).then(function (data) {
      karyawans = JSON.parse(data);
      var newSchool = new _Sekolah["default"](karyawans);
      newSchool.addSiswa(nama_siswa, trainer_name);
    })["catch"](function (error) {
      console.log(error);
    });

    break;

  default:
    console.log("perintah yang anda masukan salah");
    break;
}