// soal 1
var people = [["Bruce", "Banner", "male", 1975], ["Natasha", "Romanoff", "female"]]
var people2 = [["Tony", "Stark", "male", 1980], ["Pepper", "Pots", "female", 2023]]
var sample = [["Abduh", "Muhamad", "male", 1992], ["Ahmad", "Taufik", "male", 1985]]

function arrayToObject(arr) {
  var str = '""'
  var obj = {}
  var now = new Date()
  var thisYear = now.getFullYear()
  
  for (let i = 0; i < arr.length; i++) {
    obj = {
      firstName: arr[i][0],
      lastName: arr[i][1],
      gender: arr[i][2],
    }
    if(arr[i][3] != null && arr[i][3] < thisYear){
      obj.age = thisYear - arr[i][3]
    }else{
      obj.age = "Invalid Birth Year"
    }
    fullName = obj.firstName + " " + obj.lastName
    console.log(`${i+1}. ${fullName} : ${JSON.stringify(obj)}`)
    // console.log(`${i+1}. ${fullName} :`,obj)
  }

  if(arr.length <= 0){
    console.log(str)
  }
}

// Jawaban Soal 1 dari live session
// function soal1(arr) {
//   var thisYear = (new Date()).getFullYear()
//   for (var i = 0; i < arr.length; i++) {
//     var currentArr = arr[i]
//     var objPerson = {}
//     objPerson.firstName = currentArr[0]
//     objPerson.lastName = currentArr[1]
//     objPerson.gender = currentArr[2]
//     if (currentArr[3] == undefined || currentArr[3] > thisYear) {
//       objPerson.age = "Invalid Birth Day"
//     } else {
//       var age = thisYear - currentArr[3]
//       objPerson.age = age
//     }
//     fullName = objPerson.firstName + " " + objPerson.lastName
//     console.log(`${i+1}. ${fullName} :`, objPerson)
//   }
// }

// soal 2
function shoppingTime(memberId, money) {
  if(!memberId){
      return 'Mohon maaf, toko X hanya berlaku untuk member saja';
  } else if(money < 50000){
      return 'Mohon maaf, uang tidak cukup'
  } else {
      var listBarang = [['Sepatu Stacattu', 1500000], ['Baju Zoro', 500000], ['Baju H&N', 250000], ['Sweater Uniklooh', 175000], ['Casing Handphone', 50000]];
      var member ={};
      member.memberId = memberId;
      member.money = money;
      member.listPurchased = [];
      for (let i = 0; i < listBarang.length; i++) {
          if(money >= listBarang[i][1]){ //Beli barang kalau uang cukup
              member.listPurchased.push(listBarang[i][0]);
              money -= listBarang[i][1];
          }
      }
      member.changeMoney = money;
      return member;
  }
}

// soal 3
function naikAngkot(arrPenumpang) {
  rute = ['A', 'B', 'C', 'D', 'E', 'F'];
  var data = [];
  for (let i = 0; i < arrPenumpang.length; i++) {
      var penumpang = arrPenumpang[i][0];
      data.push({penumpang});
      data[i].naikDari = arrPenumpang[i][1];
      data[i].tujuan = arrPenumpang[i][2];
      var indexAsal;
      for (let j = 0; j < rute.length; j++) {
          if(data[i].naikDari === rute[j]){
              indexAsal = j;
          }
      }
      var indexTujuan;
      for (let j = 0; j < rute.length; j++) {
          if(data[i].tujuan === rute[j]){
              indexTujuan = j;
          }
      }
      if(indexAsal > indexTujuan) {
          var temp = indexAsal;
          indexAsal = indexTujuan;
          indexTujuan = temp;
      }
      data[i].bayar = (indexTujuan-indexAsal)*2000;
  }
  return data;
}

// soal 4
function nilaiTertinggi(siswa) {
  // Jawaban Dari Live Session
  var output = {}

  for(var i = 0; i < siswa.length; i++) {
    var currentSiswa = siswa[i]

    var currentClass = currentSiswa.class

    if (!output.hasOwnProperty(currentClass)) {
      output[currentClass] = {
        name: currentSiswa.name,
        score: currentSiswa.score,
      }
    } else {
      var existingSiswa = output[currentClass]
      if(currentSiswa.score > existingSiswa.score) {
        output[currentClass] = {
          name: currentSiswa.name,
          score: currentSiswa.score,
        }
      }
    }
  }
  return output

  // Logic sendiri
  // var kelas = [];
  // for (let i = 0; i < murid.length; i++) {
  //   var sama = false;
  //   for (let j = 0; j < kelas.length; j++) {
  //     if(murid[i].class === kelas[j]){
  //         sama = true;
  //     }
  //   }
  //   if(!sama){
  //     kelas.push(murid[i].class);
  //   }
  // }
  
  // var terbaik = {};
  // for (let i = 0; i < kelas.length; i++) {
  //   var max = {name: '', score: 0}
  //   for (let j = 0; j < murid.length; j++) {
  //     if(kelas[i] === murid[j].class && max.score < murid[j].score){
  //       max.score = murid[j].score;
  //       max.name = murid[j].name;
  //     }
  //   }
  //   terbaik[kelas[i]] = max;
  // }
  // return terbaik;
}

module.exports = {
  people, people2, sample,
  arrayToObject : arrayToObject,
  shoppingTime : shoppingTime,
  naikAngkot, naikAngkot,
  nilaiTertinggi : nilaiTertinggi,
}