"use strict";

var Bootcamp = require('./lib/bootcamp');

var Student = require('./lib/student');

console.log("********************************* Release 0 *********************************");
var jcc = new Bootcamp("jabarcodingcamp");
jcc.createClass("Laravel", "beginner", "abduh");
jcc.createClass("React", "beginner", "abdul");
console.log(jcc.classes);
console.log("********************************* Release 1 *********************************");
var names = ["regi", "ahmad", "bondra", "iqbal", "putri", "rezky"];
names.map(function (nama, index) {
  var newStud = new Student(nama);
  var kelas = jcc.classes[index % 2].name;
  jcc.register(kelas, newStud);
}); // menampilkan data kelas dan student nya

jcc.classes.forEach(function (kelas) {
  console.log(kelas);
});
console.log("********************************* Release 2 *********************************");
jcc.studentGraduate();
console.log("********************************* Release 3 *********************************");
jcc.runBatch();