# Sign-Up Feature

Fitur pendaftaran pengguna baru untuk platform KonfQ dengan validasi lengkap dan desain yang konsisten dengan sign-in.

## 🚀 Fitur

- ✅ **Validasi Lengkap** - Email, nama, password, dan konfirmasi password
- ✅ **Password Requirements** - Minimal 8 karakter dengan angka, huruf besar, dan huruf kecil
- ✅ **Auto-login** - Otomatis login setelah berhasil daftar
- ✅ **Error Handling** - Penanganan error dengan pesan dalam bahasa Indonesia
- ✅ **Responsive Design** - Desain yang sama dengan sign-in form
- ✅ **Real-time Feedback** - Loading states dan success messages

## 📁 Struktur File

```
src/features/sign-up/
├── actions/
│   └── index.ts          # Server action untuk registrasi
├── components/
│   └── form.tsx          # Form component utama
├── types.ts              # Zod schema dan TypeScript types
└── README.md             # Dokumentasi ini
```

## 🛠 Komponen

### SignUpForm
Form pendaftaran dengan validasi lengkap dan desain responsif.

```tsx
import { SignUpForm } from '@/features/sign-up/components/form';

export default function SignUpPage() {
  return <SignUpForm />;
}
```

## 📝 Validasi Schema

### Field Requirements

- **Name**: 2-50 karakter
- **Email**: Format email yang valid
- **Password**: 
  - Minimal 8 karakter
  - Mengandung minimal 1 angka
  - Mengandung minimal 1 huruf kecil
  - Mengandung minimal 1 huruf besar
- **Confirm Password**: Harus sama dengan password

### Zod Schema
```tsx
export const signUpFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).regex(/[0-9]/).regex(/[a-z]/).regex(/[A-Z]/),
  confirmPassword: z.string().min(1),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok",
  path: ["confirmPassword"],
});
```

## ⚙️ Server Action

### signUpAction
```tsx
import { signUpAction } from '@/features/sign-up/actions';

const result = await signUpAction({
  name: "John Doe",
  email: "john@example.com",
  password: "Password123",
  confirmPassword: "Password123"
});

if (result.success) {
  // User berhasil didaftarkan dan otomatis login
  console.log(result.user, result.token);
} else {
  // Handle error
  console.error(result.error);
}
```

### Fitur Server Action
- ✅ Cek email duplikat
- ✅ Buat user baru di PayloadCMS
- ✅ Auto-login setelah registrasi
- ✅ Error handling yang comprehensive

## 🎨 Styling

Form menggunakan design system yang sama dengan sign-in:
- **Color Scheme**: Blue gradient dengan accent colors
- **Layout**: Centered card dengan shadow
- **States**: Hover, focus, error, dan loading states
- **Responsive**: Mobile-first design

## 🔄 User Flow

1. **Form Submission**: User mengisi semua field dan submit
2. **Validation**: Client-side validation dengan Zod
3. **Server Action**: Kirim data ke server
4. **Email Check**: Cek apakah email sudah terdaftar
5. **Create User**: Buat user baru di database
6. **Auto Login**: Otomatis login user yang baru dibuat
7. **Redirect**: Redirect ke dashboard konferensi
8. **Success Message**: Tampilkan pesan sukses

## 🔧 Integration

### Dengan Navbar
Navbar sudah diupdate untuk mengarahkan ke `/sign-up`:

```tsx
<Link href="/sign-up" className="...">
  Daftar Gratis
</Link>
```

### Dengan PayloadCMS
Server action terintegrasi dengan PayloadCMS:
- Collection: `users`
- Fields: `name`, `email`, `password`
- Auto-generated: `id`, `createdAt`, `updatedAt`

## 📱 Mobile Support

- Responsive design untuk semua ukuran layar
- Touch-friendly form elements
- Optimized keyboard navigation
- Proper viewport handling

## 🔒 Security

- Password hashing handled by PayloadCMS
- Email validation di client dan server
- SQL injection protection
- CSRF protection melalui server actions

## 🧪 Error Handling

### Client-side Errors
- Field validation errors
- Form submission errors
- Network errors

### Server-side Errors
- Email already exists
- Database connection issues
- Validation failures

### Error Messages (Bahasa Indonesia)
- "Nama minimal 2 karakter"
- "Format email tidak valid"
- "Kata sandi minimal 8 karakter"
- "Konfirmasi kata sandi tidak cocok"
- "Pengguna dengan email ini sudah terdaftar"

## 🚀 Usage Example

```tsx
// app/(frontend)/sign-up/page.tsx
import { SignUpForm } from "@/features/sign-up/components/form";

export default function SignUpPage() {
    return <SignUpForm />;
}
```

## 🔗 Links

- **Sign-in Form**: `/auth`
- **Dashboard**: `/conferences` (redirect after signup)
- **Home**: `/` (via logo click)

## 📋 TODO / Future Enhancements

- [ ] Email verification
- [ ] Social login options
- [ ] Terms and conditions checkbox
- [ ] Profile picture upload
- [ ] Password strength indicator
- [ ] Resend verification email