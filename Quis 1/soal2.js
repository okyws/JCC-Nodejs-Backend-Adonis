function hitungVokal(str) {
  let hurufVokal = ["a", "i", "u", "e", "o"];
  let jumlah = 0;

  for (let i = 0; i < str.length; i++) {
      if (hurufVokal.includes(str[i].toLowerCase())) {
          jumlah++;
      }
  }
  return(jumlah)
}

console.log(hitungVokal("Adonis"))
console.log(hitungVokal("Error"))
console.log(hitungVokal("Eureka"))
console.log(hitungVokal("Rsch"))