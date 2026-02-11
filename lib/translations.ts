/**
 * Bahasa Indonesia Translation Dictionary
 *
 * Central translation system for BP POC Dashboard.
 * Usage: import { t } from '@/lib/translations'
 * Example: <h1>{t('Dashboard')}</h1>
 */

const ID: Record<string, string> = {
  // Main Navigation & Sections
  'Dashboard': 'Dasbor',
  'Data Analysis': 'Analisis Data',
  'Field Data': 'Data Lapangan',
  'Reports': 'Laporan',
  'Settings': 'Pengaturan',
  'Logout': 'Keluar',
  'Main Menu': 'Menu Utama',
  'Profile': 'Profil',

  // KPI Cards
  'Total Contract Value': 'Total Nilai Kontrak',
  'Total Amendments': 'Total Amandemen',
  'PAMF Claims': 'Klaim PAMF',
  'Project Duration': 'Durasi Proyek',
  'from Original': 'dari Nilai Awal',
  'Contract modifications': 'Modifikasi kontrak',
  'Package Level Cost claims': 'Klaim Package Level Cost',
  'Requires audit review': 'Memerlukan review audit',
  'subcontractors': 'subkontraktor',
  'years': 'tahun',

  // Chart Titles & Descriptions
  'Contract Evolution Timeline': 'Timeline Evolusi Kontrak',
  'Contract value progression from Original (2016) to AMD-5 (2024)':
    'Perkembangan nilai kontrak dari Original (2016) ke AMD-5 (2024)',
  'Monthly Cost Trends': 'Tren Biaya Bulanan',
  'Cost Breakdown': 'Rincian Biaya',
  'PAMF Analysis': 'Analisis PAMF',
  'Subcontractor Progress': 'Progres Subkontraktor',
  'POB Timeline': 'Timeline POB',
  'Contract Composition by Cost Category': 'Komposisi Kontrak per Kategori Biaya',
  'Monthly Personnel on Board (POB)': 'Personnel on Board (POB) Bulanan',
  'Top 15 PAMF Claim Categories': '15 Kategori Klaim PAMF Tertinggi',

  // Filter Panel
  'Filters': 'Filter',
  'Filter by Date Range': 'Filter berdasarkan Rentang Tanggal',
  'Select Amendment': 'Pilih Amandemen',
  'Select Discipline': 'Pilih Disiplin',
  'Select Subcontractor': 'Pilih Subkontraktor',
  'Apply Filters': 'Terapkan Filter',
  'Reset Filters': 'Reset Filter',
  'Clear All': 'Hapus Semua',
  'Date Range': 'Rentang Tanggal',
  'Start Date': 'Tanggal Mulai',
  'End Date': 'Tanggal Selesai',
  'Amendment': 'Amandemen',
  'Discipline': 'Disiplin',
  'Subcontractor': 'Subkontraktor',
  'All': 'Semua',

  // Chart Elements
  'Plan': 'Rencana',
  'Actual': 'Aktual',
  'Monthly': 'Bulanan',
  'Cumulative': 'Kumulatif',
  'Export Chart': 'Ekspor Grafik',
  'Contract Value': 'Nilai Kontrak',
  'Legend': 'Legenda',
  'Toggle Series': 'Toggle Seri',

  // Cost Categories
  'Lump Sum': 'Lump Sum',
  'Reimbursable': 'Reimbursable',
  'Provisional': 'Provisional',
  'Backcharge': 'Backcharge',
  'Total': 'Total',

  // Disciplines
  'SMT': 'SMT',
  'LOGISTIC': 'LOGISTIC',
  'COVID': 'COVID',
  'PMT': 'PMT',

  // Time Periods
  'January': 'Januari',
  'February': 'Februari',
  'March': 'Maret',
  'April': 'April',
  'May': 'Mei',
  'June': 'Juni',
  'July': 'Juli',
  'August': 'Agustus',
  'September': 'September',
  'October': 'Oktober',
  'November': 'November',
  'December': 'Desember',

  // Common Actions
  'Loading': 'Memuat',
  'Loading chart...': 'Memuat grafik...',
  'No data available': 'Tidak ada data tersedia',
  'Error loading data': 'Gagal memuat data',
  'Retry': 'Coba Lagi',
  'Close': 'Tutup',
  'Save': 'Simpan',
  'Cancel': 'Batal',
  'Search': 'Cari',
  'More': 'Lainnya',

  // Tooltips & Descriptions
  'Click to filter': 'Klik untuk filter',
  'Hover for details': 'Arahkan untuk detail',
  'Double-click to drill down': 'Klik dua kali untuk drill down',
  'Effective Date': 'Tanggal Efektif',
  'Amendment Code': 'Kode Amandemen',
  'Amendment Name': 'Nama Amandemen',
  'Claim Amount': 'Jumlah Klaim',
  'PAMF Count': 'Jumlah PAMF',
  'POB Count': 'Jumlah POB',
  'Isolation Count': 'Jumlah Isolasi',

  // Status & Progress
  'Completed': 'Selesai',
  'In Progress': 'Dalam Proses',
  'Pending': 'Menunggu',
  'Delayed': 'Tertunda',
  'On Track': 'Sesuai Jadwal',
  'Behind Schedule': 'Terlambat',
  'Ahead of Schedule': 'Lebih Cepat dari Jadwal',

  // Events
  'COVID Wave 1': 'Gelombang COVID 1',
  'COVID Wave 2': 'Gelombang COVID 2',
  'Delta Outbreak': 'Wabah Delta',
  'Pre-COVID Peak': 'Puncak Pra-COVID',
  'Restricted Level': 'Level Pembatasan',

  // Chart Legends
  'FGRS RCE Monthly Cost': 'Biaya Bulanan FGRS RCE',
  'LOGI RCE Cost': 'Biaya LOGI RCE',
  'POB (CSTS+SubCon)': 'POB (CSTS+SubCon)',
  'Isolation Facility': 'Fasilitas Isolasi',
  'Plan Progress': 'Progres Rencana',
  'Actual Progress': 'Progres Aktual',
  'Overall Progress': 'Progres Keseluruhan',

  // Units
  'Million USD': 'Juta USD',
  'Billion USD': 'Miliar USD',
  'MUSD': 'MUSD',
  'USD': 'USD',
  'Percentage': 'Persentase',
  'Count': 'Jumlah',

  // Dashboard tabs
  'Overview': 'Ringkasan',
  'Cost Analysis': 'Analisis Biaya',
  'Operations': 'Operasional',
  'Variation Orders': 'Variation Order',
  'selected': 'dipilih',
  'Approved': 'Disetujui',
  'Rejected': 'Ditolak',
  'Plan vs Actual': 'Rencana vs Aktual',

  // Page Footer/Header
  'BP Tangguh TEP Dashboard': 'Dashboard BP Tangguh TEP',
  'Package Level Cost (PLK) Review 2026': 'Review Package Level Cost (PLK) 2026',
  'More charts coming soon': 'Lebih banyak grafik segera hadir',

  // Error Messages
  'Failed to load summary data': 'Gagal memuat data ringkasan',
  'Failed to load chart data': 'Gagal memuat data grafik',
  'Connection error': 'Kesalahan koneksi',
  'Please check your network': 'Silakan periksa koneksi Anda',

  // Empty States
  'No claims found': 'Tidak ada klaim ditemukan',
  'No amendments available': 'Tidak ada amandemen tersedia',
  'No data for selected period': 'Tidak ada data untuk periode yang dipilih',

  // Presets
  'Full Timeline': 'Timeline Lengkap',
  'COVID Period': 'Periode COVID',
  'Post COVID': 'Pasca COVID',
  'Last 12 Months': '12 Bulan Terakhir',
  'Last 6 Months': '6 Bulan Terakhir',
  'Year to Date': 'Tahun Berjalan',
}

/**
 * Translation function
 * @param key - English key
 * @returns Translated string in Bahasa Indonesia
 */
export function t(key: string): string {
  return ID[key] || key
}

/**
 * Get translation or return fallback
 * @param key - English key
 * @param fallback - Fallback string if key not found
 */
export function tOr(key: string, fallback: string): string {
  return ID[key] || fallback
}

/**
 * Check if translation exists
 * @param key - English key
 */
export function hasTranslation(key: string): boolean {
  return key in ID
}

export default ID
