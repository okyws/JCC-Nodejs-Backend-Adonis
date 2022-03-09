function soal1(){
  let count = 2;
  console.log("LOOPING PERTAMA")
  while (count <= 20) {
      console.log(`${count} - I love coding`);
      count += 2;
  }
  
  count -= 2;
  console.log("LOOPING KEDUA")
  while (count >= 2) {
      console.log(`${count} - I will become a mobile developer`)
      count -= 2;
  }
}

function soal2(){
  for (let i = 1; i <= 20; i++) {
    if (i % 3 == 0 && i % 2 == 1) {
        console.log(`${i} - I Love Coding`);
    }
    else if (i % 2 == 0) {
        console.log(`${i} - Berkualitas`);
    }
    else {
        console.log(`${i} - Santai`);
    }
  }
}

function soal3(panjang, lebar) {
  let awal = 1;
  let enter = "";

  console.log("Persegi panjang dengan for")
  for (let i = 0; i < lebar; i++) {
    for (let j = 0; j < panjang; j++) {
      enter += '#'
    }
    enter += '\n'
  }
  console.log(enter)

  enter = "";
  console.log("Program Persegi while")
  while (awal <= lebar ) {
    for (let j = 0; j < panjang; j++) {
        enter += "*";
    }
    enter += '\n';
    awal++
  }
  return enter;
}

function soal4(dimensi) {
  console.log("program segitiga 1")
  for (let i = 0; i < dimensi; i++) {
    for (let j = 0; j <= i; j++) {
        process.stdout.write("# ");
    }
    console.log("")
  }
  
  console.log("program segitiga 2 (cara alternatif)")
  let hasil = '';
  for (let i = 0; i < dimensi; i++) {
      for (let j = 0; j <= i; j++) {
          hasil += '* ';
      }
      hasil += '\n';
  }
  return hasil;
}

function soal5(dimensi) {
  console.log("program catur")
  for (let i = 1; i <= dimensi; i++) {
      for (let j = 1; j <= dimensi; j++) {
          if ((i + j) % 2 == 0) {
              process.stdout.write(" ");
          }
          else {
              process.stdout.write("*");
          }
      }
      console.log();
  }
}

module.exports = {
  soal1 : soal1,
  soal2 : soal2,
  soal3 : soal3,
  soal4 : soal4,
  soal5 : soal5,
}