"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("./lib/funcLib"),
    sapa = _require.sapa,
    convert = _require.convert,
    checkScore = _require.checkScore,
    filterData = _require.filterData,
    data = _require.data;

var args = process.argv;

switch (args[2]) {
  case "sapa":
    var input = args.slice(3);

    var _input = _slicedToArray(input, 1),
        name = _input[0];

    console.log(sapa(name));
    break;

  case "convert":
    // let nama = args[3]
    // let domisili = args[4]
    // let umur = parseInt(args[5])
    // console.log(convert(nama, domisili, umur));
    // cara destruction
    var param = args.slice(3); // console.log("param", param)

    var _param = _slicedToArray(param, 3),
        nama = _param[0],
        domisili = _param[1],
        umur = _param[2];

    console.log(convert(nama, domisili, umur));
    break;

  case "checkScore":
    var parameter = args.slice(3); // console.log("param", parameter)

    var _parameter = _slicedToArray(parameter, 1),
        arr = _parameter[0];

    console.log(checkScore(arr));
    break;

  case "filterData":
    var className = args[3].toLowerCase();
    console.log(filterData(data, className));
    break;

  default:
    console.log("perintah salah");
    break;
}