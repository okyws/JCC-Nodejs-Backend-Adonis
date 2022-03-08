// Jawaban soal if else
var nama = "Oky";
var peran = "Guard";

if ( nama == "" ) {
    console.log("Nama harus di isi");
    if ( peran == "" ){
        console.log("Peran harus di isi");
    }
} else if ( nama == "" || peran !== "" ) {
    if ( nama !== "" && peran == "Penyihir" ) {
        console.log(`Selamat datang di Dunia Werewolf, ${nama}`);
        console.log(`Halo Penyihir ${nama}, kamu dapat melihat siapa yang menjadi werewolf!`);
    } else if ( nama !== "" && peran == "Guard" ) {
        console.log(`Selamat datang di Dunia Werewolf, ${nama}`);
        console.log(`Halo Guard ${nama}, kamu akan membantu melindungi temanmu dari serangan werewolf.`);
    } else if ( nama !== "" && peran == "Werewolf" ) {
        console.log(`Selamat datang di Dunia Werewolf, ${nama}`);
        console.log(`Halo Werewolf ${nama}, Kamu akan memakan mangsa setiap malam!`);
    } else if ( peran !== "Penyihir" || peran !== "Guard" || peran !== "Werewolf") {
        console.log(`Halo ${nama}, Peran yang dipilih tidak tersedia`);
    }  
}
else {
    console.log(`Halo ${nama}, Pilih peranmu untuk memulai game!`);
}