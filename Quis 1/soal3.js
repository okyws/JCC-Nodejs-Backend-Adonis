function tandaiA(strings) {
  strings = [...strings.toLowerCase()];

  strings.forEach((string, index) => {
      if (string == "a") {
          strings[index] = "x";
      }
  })
  return(strings.reduce((accumulator, current) => accumulator + current));
}

console.log(tandaiA("abrakadabra"))
console.log(tandaiA("garuda"))
console.log(tandaiA("kucing"))