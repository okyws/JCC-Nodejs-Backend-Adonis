function teriak() {
    var teriak = "Halo JCC!"
    return teriak;
}

function kalikan(num1, num2) {
    return num1 * num2;
}

function kenalan(name, age, address, hobby) {
    return `Nama saya ${name}, umur saya ${age} tahun, alamat saya di ${address}, dan saya punya hobby yaitu ${hobby}!`
}

module.exports = {
    teriak : teriak,
    kalikan : kalikan,
    kenalan : kenalan,
}