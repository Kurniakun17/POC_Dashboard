  Morning (Start Working)

  cd ~/Desktop/new-workspace/shinka/bp-dashboard
  docker-compose up -d

  Coding

  # Just edit files - auto reload works!
  # No need to restart

  Evening (Stop Working)

  docker-compose stop
  
### File Size Limits
- No file > 300 lines (split if larger)
- No function > 50 lines

### Required Before Commit
- All tests pass
- TypeScript compiles with no errors
- Linter passes with no warnings
- No secrets in staged files

### CI/CD Requirements
Every project must include:
- `.github/workflows/ci.yml` for GitHub Actions
- Pre-commit hooks via Husky (Node.js) or pre-commit (Python)


# PROJECT EXPLANATION
BAB 1. PENDAHULUAN
Proposal Descouping Pendapingan PLK For Tangguh
Expansion Project (Tep) Train-3 And UCC Project
Pekerjaan pembahasan Package Level Kost (PLK) untuk Proyek Tangguh Train-3 dilaksanakan dalam
konteks dinamika proyek yang sangat kompleks, khususnya terkait perubahan lingkup pekerjaan,
peningkatan biaya proyek secara signifikan, serta mekanisme kontraktual yang bergeser dari model
lumpsum menuju reimbursable. Perubahan-perubahan ini menghasilkan lebih dari empat ribu
PAMF yang memerlukan penilaian teknis, finansial, dan tata kelola secara cermat, terstruktur, serta
berbasis bukti. Kompleksitas tersebut menjadi dasar perlunya Framework Pembahasan PLK yang
baru, yang menuntut penerapan prinsip independensi, objektivitas, dan keandalan analitis dalam
seluruh proses evaluasi.
Salah satu tantangan utama adalah perubahan kontrak pada Tangguh Expansion Project (TEP) Train-
3 yang menyebabkan biaya berkembang jauh di luar penganggaran awal. Perubahan ini
menimbulkan kebutuhan untuk memastikan bahwa seluruh deviasi nilai dan volume pekerjaan
dapat dijelaskan dan dipertanggungjawabkan sesuai standar industri dan regulator. Transformasi
kontrak dari lumpsum menuju reimbursable menghadirkan konsekuensi tambahan berupa
meningkatnya kebutuhan transparansi, karena setiap komponen biaya kini harus ditinjau melalui
mekanisme PAMF, yang jumlahnya melampaui 4000 dokumen. Situasi ini menuntut proses
penelaahan yang sistematis, akurat, dan dapat dipertanggungjawabkan secara teknis serta
administratif.
Selain itu, proses persetujuan UPP SKK Migas memiliki risiko yang cukup tinggi dalam format
kontrak reimbursable. Hal ini disebabkan oleh tuntutan SKK Migas terhadap kelengkapan
dokumentasi, keterlacakan data, serta kecukupan informasi untuk memastikan pengambilan
keputusan yang objektif dan terukur. Dalam konteks tersebut, analisis yang tidak memadai atau tidak
independen dapat berdampak langsung pada diterimanya atau ditolaknya nilai PLK yang diajukan.
Oleh karena itu, diperlukan suatu pendekatan yang mampu menghasilkan dukungan analitis yang
kuat, defensible, dan bebas bias.
Kerumitan meningkat karena kondisi proyek di lapangan telah selesai, sehingga proses evaluasi
tidak lagi dapat mengandalkan observasi fisik, melainkan sepenuhnya berbasis dokumentasi. Hal
ini menuntut tingkat ketelitian tinggi dalam menelusuri perubahan, memverifikasi konsistensi data,
serta memastikan bahwa setiap PAMF memiliki dasar evidence yang sah, relevan, dan dapat diuji
secara audit. Dengan demikian, peran konsultan tidak lagi sekadar membantu penyusunan narasi
pembelaan terhadap perubahan pekerjaan, tetapi memastikan bahwa keseluruhan dokumentasi
proyek dapat diverifikasi secara menyeluruh dan memenuhi persyaratan audit dan regulator.
Proposal Descouping Pendapingan PLK For Tangguh
Expansion Project (Tep) Train-3 And UCC Project
Lebih jauh, lingkungan proyek migas yang diatur secara ketat, melibatkan multi-stakeholder (BP,
SKK Migas, auditor eksternal, dan internal), serta terbentuk dari ribuan item pekerjaan dengan
rantai dokumentasi yang panjang, menuntut integrasi antara pendekatan teknis, finansial,
kontraktual, dan governance. Dengan mempertimbangkan faktor risiko, kompleksitas data, serta
nilai finansial yang signifikan, Framework Pembahasan PLK yang baru mengharuskan penyusunan
ulang Scope of Work (SoW) agar konsultan dapat menjalankan fungsi evaluasi secara independen
dan profesional.
Pendahuluan ini menjadi dasar bagi perumusan SoW yang menggantikan Bab 2.1 pada kontrak
4420004122. SoW baru memastikan bahwa seluruh proses review PLK dilakukan berdasarkan
prinsip-prinsip:
(1) keterlacakan bukti (auditability),
(2) kepatuhan tata kelola (acceptability), dan
(3) kewajaran teknis serta finansial (cost reasonableness).
Kerangka kerja baru ini juga mengatur peran tim, metodologi evaluasi, mekanisme koordinasi, serta
target penyelesaian sebelum akhir tahun 2026. Dengan demikian, SoW ini menyediakan landasan
yang profesional, terukur, dan dapat diaudit untuk menghasilkan hasil evaluasi PLK yang kredibel
bagi BP dan SKK Migas, serta sesuai praktik terbaik industri hulu migas.
Proposal Descouping Pendapingan PLK For Tangguh
Expansion Project (Tep) Train-3 And UCC Project

BAB 2. TUJUAN PEKERJAAN
Proposal Descouping Pendapingan PLK For Tangguh
Expansion Project (Tep) Train-3 And UCC Project
Bab ini menjabarkan tujuan utama dari pelaksanaan pekerjaan review Package Level Kost (PLK)
sesuai dengan Framework Pembahasan PLK yang baru, yang menggantikan pendekatan
pendampingan dalam kontrak 4420004122. Tujuan pekerjaan ini dirancang untuk memastikan
bahwa seluruh proses evaluasi PAMF dilakukan secara independen, sistematis, objektif, serta
memenuhi standar audit dan tata kelola yang berlaku di industri hulu migas.
2.1. Menjamin Auditabilitas (Auditability) Seluruh PAMF
Tujuan utama pekerjaan adalah memastikan bahwa setiap PAMF memiliki tingkat keterlacakan
dan kelengkapan evidence yang memadai untuk diuji oleh auditor internal maupun eksternal.
Proses ini mencakup identifikasi kelengkapan dokumen, konsistensi data, keabsahan justifikasi,
serta verifikasi terhadap sumber informasi teknis dan kontraktual. Evaluasi auditability
bertujuan menghasilkan dokumentasi yang transparan, dapat diverifikasi, dan memenuhi
standar audit SKK Migas serta regulator terkait.
2.2. Memastikan Kepatuhan dan Akseptabilitas (Acceptability) PAMF
Pekerjaan ini bertujuan untuk menilai kesesuaian setiap PAMF dengan ketentuan tata kelola
proyek, proses persetujuan, serta persyaratan kontraktual. Penilaian akseptabilitas dilakukan
dengan mengukur kesesuaian perubahan pekerjaan terhadap prosedur proyek, jadwal, dan
mekanisme persetujuan yang berlaku. Tujuan ini memastikan bahwa setiap PAMF memenuhi
persyaratan governance dan dapat diterima oleh SKK Migas sebagai bagian dari
pertanggungjawaban nilai PLK.
2.3. Menilai Kewajaran Nilai (Cost Reasonableness) Secara Independen
Pekerjaan juga bertujuan melakukan evaluasi kewajaran nilai (cost reasonableness)
berdasarkan parameter teknis, kontraktual, dan kondisi lapangan. Konsultan harus melakukan
analisis independen terhadap volume pekerjaan, harga satuan, perbandingan baseline kontrak,
data realisasi, serta faktor deviasi yang terjadi selama pelaksanaan proyek. Hasil penilaian cost
reasonableness ini menjadi dasar penting bagi BP dan SKK Migas dalam menentukan nilai PLK
yang layak.
2.4. Melakukan Konsolidasi PLK Secara Menyeluruh
Tujuan lain adalah menghasilkan konsolidasi data PLK dalam format yang komprehensif,
terstruktur, dan mudah dianalisis. Konsolidasi mencakup penyusunan laporan teknis,
penggabungan hasil evaluasi PAMF, klasifikasi PLK per kategori, serta penyajian informasi
untuk proses pembahasan tingkat BP–SKK Migas. Konsolidasi ini mendukung proses
pengambilan keputusan yang terukur dan defensible.
Proposal Descouping Pendapingan PLK For Tangguh
Expansion Project (Tep) Train-3 And UCC Project
2.5. Mendukung Penyampaian PLK kepada SKK Migas Secara Terukur dan Profesional
Tujuan pekerjaan adalah memastikan bahwa seluruh output yang dihasilkan konsisten, reliable,
dan dapat dipertanggungjawabkan sehingga mendukung BP dalam menyiapkan dokumen PLK
yang siap diaudit dan dibahas dengan SKK Migas. Pendekatan ini menekankan kualitas analitis,
integritas data, serta objektivitas dalam setiap rekomendasi.
2.6. Memenuhi Target Penyelesaian Tahun 2026
Sebagai bagian dari Framework PLK baru, pekerjaan harus diselesaikan sepenuhnya sebelum
akhir tahun 2026. Tujuan ini memastikan adanya kesinambungan antara proses review,
pembahasan internal BP, serta pembahasan eksternal bersama SKK Migas. Dengan demikian,
seluruh aktivitas harus dijadwalkan secara efisien untuk memenuhi waktu yang telah
ditentukan.
2.7. Menjamin Independensi Konsultan dalam Pelaksanaan Evaluasi
Pekerjaan ini bertujuan untuk memastikan bahwa konsultan beroperasi secara independen, baik
secara substansi maupun persepsi. Independensi menjadi syarat utama agar hasil evaluasi
PAMF dan PLK memiliki kredibilitas dan dapat diterima oleh berbagai pemangku kepentingan,
termasuk BP, SKK Migas, dan auditor. Dengan demikian, tujuan pekerjaan mencakup penerapan
prinsip objektivitas, profesionalitas, dan bebas dari konflik kepentingan.
2.8. Mendukung Perbaikan Tata Kelola Proyek dan Pembelajaran Masa Depan
Selain menghasilkan evaluasi PLK, pekerjaan ini bertujuan mendokumentasikan temuan utama
yang dapat digunakan sebagai bahan pembelajaran bagi proyek-proyek selanjutnya. Termasuk
di dalamnya adalah identifikasi pola deviasi, potensi perbaikan proses, serta rekomendasi
peningkatan tata kelola proyek untuk pengelolaan risiko yang lebih baik.
Dengan tujuan-tujuan tersebut, pekerjaan review PLK dalam SoW ini memberikan fondasi yang
kuat untuk memastikan kualitas evaluasi, integritas hasil kerja, serta penyampaian PLK yang
dapat dipertanggungjawabkan kepada SKK Migas dan pemangku kepentingan lainnya.


# IMPORTANT 
REMEMBER TO ALWAYS TO ASK TO USE SHADCN COMPONENT FIRST
REMEMBER TO ALWAYS CHECK THE MCP USAGE