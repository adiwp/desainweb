// Definisi Class Tugas
class Tugas {
    constructor(judul, deskripsi) {
        this.judul = judul;
        this.deskripsi = deskripsi;
        this.selesai = false;
    }

    tampilkanInfo() {
        return `${this.judul}: ${this.deskripsi}`;
    }
}

// Array untuk menyimpan daftar tugas
let daftarTugas = [];

// Mengambil elemen DOM
const formTambahTugas = document.getElementById('form-tambah-tugas');
const divDaftarTugas = document.getElementById('daftar-tugas');
const btnSimpanNama = document.getElementById('btnSimpanNama');
const salamPengguna = document.getElementById('salamPengguna');

// Event Listener untuk Form Tambah Tugas
formTambahTugas.addEventListener('submit', function (e) {
    e.preventDefault();
    tambahTugas();
});

// Fungsi untuk menambahkan tugas
function tambahTugas() {
    const judul = document.getElementById('judulTugas').value;
    const deskripsi = document.getElementById('deskripsiTugas').value;

    // Validasi input
    if (judul === '' || deskripsi === '') {
        alert('Semua kolom harus diisi!');
        return;
    }

    const tugasBaru = new Tugas(judul, deskripsi);
    daftarTugas.push(tugasBaru);
    simpanDaftarTugas();
    tampilkanDaftarTugas();
    formTambahTugas.reset();
}

// Fungsi untuk menampilkan daftar tugas
function tampilkanDaftarTugas() {
    divDaftarTugas.innerHTML = '';

    daftarTugas.forEach((tugas, index) => {
        const divTugas = document.createElement('div');
        divTugas.classList.add('tugas');

        const status = tugas.selesai ? ' (Selesai)' : '';

        divTugas.innerHTML = `
            <p>${tugas.tampilkanInfo()}${status}</p>
            <button onclick="tandaiSelesai(${index})">Tandai Selesai</button>
            <button onclick="hapusTugas(${index})">Hapus</button>
        `;
        divDaftarTugas.appendChild(divTugas);
    });
}

// Fungsi untuk menandai tugas sebagai selesai
function tandaiSelesai(index) {
    daftarTugas[index].selesai = true;
    simpanDaftarTugas();
    tampilkanDaftarTugas();
}

// Fungsi untuk menghapus tugas
function hapusTugas(index) {
    daftarTugas.splice(index, 1);
    simpanDaftarTugas();
    tampilkanDaftarTugas();
}

// Fungsi untuk menyimpan daftar tugas ke Local Storage
function simpanDaftarTugas() {
    localStorage.setItem('daftarTugas', JSON.stringify(daftarTugas));
}

// Event Listener untuk tombol simpan nama pengguna
btnSimpanNama.addEventListener('click', function () {
    const nama = document.getElementById('namaPengguna').value;
    if (nama === '') {
        alert('Masukkan nama Anda!');
        return;
    }
    sessionStorage.setItem('namaPengguna', nama);
    tampilkanNamaPengguna();
    document.getElementById('namaPengguna').value = '';
});

// Fungsi untuk menampilkan nama pengguna
function tampilkanNamaPengguna() {
    const nama = sessionStorage.getItem('namaPengguna');

    if (nama) {
        salamPengguna.textContent = `Selamat datang, ${nama}!`;
    } else {
        salamPengguna.textContent = '';
    }
}

// Memuat data saat halaman dimuat
window.onload = function () {
    // Memuat daftar tugas dari Local Storage
    if (localStorage.getItem('daftarTugas')) {
        const storedTasks = JSON.parse(localStorage.getItem('daftarTugas'));
        // Rekonstruksi objek tugas menjadi instance dari kelas Tugas
        daftarTugas = storedTasks.map(task => {
            const tugasBaru = new Tugas(task.judul, task.deskripsi);
            tugasBaru.selesai = task.selesai;
            return tugasBaru;
        });
        tampilkanDaftarTugas();
    }

    // Menampilkan nama pengguna dari Session Storage
    tampilkanNamaPengguna();
};
