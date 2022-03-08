// Jawaban soal switch case
var hari = 29; 
var bulan = 10; 
var tahun = 1998;

try {
    if (!(hari >= 1 && hari <= 31)) {
        throw "Tanggal tidak valid";
    } else if (!(tahun >= 1900 && tahun <= 2200)) {
        throw "Tahun tidak valid";
    } else {
        switch(bulan) {
            case 1: { bulan = "Januari"; break; }
            case 2: { bulan = "Februari"; break; }
            case 3: { bulan = "Maret"; break; }
            case 4: { bulan = "April"; break; }
            case 5: { bulan = "Mei"; break; }
            case 6: { bulan = "Juni"; break; }
            case 7: { bulan = "Juli"; break; }
            case 8: { bulan = "Agustus"; break; }
            case 9: { bulan = "September"; break; }
            case 10: { bulan = "Oktober"; break; }
            case 11: { bulan = "November"; break; }
            case 12: { bulan = "Desember"; break; }
            default: { throw "Bulan tidak valid"; }
        }
        console.log(`Anda lahir pada ${hari + " " + bulan + " " + tahun}`);
    }
}
catch(e) {
    console.log(e);
}
