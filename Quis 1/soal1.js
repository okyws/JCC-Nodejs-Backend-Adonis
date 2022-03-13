function kelompokAngka(arr) {
  let output = [[],[],[]];
  
  arr.forEach(number => {
      if (number % 3 == 0) {
          output[2].push(number)
      }
      else if (number % 2 != 0) {
          output[0].push(number)
      }
      else {
          output[1].push(number)
      }
  })
  return(output)
}

console.log(kelompokAngka([1,2,3,4,5,6,7]))
console.log(kelompokAngka([13,27,11,15]))
console.log(kelompokAngka([]))