/* Soal 1 */
export const sapa = (name) => `halo selamat pagi, ${name}`

/* Soal 2 */
export const convert = (nama, domisili, umur) => {
  var umur = parseInt(umur)
  
  // Enhanced Object
  return {
    nama,
    domisili,
    umur
  }
}

/* Soal 3 */
export const checkScore= (arr) => {
  const sliced = arr.split(',')
  const sliced2 = sliced[0].split(':')
  const sliced3 = sliced[1].split(':')
  const sliced4 = sliced[2].split(':')
  return {
    name :sliced2[1],
    class:sliced3[1],
    score:parseInt(sliced4[1])
 }
}

/* Soal 4 */
export const data = [
  { name: "Ahmad", class: "adonis"},
  { name: "Regi", class: "laravel"},
  { name: "Bondra", class: "adonis"},
  { name: "Iqbal", class: "vuejs" },
  { name: "Putri", class: "Laravel" },
]

export const filterData = (dataMhs, ...className) => {
  let hasilFilter = dataMhs.filter(data => data.class.toLowerCase() == className)
  
  return hasilFilter
}
