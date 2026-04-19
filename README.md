**Cara menjalankan project:**
1. Untuk menjalankan React, buka terminal jalankan "npm install" dulu, lalu "npm run dev"
2. Untuk menjalankan json-server, buka terminal baru jalankan "npx json-server --watch db.json --port 3000"

**Estimasi waktu pengerjaan:**
2 jam 19 menit

**Record pengerjaan dan Jawaban tertulis**
Link : https://drive.google.com/drive/folders/1x31DAF-9ln88SX-H4ub_yE6Uy0rFSmP0?usp=sharing

**Informasi video :**
Menjawab pertanyaan bagian 
**UX & USER FLOW (20%)** 
mulai di menit 00:00:30

Menjawab pertanyaan dan menjelaskan project bagian 
**IMPLEMENTASI CORE FEATURE (30%)**
**ENGINEERING QUALITY (25%)**
**STATE MANAGEMENT (15%)**
**PERFORMANCE & EDGE CASE (10%)**
**BONUS (Opsional – Senior Level)** 
mulai di menit 02:07:30

**Struktur project**
```
├── public/                 # Aset statis publik
│   ├── favicon.svg
│   └── icons.svg
├── src/                    # Source code utama aplikasi
│   ├── assets/             # Aset gambar dan media lokal
│   │   ├── logo payment/
│   │   ├── logo provider/
│   │   ├── hero.jpg
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/         # Komponen UI global (Re-usable)
│   │   └── layout/
│   │       ├── MainLayout.tsx
│   │       └── Navbar.tsx
│   ├── context/            # Global state management (React Context)
│   │   └── AuthContext.tsx
│   ├── pages/              # Halaman utama aplikasi (Routing)
│   │   ├── auth/
│   │   │   └── Login.tsx
│   │   ├── checkout/
│   │   │   └── Checkout.tsx
│   │   ├── dashboard/
│   │   │   ├── components/ # Komponen khusus halaman Dashboard
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── ErrorState.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── LoadingState.tsx
│   │   │   │   ├── PackageCard.tsx
│   │   │   │   ├── PackageFilter.tsx
│   │   │   │   ├── PackageList.tsx
│   │   │   │   ├── PackageModal.tsx
│   │   │   │   └── Pagination.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── success/
│   │   │   └── Success.tsx
│   │   └── transactions/
│   │       └── TransactionHistory.tsx
│   ├── routes/             # Konfigurasi routing aplikasi
│   │   ├── AppRoutes.tsx
│   │   └── ProtectedRoute.tsx
│   ├── services/           # Logika pemanggilan API / Backend
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── packageService.ts
│   │   └── transactionService.ts
│   ├── types/              # Definisi tipe data TypeScript (Interfaces)
│   │   ├── package.ts
│   │   ├── transaction.ts
│   │   └── user.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
└── db.json                 # Mock database (JSON Server)
```



## Design Decision

### 1. Dashboard sebagai pusat utama
Semua aktivitas seperti browsing, filter, dan pembelian dilakukan dalam satu halaman.
Alasan:
* Mengurangi perpindahan halaman
* Mempercepat proses pengambilan keputusan
* Meningkatkan interaksi user

### 2. Checkout sederhana
Checkout hanya berisi nomor HP dan metode pembayaran.
Alasan:
* Mengurangi langkah yang tidak perlu
* Fokus pada penyelesaian transaksi
* Meningkatkan conversion rate

### 3. Context API untuk state global
Digunakan untuk menyimpan data user login.
Alasan:
* Menghindari prop drilling
* Lebih sederhana dibanding state management kompleks
* Cukup untuk skala aplikasi ini

### 5. Komponen reusable
Komponen seperti card, filter, pagination, dan state UI dibuat reusable.
Alasan:
* Menghindari duplikasi
* Mempermudah pengembangan
* Menjaga konsistensi tampilan

### 6. Optimasi dengan useMemo
Digunakan pada proses filter dan pagination.
Alasan:
* Menghindari perhitungan ulang
* Menjaga performa tetap stabil


## Trade-Off

### 1. Client-side pagination
Dipilih untuk kemudahan implementasi.
Trade-off:
* Lebih cepat dibuat
* Kurang optimal untuk data besar

### 2. Context API dibanding Redux
Dipilih karena kebutuhan state masih sederhana.
Trade-off:
* Lebih ringan dan mudah digunakan
* Kurang cocok untuk aplikasi besar

### 3. Loading sederhana
Menggunakan loading text atau komponen basic.
Trade-off:
* Cepat diimplementasikan
* UX belum sebaik skeleton loading

### 4. Pessimistic update
Menunggu respon API sebelum update UI.
Trade-off:
* Data lebih aman
* Respons terasa sedikit lebih lambat

## Kesimpulan
Project ini dirancang dengan fokus pada kesederhanaan, kemudahan penggunaan, dan performa yang cukup untuk skala kecil hingga menengah, dengan tetap mempertimbangkan kemungkinan pengembangan lebih lanjut.


