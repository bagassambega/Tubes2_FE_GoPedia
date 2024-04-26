# Tugas Besar Strategi Algoritma 2
### Pemanfaatan Algoritma IDS dan BFS dalam Permainan WikiRace

### Kelompok GoPedia:
| No. | Nama                     |   NIM    |
|:---:|:-------------------------|:--------:|
| 1.  | Rafiki Prawhira Harianto | 13522065 |
| 2.  | Bagas Sambega Rosyada    | 13522071 |
| 3.  | Abdullah Mubarak         | 13522101 |

## Daftar Isi
1. [Deskripsi Program](#deskripsi-program)
2. [Implementasi Algoritma](#implementasi-algoritma)
3. [Cara Penggunaan Program](#cara-penggunaan-program)

## Deskripsi Program
Program ini adalah program untuk menyelesaikan permainan Wikirace menggunakan algoritma IDS dan BFS. Permainan Wikirace adalah permainan untuk mencari
jalur terpendek dari satu artikel Wikipedia ke artikel lainnya. Program ini akan mencari jalur terpendek dari artikel awal ke artikel tujuan dengan melakukan
_scraping_ pada artikel-artikel yang dikunjungi, dan mengunjungi artikel-artikel tersebut untuk mencari artikel tujuan. Program akan menghasilkan jalur terpendek dari artikel awal ke artikel tujuan pada laman Wikipedia. Laman artikel Wikipedia yang digunakan terbatas pada bahasa Inggris dan tidak menggunakan laman khusus seperti: "/File:", "/Special:", "/Template:", "/Template_page:", "/Help:", "/Category:", "Special:", "/Wikipedia:", "/Portal:", "/Talk:".

_Repository_ ini adalah bagian _frontend_ dari program yang berisi kode _website_ dan mendapatkan hasil pengolahan data dari <a href="https://github.com/bagassambega/Tubes2_BE_GoPedia">_backend_</a> yang dibuat menggunakan _framework_ ReactJS. Kedua _repository_ perlu dijalankan bersamaan untuk
menjalankan program Wikirace. Link kedua repository:
1. <a href="https://github.com/bagassambega/Tubes2_BE_GoPedia">Backend</a>
2. <a href="https://github.com/bagassambega/Tubes2_FE_GoPedia">Frontend</a>

## Implementasi Algoritma
Program ini menggunakan dua algoritma untuk menyelesaikan permainan Wikirace, yaitu:
1. Algoritma IDS (_Iterative Deepening Search_): Algoritma ini adalah algoritma _search_ yang melakukan _depth-first search_ dengan level _depth_ yang bertambah secara iteratif. Implementasi algoritma ini terdapat pada file src/IDS.go, yang berisi fungsi utama IDS yang akan melakukan pemanggilan fungsi DLS/_Depth Limited Search_ sampai dengan level tertentu. Pencarian akan dilakukan pada simpul tetangga terlebih dahulu. Jika pada level tersebut tidak ditemukan solusi, maka level kedalaman akan ditingkatkan dan fungsi DLS akan
   dipanggil kembali dengan level kedalaman yang baru.
2. Algoritma BFS (_Breadth-First Search_): Algoritma ini adalah algoritma _search_ yang melakukan pencarian pada satu level terlebih dahulu secara keseluruhan sebelum mencari di level kedalaman berikutnya.
   Implementasi algoritma ini terdapat pada file src/BFS.go, yang berisi fungsi utama BFS yang akan melakukan pencarian dengan melakukan _scraping_ dan menyimpan seluruh tautan pada suatu level ke dalam _queue_, dan mengunjungi setiap artikel pada _queue_
   tersebut untuk mencari artikel tujuan. Jika tidak ditemukan artikel tujuan pada level tersebut, fungsi akan melakukan _scraping_ pada level kedalaman selanjutnya dan mengunjunginya secara keseluruhan.

## Cara Penggunaan Program
Program memerlukan <a href="https://github.com/bagassambega/Tubes2_BE_GoPedia">_backend_</a> untuk menjalankan program Wikirace. Langkah instalasi terdapat pada _repository_ _backend_ tersebut.
### Requirement
1. Node JS terinstal di perangkat
2. Docker dan Docker Desktop

### Instalasi
1. Clone _repository_ ini
```bash
git clone https://github.com/bagassambega/Tubes2_FE_GoPedia.git
```
2. Masuk ke direktori _repository_ yang telah di-_clone_
```bash
cd Tubes2_FE_GoPedia
```
3. Jalankan Docker ataupun Docker Desktop
4. Build _docker image_ dari _Dockerfile_ yang telah disediakan
```bash
docker build -t gopedia-frontend .
```
5. Jalankan program dengan _docker container_ dari _docker image_ yang telah dibuat
```bash
docker run -p 5173:5173 gopedia-frontend
```
6. Jalankan _website_ dengan membuka alamat http://localhost:5173/ pada _browser_
7. Untuk menghentikan program, jalankan _command_ berikut, ID dapat dilihat dengan _command_ `docker ps` atau pada Docker Desktop
```bash
docker stop [container_id]
```
8. Untuk menjalankan program Wikirace, jalankan juga _backend_ Wikirace dengan langkah-langkah pada _repository_ _backend_ Wikirace melalui link berikut: <a href="https://github.com/bagassambega/Tubes2_BE_GoPedia">Backend</a>


Setelah program _frontend_ dan _backend_ berjalan, program dapat diakses pada _browser_ dengan membuka alamat http://localhost:5173/
dan pengguna dapat memasukkan artikel awal dan artikel tujuan untuk mencari jalur terpendek dari artikel awal ke artikel tujuan.


**_NOTE:_**
Jika _build docker_ gagal atau menjalankan dengan _docker_ tidak berhasil, program dapat dijalankan dengan menjalankan _command_ berikut:
```bash
npm run dev
```
