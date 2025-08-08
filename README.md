# KonfQ - Platform Tanya Jawab Konferensi

![KonfQ Logo](https://img.shields.io/badge/KonfQ-Platform%20Konferensi-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Platform tanya jawab konferensi yang memungkinkan interaksi real-time antara pembicara dan audiens untuk pengalaman yang lebih engaging. Dibangun dengan Next.js dan PayloadCMS dengan antarmuka yang sepenuhnya dalam bahasa Indonesia.

## 🚀 Fitur Utama

### ✨ Platform Konferensi
- **Buat Konferensi** - Penyelenggara dapat membuat konferensi baru dengan mudah
- **Manajemen Pertanyaan** - Sistem tanya jawab real-time dari audiens
- **Dashboard Konferensi** - Kelola semua konferensi dari satu tempat
- **Bagikan Link** - Share konferensi dengan audiens melalui link yang mudah

### 🎯 Antarmuka Pengguna
- **Landing Page Menarik** - Halaman utama yang profesional dan engaging
- **Navbar Dinamis** - Navigasi yang berubah sesuai status login
- **Desain Responsif** - Optimal di desktop, tablet, dan mobile
- **Bahasa Indonesia** - Seluruh interface dalam bahasa Indonesia

### 🔐 Sistem Autentikasi
- **Registrasi Pengguna** - Sistem pendaftaran yang mudah
- **Login/Logout** - Autentikasi yang aman dengan PayloadCMS
- **Manajemen Profil** - Kelola informasi akun pengguna

### 🛠 Teknologi Modern
- **Next.js 15** dengan App Router
- **PayloadCMS 3** untuk backend dan admin panel
- **TailwindCSS** untuk styling
- **TypeScript** untuk type safety
- **React Hook Form** dengan Zod validation
- **Lucide React** untuk ikon

## 📁 Struktur Proyek

```
src/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Frontend pages
│   │   ├── [slug]/             # Dynamic pages
│   │   ├── auth/               # Authentication pages
│   │   ├── conferences/        # Conference pages
│   │   │   ├── [slug]/        # Individual conference
│   │   │   ├── create/        # Create conference
│   │   │   └── page.tsx       # Conference list
│   │   └── layout.tsx         # Frontend layout
│   └── (payload)/             # PayloadCMS admin
├── components/                  # Reusable components
│   ├── LandingPage/            # Landing page component
│   ├── Navbar/                 # Navigation component
│   └── ui/                     # UI components
├── features/                   # Feature-based modules
│   ├── conferences/            # Conference feature
│   │   ├── actions/           # Server actions
│   │   ├── components/        # UI components
│   │   └── type.ts           # TypeScript types
│   ├── questions/             # Questions feature
│   ├── sign-in/              # Sign-in feature
│   └── sign-up/              # Sign-up feature
├── collections/               # PayloadCMS collections
│   ├── Conferences.ts        # Conference collection
│   ├── Questions.ts          # Questions collection
│   └── Users.ts             # Users collection
└── utilities/                # Helper functions
```

## 🛠 Instalasi dan Setup

### Prerequisites

- **Node.js** 18.20.2+ atau 20.9.0+
- **pnpm** 9+ atau 10+
- **Database** SQLite (default) atau PostgreSQL

### Quick Start

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd question-payloadcms
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit file `.env` dan sesuaikan konfigurasi:
   ```env
   PAYLOAD_SECRET=your-secret-key-here
   DATABASE_URI=file:./question-payloadcms.db
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

5. **Akses Aplikasi**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Seeding Database

Untuk mengisi database dengan data contoh:

1. Login ke admin panel (http://localhost:3000/admin)
2. Klik tombol "Seed Database" 
3. Atau gunakan endpoint: http://localhost:3000/api/seed

## 📖 Panduan Penggunaan

### Untuk Penyelenggara Konferensi

1. **Registrasi Akun**
   - Kunjungi `/auth` untuk membuat akun baru
   - Isi data registrasi dan login

2. **Buat Konferensi Baru**
   - Setelah login, klik "Buat Konferensi"
   - Isi judul dan deskripsi konferensi
   - Konferensi akan tersedia di dashboard Anda

3. **Bagikan Konferensi**
   - Salin link konferensi dari dashboard
   - Bagikan ke audiens melalui media sosial atau platform lain
   - Audiens dapat langsung mengajukan pertanyaan

4. **Kelola Pertanyaan**
   - Lihat semua pertanyaan yang masuk secara real-time
   - Jawab pertanyaan sesuai kebutuhan konferensi

### Untuk Audiens

1. **Akses Konferensi**
   - Klik link konferensi yang dibagikan penyelenggara
   - Tidak perlu registrasi untuk mengajukan pertanyaan

2. **Ajukan Pertanyaan**
   - Isi nama dan pertanyaan Anda
   - Klik "Kirim Pertanyaan"
   - Pertanyaan akan langsung ditampilkan

## 🎨 Komponen Utama

### LandingPage
```tsx
import LandingPage from '@/components/LandingPage';

<LandingPage 
  isAuthenticated={true}
  userName="John Doe"
  onLogout={handleLogout}
/>
```

### Navbar
```tsx
import Navbar from '@/components/Navbar';

<Navbar 
  isAuthenticated={true}
  userName="John Doe"
  onLogout={handleLogout}
/>
```

### Conference Components
- `ConferenceForm` - Form pembuatan konferensi
- `ConferenceDetail` - Halaman detail konferensi
- `ListConferences` - Daftar semua konferensi

### Question Components
- `QuestionForm` - Form pengajuan pertanyaan
- Terintegrasi dengan sistem real-time

## 🔧 Konfigurasi PayloadCMS

### Collections

- **Users** - Manajemen pengguna dengan autentikasi
- **Conferences** - Data konferensi dengan slug unik
- **Questions** - Pertanyaan terkait konferensi tertentu
- **Categories** - Kategorisasi konferensi
- **Media** - Upload file dan gambar

### Features

- **Autentikasi** - Login/logout dengan session management
- **Access Control** - Kontrol akses berdasarkan role
- **Validation** - Validasi data dengan Zod schema
- **File Upload** - Upload media dengan konfigurasi otomatis

## 🚀 Development

### Available Scripts

```bash
# Development
pnpm dev                 # Start development server
pnpm dev:prod           # Production development mode

# Build
pnpm build              # Build for production
pnpm start              # Start production server

# Database
pnpm payload migrate    # Run database migrations
pnpm payload generate:types  # Generate TypeScript types

# Testing
pnpm test               # Run all tests
pnpm test:e2e          # Run end-to-end tests
pnpm test:int          # Run integration tests

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix          # Fix ESLint issues
```

### Database Options

#### SQLite (Default)
```env
DATABASE_URI=file:./question-payloadcms.db
```

#### PostgreSQL
```bash
pnpm add @payloadcms/db-postgres
```

```env
DATABASE_URI=postgresql://username:password@localhost:5432/database
```

### Docker Support

```bash
# Start with Docker
docker-compose up

# Access application
open http://localhost:3000
```

## 🌐 Deployment

### Payload Cloud (Recommended)

1. Push kode ke GitHub repository
2. Connect ke [Payload Cloud](https://payloadcms.com/new/import)
3. Deploy otomatis dari GitHub repo

### Vercel

1. Install Vercel adapter
   ```bash
   pnpm add @payloadcms/db-vercel-postgres
   ```

2. Configure database
   ```typescript
   // payload.config.ts
   import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
   
   export default buildConfig({
     db: vercelPostgresAdapter({
       pool: {
         connectionString: process.env.POSTGRES_URL || '',
       },
     }),
   })
   ```

3. Deploy to Vercel
   ```bash
   vercel --prod
   ```

### Self-hosting

1. Build untuk production
   ```bash
   pnpm build
   ```

2. Start server
   ```bash
   pnpm start
   ```

3. Configure reverse proxy (nginx/Apache)
4. Setup SSL certificate
5. Configure environment variables

## 🔒 Environment Variables

```env
# Required
PAYLOAD_SECRET=your-32-character-secret-key
DATABASE_URI=file:./question-payloadcms.db
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional
NODE_ENV=development
PORT=3000

# For PostgreSQL
POSTGRES_URL=postgresql://username:password@host:port/database

# For Vercel Deployment
VERCEL_PROJECT_PRODUCTION_URL=your-domain.vercel.app
```

## 🧪 Testing

### Unit Tests
```bash
pnpm test:int
```

### End-to-End Tests
```bash
pnpm test:e2e
```

### Test Files
- `tests/int/` - Integration tests
- `tests/e2e/` - End-to-end tests dengan Playwright

## 📚 API Documentation

### Conference Endpoints

```typescript
// Get all conferences
GET /api/conferences

// Get conference by slug
GET /api/conferences/:slug

// Create conference (authenticated)
POST /api/conferences

// Delete conference (authenticated)
DELETE /api/conferences/:id
```

### Question Endpoints

```typescript
// Get questions for conference
GET /api/questions?conference=:slug

// Create question
POST /api/questions

// Questions are public, no authentication required
```

### Auth Endpoints

```typescript
// Login
POST /api/users/login

// Logout
POST /api/users/logout

// Get current user
GET /api/users/me
```

## 🤝 Contributing

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Proyek ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🆘 Support

Jika Anda memiliki pertanyaan atau masalah:

- **GitHub Issues**: [Create an issue](https://github.com/your-repo/issues)
- **Payload Discord**: [Join community](https://discord.com/invite/payload)
- **Documentation**: [Payload Docs](https://payloadcms.com/docs)

## 🙏 Acknowledgments

- [PayloadCMS](https://payloadcms.com/) - Headless CMS yang powerful
- [Next.js](https://nextjs.org/) - React framework untuk production
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons

---

**KonfQ** - Platform Tanya Jawab Konferensi yang Modern dan Mudah Digunakan 🚀