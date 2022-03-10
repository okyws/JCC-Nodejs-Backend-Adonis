let listNumber = []
let newString = "";

var input = [
    ["0001", "Roman Alamsyah", "Bandar Lampung", "21/05/1989", "Membaca"],
    ["0002", "Dika Sembiring", "Medan", "10/10/1992", "Bermain Gitar"],
    ["0003", "Winona", "Ambon", "25/12/1965", "Memasak"],
    ["0004", "Bintang Senjaya", "Martapura", "6/4/1970", "Berkebun"]
]

function soal1(start, end) {
    if (start < end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    else if (start > end) {
        return Array(start - end  + 1).fill().map((_, idx) => start - idx)
    } else if (start == end) {
        return "Nilai awal dan akhir tidak boleh sama"
    }
    else {
        return [];
    }
}

function soal2(startNum, finishNum, step) {
    if (startNum < finishNum) {
        for (let i = startNum; i <= finishNum; i += step) {
            listNumber.push(i);
        }
        return listNumber;
    }
    else if (startNum > finishNum) {
        for (let i = startNum; i >= finishNum; i -= step) {
            listNumber.push(i);
        }
        return listNumber;
    }
    else {
        listNumber.push(startNum)
        return listNumber;
    }
}

function soal3(start = 0, end = 0, step = 0) {
    soal2(start, end, step);
    let result;
    if (start != 0) {
        result = listNumber.reduce((acc, curr) => acc + curr);
    }
    else {
        result = 0;
    }
    return result;
}

function soal4(listData) {
    listData.forEach(data => {
        console.log(`\nNomor ID:  ${data[0]}`)
        console.log(`Nama Lengkap:  ${data[1]}`)
        console.log(`TTL:  ${data[2]} ${data[3]}`)
        console.log(`Hobi:  ${data[4]}`)
    })
}

function soal5(word) {
    for (let i = word.length - 1; i >= 0; i--) {
        newString += word[i];
    }
    return newString;
}

module.exports = {
    input,
    soal1 : soal1,
    soal2 : soal2,
    soal3 : soal3,
    soal4 : soal4,
    soal5 : soal5,
}