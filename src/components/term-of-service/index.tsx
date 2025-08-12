import React from 'react'

export default function TermOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Syarat dan Ketentuan Layanan</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Penerimaan Ketentuan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Dengan mengakses dan menggunakan platform konferensi dan tanya jawab ini ("Platform"), 
            Anda menyetujui untuk terikat oleh Syarat dan Ketentuan Layanan ini ("Ketentuan"). 
            Jika Anda tidak menyetujui ketentuan ini, harap tidak menggunakan Platform kami.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Deskripsi Layanan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Platform ini menyediakan layanan untuk:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Mengorganisir dan berpartisipasi dalam konferensi virtual</li>
            <li>Mengajukan dan menjawab pertanyaan dalam sesi tanya jawab</li>
            <li>Berinteraksi dengan peserta lain dalam komunitas</li>
            <li>Mengakses materi dan sumber daya konferensi</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Persyaratan Pengguna</h2>
          <h3 className="text-xl font-medium mb-3 text-gray-800">3.1 Kelayakan</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Untuk menggunakan Platform ini, Anda harus berusia minimal 13 tahun atau memiliki 
            persetujuan orang tua/wali jika berusia di bawah 18 tahun. Dengan menggunakan 
            Platform, Anda menyatakan bahwa informasi yang Anda berikan adalah akurat dan lengkap.
          </p>

          <h3 className="text-xl font-medium mb-3 text-gray-800">3.2 Akun Pengguna</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Anda bertanggung jawab untuk menjaga keamanan akun dan kata sandi Anda. 
            Anda setuju untuk segera memberitahu kami tentang penggunaan akun yang tidak sah. 
            Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan akun yang tidak sah.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Pedoman Penggunaan</h2>
          <h3 className="text-xl font-medium mb-3 text-gray-800">4.1 Perilaku yang Diizinkan</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Berpartisipasi dalam diskusi yang konstruktif dan sopan</li>
            <li>Mengajukan pertanyaan yang relevan dan bermakna</li>
            <li>Berbagi pengetahuan dan pengalaman yang bermanfaat</li>
            <li>Menghormati hak kekayaan intelektual orang lain</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 text-gray-800">4.2 Perilaku yang Dilarang</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Mengirim konten yang menyinggung, kasar, atau tidak pantas</li>
            <li>Melakukan spam, penipuan, atau aktivitas yang mengganggu</li>
            <li>Membagikan informasi pribadi orang lain tanpa izin</li>
            <li>Melanggar hukum atau mendorong aktivitas ilegal</li>
            <li>Menggunakan Platform untuk tujuan komersial tanpa izin</li>
            <li>Mengunggah virus, malware, atau kode berbahaya lainnya</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Hak Kekayaan Intelektual</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Platform dan semua konten yang terkandung di dalamnya, termasuk tetapi tidak terbatas 
            pada teks, grafik, logo, dan perangkat lunak, adalah milik kami atau pemberi lisensi 
            kami dan dilindungi oleh hukum hak cipta dan kekayaan intelektual lainnya.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Dengan mengirimkan konten ke Platform, Anda memberikan kami lisensi non-eksklusif, 
            royalty-free, dan dapat ditransfer untuk menggunakan, mereproduksi, mendistribusikan, 
            dan menampilkan konten tersebut dalam kaitannya dengan operasional Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Moderasi Konten</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami berhak untuk meninjau, mengedit, atau menghapus konten apa pun yang melanggar 
            Ketentuan ini atau yang kami anggap tidak pantas. Kami juga dapat menangguhkan atau 
            menghentikan akun pengguna yang melanggar ketentuan ini.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Ketersediaan Layanan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami berusaha menjaga Platform tetap tersedia 24/7, namun kami tidak dapat menjamin 
            ketersediaan yang tidak terputus. Kami dapat melakukan pemeliharaan, pembaruan, 
            atau perbaikan yang dapat menyebabkan gangguan sementara pada layanan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Pembatasan Tanggung Jawab</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Platform disediakan "sebagaimana adanya" tanpa jaminan apa pun. Kami tidak bertanggung 
            jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang 
            timbul dari penggunaan Platform. Tanggung jawab total kami terbatas pada jumlah 
            yang Anda bayarkan kepada kami dalam 12 bulan terakhir.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Indemnifikasi</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Anda setuju untuk membela, mengganti rugi, dan membebaskan kami dari segala klaim, 
            kerugian, atau pengeluaran yang timbul dari penggunaan Platform oleh Anda atau 
            pelanggaran Anda terhadap Ketentuan ini.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Penghentian Layanan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami dapat menghentikan atau menangguhkan akses Anda ke Platform kapan saja tanpa 
            pemberitahuan sebelumnya jika Anda melanggar Ketentuan ini. Anda juga dapat 
            menghentikan akun Anda kapan saja dengan menghubungi kami.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Hukum yang Berlaku</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. 
            Setiap sengketa yang timbul akan diselesaikan melalui pengadilan yang berwenang 
            di Indonesia.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Perubahan Ketentuan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kami berhak mengubah Ketentuan ini kapan saja. Perubahan material akan diberitahukan 
            kepada pengguna melalui email atau pemberitahuan di Platform. Penggunaan berkelanjutan 
            setelah perubahan menunjukkan penerimaan Anda terhadap ketentuan yang diperbarui.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">13. Kontak</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang Ketentuan ini, silakan hubungi kami:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong> support@platform.com<br />
              <strong>Alamat:</strong> [Alamat Perusahaan]<br />
              <strong>Telepon:</strong> [Nomor Telepon]
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}