Sistem Petshop - Dokumentasi Perancangan Sistem Petshop

Dokumentasi perancangan Sistem Informasi Petshop 
Deskripsi Proyek

Sistem Petshop adalah aplikasi web untuk pengelolaan toko hewan peliharaan. Customer dapat mendaftar, login, melihat produk, mengelola keranjang, melakukan checkout dan pembayaran, serta memesan layanan grooming. Admin mengelola data produk, memverifikasi pembayaran, mengatur status pesanan dan jadwal grooming, serta melihat laporan penjualan.

Tujuan

Mempermudah customer dalam berbelanja dan memesan layanan grooming
Mempermudah admin dalam mengelola produk, pesanan, dan jadwal
Membuat pencatatan stok dan transaksi lebih rapi dan minim kesalahan dibanding pencatatan manual
Aktor
Customer: mendaftar, login, melihat dan membeli produk, membayar, memesan grooming, dan melihat riwayat pesanan
Admin: login, mengelola produk, memverifikasi pembayaran, mengelola pesanan dan jadwal grooming, serta melihat laporan
Fitur Utama

Customer

Registrasi dan login customer
Melihat beranda dan produk
Kelola keranjang (tambah, ubah jumlah, hapus)
Checkout dan pembayaran dengan unggah bukti
Booking grooming
Melihat riwayat pesanan

Admin

Login admin dan dashboard
Kelola data produk
Melihat daftar dan detail pesanan
Verifikasi pembayaran
Mengelola status pesanan
Kelola jadwal grooming
Melihat laporan penjualan

Alur Status

Pesanan: Menunggu Pembayaran → Menunggu Verifikasi → Diproses (jika pembayaran ditolak, kembali ke Menunggu Pembayaran)
Booking grooming: Menunggu Konfirmasi → Dikonfirmasi atau Dibatalkan

