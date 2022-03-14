"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sapa = exports.filterData = exports.data = exports.convert = exports.checkScore = void 0;

/* Soal 1 */
var sapa = function sapa(name) {
  return "halo selamat pagi, ".concat(name);
};
/* Soal 2 */


exports.sapa = sapa;

var convert = function convert(nama, domisili, umur) {
  var umur = parseInt(umur); // Enhanced Object

  return {
    nama: nama,
    domisili: domisili,
    umur: umur
  };
};
/* Soal 3 */


exports.convert = convert;

var checkScore = function checkScore(arr) {
  var sliced = arr.split(',');
  var sliced2 = sliced[0].split(':');
  var sliced3 = sliced[1].split(':');
  var sliced4 = sliced[2].split(':');
  return {
    name: sliced2[1],
    "class": sliced3[1],
    score: parseInt(sliced4[1])
  };
};
/* Soal 4 */


exports.checkScore = checkScore;
var data = [{
  name: "Ahmad",
  "class": "adonis"
}, {
  name: "Regi",
  "class": "laravel"
}, {
  name: "Bondra",
  "class": "adonis"
}, {
  name: "Iqbal",
  "class": "vuejs"
}, {
  name: "Putri",
  "class": "Laravel"
}];
exports.data = data;

var filterData = function filterData(dataMhs) {
  for (var _len = arguments.length, className = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    className[_key - 1] = arguments[_key];
  }

  var hasilFilter = dataMhs.filter(function (data) {
    return data["class"].toLowerCase() == className;
  });
  return hasilFilter;
};

exports.filterData = filterData;