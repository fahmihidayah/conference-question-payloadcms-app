import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Kebijakan Privasi</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Pendahuluan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi 
            informasi pribadi Anda ketika menggunakan platform konferensi dan tanya jawab kami. 
            Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Informasi yang Kami Kumpulkan</h2>
          <h3 className="text-xl font-medium mb-3 text-gray-800">2.1 Informasi Pribadi</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Nama lengkap dan alamat email</li>
            <li>Informasi profil pengguna</li>
            <li>Pertanyaan dan jawaban yang Anda kirimkan</li>
            <li>Riwayat partisipasi dalam konferensi</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 text-gray-800">2.2 Informasi Teknis</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Alamat IP dan informasi perangkat</li>
            <li>Data log aktivitas pengguna</li>
            <li>Cookie dan teknologi pelacakan serupa</li>
            <li>Informasi lokasi geografis umum</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Penggunaan Informasi</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami menggunakan informasi yang dikumpulkan untuk:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Menyediakan dan meningkatkan layanan platform</li>
            <li>Memfasilitasi partisipasi dalam konferensi dan sesi tanya jawab</li>
            <li>Mengirimkan pemberitahuan dan pembaruan layanan</li>
            <li>Menganalisis penggunaan platform untuk perbaikan</li>
            <li>Memastikan keamanan dan mencegah penyalahgunaan</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Pembagian Informasi</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, 
            kecuali dalam situasi berikut:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Ketika diwajibkan oleh hukum atau proses hukum</li>
            <li>Untuk melindungi hak, properti, atau keamanan kami atau pengguna lain</li>
            <li>Dengan penyedia layanan tepercaya yang membantu operasional platform</li>
            <li>Dalam kasus merger, akuisisi, atau penjualan aset</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Keamanan Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang sesuai untuk 
            melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. 
            Namun, tidak ada metode transmisi melalui internet yang 100% aman.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Hak Pengguna</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Anda memiliki hak untuk:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Mengakses dan memperbarui informasi pribadi Anda</li>
            <li>Meminta penghapusan data pribadi Anda</li>
            <li>Membatasi atau menolak pengumpulan data tertentu</li>
            <li>Memindahkan data Anda ke layanan lain</li>
            <li>Mengajukan keberatan terhadap pemrosesan data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Cookie dan Teknologi Pelacakan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna, 
            menganalisis penggunaan platform, dan menyediakan konten yang dipersonalisasi. 
            Anda dapat mengelola preferensi cookie melalui pengaturan browser Anda.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Retensi Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami akan menyimpan informasi pribadi Anda selama diperlukan untuk menyediakan layanan, 
            mematuhi kewajiban hukum, menyelesaikan sengketa, dan menegakkan perjanjian kami. 
            Data akan dihapus secara aman setelah periode retensi berakhir.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Perubahan Kebijakan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan 
            perubahan dalam praktik kami atau untuk alasan hukum, operasional, atau regulasi lainnya. 
            Perubahan material akan diberitahukan kepada pengguna melalui email atau pemberitahuan platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Kontak</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait Kebijakan Privasi ini 
            atau pemrosesan data pribadi Anda, silakan hubungi kami melalui:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong> privacy@platform.com<br />
              <strong>Alamat:</strong> [Alamat Perusahaan]<br />
              <strong>Telepon:</strong> [Nomor Telepon]
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}