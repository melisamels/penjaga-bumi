# 🌍 PENJAGA BUMI AI — Earth Guardian
> **“Selamatkan Bumi, Satu Misi Sekaligus!”**

Game edukasi web petualangan interaktif yang dirancang khusus untuk anak kelas 3 SD (usia 8–9 tahun) dalam Bahasa Indonesia. Berfokus pada pembelajaran IPAS, kepedulian lingkungan, pemilahan sampah, dan pengambilan keputusan ramah alam dengan prinsip **“Show, Don't Tell”**.

---

## 📱 Cara Main Langsung dari HP (Wi-Fi Lokal)

Jika HP / Smartphone dan komputer Anda terhubung ke jaringan Wi-Fi yang sama:
1. Pastikan server aktif di komputer (`npm start` atau `npm run dev`).
2. Buka browser (Chrome / Safari) di HP Anda.
3. Kunjungi URL:
   ```
   http://192.168.1.14:3000
   ```
4. Game sudah dioptimasi dengan tombol sentuh besar (*touch-friendly*) untuk smartphone dan tablet!

---

## 🚀 Cara Publish ke GitHub Pages (Akses Online Global)

Repository ini sudah dilengkapi dengan **GitHub Actions Workflow** otomatis di `.github/workflows/deploy.yml`.

### Langkah-langkah:
1. Buat repository baru di GitHub: [github.com/new](https://github.com/new)
   - Beri nama repository, misalnya: `penjaga-bumi`
   - Pilih **Public**
   - Jangan centang "Add a README file" (karena sudah ada di lokal).

2. Buka terminal di folder proyek (`penjaga-bumi`) dan hubungkan ke repository Anda:
   ```bash
   git remote add origin https://github.com/<username-github-anda>/penjaga-bumi.git
   git branch -M main
   git push -u origin main
   ```

3. Aktifkan **GitHub Pages** di repository Anda:
   - Buka tab **Settings** di repository GitHub Anda.
   - Klik menu **Pages** di bilah sisi kiri.
   - Pada bagian **Build and deployment > Source**, pilih: **`GitHub Actions`**.

4. Tunggu sekitar 1-2 menit hingga proses build GitHub Actions selesai.
   Game Anda akan langsung online dan bisa diakses oleh siapa saja di:
   ```
   https://<username-github-anda>.github.io/penjaga-bumi/
   ```

---

## 🎮 Fitur Permainan

- **🐢 Wilayah 1: Pantai Penyu:** Bersihkan sampah plastik & kaleng, biarkan kerang & ranting alami, bantu penyu bertelur.
- **🌊 Wilayah 2: Laut Biru:** Kemudikan kapal selam vacuum pembersih laut, jaring sampah mengapung dan lindungi satwa karang.
- **🌳 Wilayah 3: Hutan Hijau:** Reboisasi pohon gundul dan mainkan teka-teki habitat *"Siapa tinggal di mana?"*.
- **💧 Wilayah 4: Desa Sungai:** Investigasi sumber pencemaran air sungai dan tentukan solusi ramah lingkungan.
- **🏙️ Wilayah 5: Kota Bersih:** *Sort the Trash* conveyor belt untuk memilah sampah Organik, Anorganik, dan Kertas.
- **🤖 BUMI AI Companion:** Pendamping ramah anak yang suportif dengan fitur *"Tanya BUMI"*.
- **🎒 Markas Suaka (Base):** Percantik markas dengan pohon, kolam ikan, dan panel surya menggunakan Eco Points.
- **🏆 Prestasi (6 Lencana):** Sahabat Penyu, Penjaga Laut, Pelindung Hutan, Penjaga Sungai, Raja Daur Ulang, dan Earth Guardian.
- **📖 Ensiklopedia IPAS:** Kartu pengetahuan ringkas dengan fakta sains menarik.
- **👩‍🏫 Mode Guru & Orang Tua:** Dilindungi kunci matematika (7 × 6) untuk melihat metrik pemahaman IPAS anak.
- **🎵 Efek Suara Web Audio:** Audio synthesizer lembut tanpa ketergantungan file luar + tombol Mute ON/OFF.

---

## 🛠️ Stack Teknologi

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS & Glassmorphism Kids Game Theme
- **Sound Engine:** Procedural Web Audio API Synthesizer
- **Icons & Visuals:** SVG Vector Assets & Lucide React
- **Deployment:** GitHub Pages (Static Export via GitHub Actions) / Vercel
