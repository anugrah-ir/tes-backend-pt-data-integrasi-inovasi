# Role-Based Access Management System for Enterprise Employees

---

## ✨ Deskripsi Singkat

Sistem manajemen login dan akses berbasis peran untuk karyawan perusahaan. Pengembangan proyek ini diharapkan dapat membantu kebutuhan perusahaan dalam mengatur hak akses setiap karyawan berdasarkan peran atau jabatan.

---

## 🚀 Fitur Utama

* Autentikasi menggunakan **JWT**
* Manajemen akses dengan **multi-role support**
* Fitur **panel admin** untuk mengatur role, menu, dan akses

---

## 🧰 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT** (JSON Web Token)

---

## ⚙️ Instalasi dan Menjalankan Proyek

1. **Clone repository**

   ```bash
   git clone https://github.com/anugrah-ir/tes-backend-pt-data-integrasi-inovasi.git
   ```

2. **Install dependensi**

   ```bash
   npm install
   ```

3. **Konfigurasi environment** (`.env`)

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_db
   JWT_SECRET=your_jwt_secret
   ```

4. **Jalankan server**

   ```bash
   npm start
   ```

---

## 📃 Dokumentasi API

Lihat dokumentasi lengkap di Postman:
[https://documenter.getpostman.com/view/19677420/2sB3B8qYAT](https://documenter.getpostman.com/view/19677420/2sB3B8qYAT)

---

## 📢 Catatan

Proyek ini hanya mencakup modul login dan manajemen akses. Modul tambahan seperti manajemen karyawan, laporan, dll. dapat dikembangkan secara terpisah.

---

**Lisensi:** Open for modification and learning purposes.
