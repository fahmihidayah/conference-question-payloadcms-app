# LandingPage Component

Komponen halaman utama yang menarik untuk aplikasi konferensi tanya jawab dengan teks dalam bahasa Indonesia.

## Fitur

- ✅ Navbar responsif dengan status autentikasi
- ✅ Hero section yang menarik
- ✅ Statistik aplikasi
- ✅ Fitur unggulan
- ✅ Cara kerja platform
- ✅ Call-to-action sections
- ✅ Footer informatif
- ✅ Semua teks dalam bahasa Indonesia

## Penggunaan

### Komponen Utama

```tsx
import LandingPage from '@/components/LandingPage';

// Untuk pengguna yang belum login
<LandingPage 
  isAuthenticated={false}
/>

// Untuk pengguna yang sudah login
<LandingPage 
  isAuthenticated={true}
  userName="John Doe"
  onLogout={handleLogout}
/>
```

### Navbar Terpisah

```tsx
import Navbar from '@/components/Navbar';

<Navbar 
  isAuthenticated={true}
  userName="John Doe"
  onLogout={handleLogout}
/>
```

## Props

### LandingPage Props
- `isAuthenticated` (boolean, optional): Status autentikasi pengguna (default: false)
- `userName` (string, optional): Nama pengguna yang ditampilkan
- `onLogout` (function, optional): Callback ketika pengguna logout

### Navbar Props
- `isAuthenticated` (boolean, optional): Status autentikasi pengguna (default: false)
- `userName` (string, optional): Nama pengguna yang ditampilkan
- `onLogout` (function, optional): Callback ketika pengguna logout

## Perilaku Berdasarkan Status Autentikasi

### Pengguna Belum Login (`isAuthenticated: false`)
- Navbar menampilkan tombol "Masuk" dan "Daftar Gratis"
- Hero section menampilkan "Mulai Sekarang" dan "Lihat Demo"
- CTA mengarahkan ke halaman pendaftaran

### Pengguna Sudah Login (`isAuthenticated: true`)
- Navbar menampilkan menu profil dengan dropdown
- Hero section menampilkan "Buat Konferensi Baru" dan "Lihat Konferensi Anda"
- CTA mengarahkan langsung ke pembuatan konferensi

## Halaman yang Direferensikan

Komponen ini menggunakan link ke halaman-halaman berikut:
- `/` - Halaman utama
- `/auth` - Halaman autentikasi (login/register)
- `/conferences` - Daftar konferensi
- `/conferences/create` - Buat konferensi baru
- `/profile` - Pengaturan profil pengguna

## Styling

Komponen menggunakan Tailwind CSS dengan:
- Color scheme: Blue primary, dengan aksen hijau dan ungu
- Responsive design untuk mobile, tablet, dan desktop
- Smooth transitions dan hover effects
- Gradient backgrounds dan shadows

## Dependencies

- `lucide-react` - Untuk ikon
- `next/link` - Untuk navigasi
- `tailwindcss` - Untuk styling

## Contoh Integrasi

Lihat file `example.tsx` untuk contoh lengkap cara mengintegrasikan komponen ini dengan sistem autentikasi PayloadCMS.