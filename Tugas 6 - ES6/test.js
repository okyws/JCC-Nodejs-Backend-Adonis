// var studentName = {
//   firstName: 'Peter',
//   lastName: 'Parker'
// };

// const {firstName, lastName} = studentName

// console.log(firstName)

const data = [
  { name: "Ahmad", class: "adonis"},
  { name: "Regi", class: "laravel"},
  { name: "Bondra", class: "adonis"},
  { name: "Iqbal", class: "vuejs" },
  { name: "Putri", class: "Laravel" }
]

const filter = (...rest) => {
  // let result = data.filter(test => test.class.toLowerCase() === param.toLowerCase());
  return rest.filter(el => el.text !== undefined)
}

console.log(filter(data, {text: "laravel"}, "next"))
