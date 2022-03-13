// soal 4
function nilaiTertinggi(siswa) {
  var output = {}

  for(var i = 0; i < siswa.length; i++) {
    var currentSiswa = siswa[i]
    var currentClass = currentSiswa.class
    var score = currentSiswa.score

    if (score > 85) {
      output[currentClass] = {
        name: currentSiswa.name,
        score: currentSiswa.score,
        grade: "mastered",
      }
    } else if (score >= 60 && score <= 85) {
      output[currentClass] = {
        name: currentSiswa.name,
        score: currentSiswa.score,
        grade: "completed",
      }
    } else {
      output[currentClass] = {
        name: currentSiswa.name,
        score: currentSiswa.score,
        grade: "participant",
      }
    }
  }
  return output
}

var arr = [ {name:"Ahmad",score:80, class: "Laravel"},
            {name:"Regi",score:86, class: "Vuejs"},
            {name:"Robert",score:59, class: "Laravel"},
            {name:"Bondra",score:81, class: "Reactjs" }, ]

console.log(nilaiTertinggi(arr));
