# Pemetaan Chart ke Tujuan Project PLK Review

## Ringkasan: 8 Tujuan → Visualisasi Data

Dokumen ini memetakan setiap tujuan project dengan chart/visualisasi yang mendukungnya.

---

## Tujuan 1: Auditability (Keterlacakan Bukti)
**Prinsip:** Setiap PAMF harus memiliki evidence yang dapat diverifikasi oleh auditor

### Chart yang Mendukung:

#### ✅ 3.1 PAMF Claims Distribution
- **Fungsi:** Tracking 94 PAMF claims dengan filter dan grouping
- **Auditability:** Dapat melihat distribusi PAMF per discipline/status
- **Evidence:** Drill-down ke detail setiap PAMF

#### ✅ 3.3 Top PAMF Claims Table (Data Table)
- **Fungsi:** Sortable, filterable table dengan semua PAMF details
- **Auditability:** Export capability untuk audit trail
- **Evidence:** Link ke supporting documents (jika ada)

#### ✅ 4.1 Variation Orders Waterfall
- **Fungsi:** Menunjukkan setiap VO dan impact-nya terhadap contract value
- **Auditability:** Keterlacakan perubahan dari baseline ke final value
- **Evidence:** Detail justifikasi setiap VO

**KPI untuk Tujuan 1:**
- % PAMF dengan dokumentasi lengkap
- Jumlah PAMF yang lolos audit review
- Average documentation completeness score

---

## Tujuan 2: Acceptability (Kepatuhan Tata Kelola)
**Prinsip:** Setiap PAMF harus sesuai dengan prosedur dan governance proyek

### Chart yang Mendukung:

#### ✅ 1.3 Project Timeline with Key Events
- **Fungsi:** Menampilkan approval timeline dan governance milestones
- **Acceptability:** Verifikasi bahwa PAMF diproses sesuai prosedur
- **Governance:** Event markers untuk key approvals

#### ✅ 3.2 PAMF Value Heatmap
- **Fungsi:** Identifikasi PAMF yang memerlukan special approval
- **Acceptability:** Highlight PAMF di atas threshold value
- **Governance:** Visual indicator untuk escalation requirements

#### ✅ 4.2 VO Impact by Category
- **Fungsi:** Analisis apakah VO mengikuti kategori yang disetujui
- **Acceptability:** Verifikasi kesesuaian dengan scope approval
- **Governance:** Flag untuk out-of-scope variations

**KPI untuk Tujuan 2:**
- % PAMF yang sesuai prosedur approval
- Jumlah PAMF dengan governance issues
- Average approval cycle time

---

## Tujuan 3: Cost Reasonableness (Kewajaran Nilai)
**Prinsip:** Nilai setiap PAMF harus reasonable dan dapat dipertanggungjawabkan

### Chart yang Mendukung:

#### ✅ 2.1 Cost Breakdown by Category (Treemap)
- **Fungsi:** Visualisasi proporsi biaya per kategori
- **Reasonableness:** Identifikasi kategori dengan cost overrun
- **Analysis:** Compare dengan industry benchmark

#### ✅ 2.2 Cost Discipline Distribution
- **Fungsi:** Breakdown per 15 disciplines
- **Reasonableness:** Deteksi anomali biaya per discipline
- **Analysis:** Historical comparison

#### ✅ 2.3 Monthly Cost Trends (Area Chart)
- **Fungsi:** Trend FGRS, LOGI, POB costs
- **Reasonableness:** Identifikasi spike atau anomali
- **Analysis:** Seasonality patterns

#### ✅ 7.1 Baseline vs Actual Comparison
- **Fungsi:** Compare Original contract vs AMD-5 per kategori
- **Reasonableness:** Menunjukkan magnitude deviasi
- **Analysis:** % variance calculation

#### ✅ 5.1 Subcontractor Cost Distribution
- **Fungsi:** Proporsi biaya per subcontractor
- **Reasonableness:** Verifikasi alokasi yang reasonable
- **Analysis:** Compare dengan contract terms

**KPI untuk Tujuan 3:**
- Average cost variance % per category
- Number of cost outliers identified
- Cost reasonableness score (composite metric)

---

## Tujuan 4: Konsolidasi PLK Menyeluruh
**Prinsip:** Semua data PLK harus terkonsolidasi dalam format yang komprehensif

### Chart yang Mendukung:

#### ✅ 1.1 Project Summary Cards (KPI Dashboard)
- **Fungsi:** High-level metrics dalam satu view
- **Konsolidasi:** Total contract value, PAMF count, progress
- **Format:** Executive summary format

#### ✅ 1.2 Contract Evolution Timeline
- **Fungsi:** Consolidated view dari Original hingga AMD-5
- **Konsolidasi:** Semua amendments dalam satu timeline
- **Format:** Easy to understand progression

#### ✅ Semua Dashboard Sections (1-7)
- **Fungsi:** Comprehensive view across all dimensions
- **Konsolidasi:** Cost, PAMF, VO, Subcontractor, Progress
- **Format:** Structured reporting framework

**Output untuk Tujuan 4:**
- PDF report dengan semua charts
- Excel export dengan consolidated data
- Executive summary dashboard

---

## Tujuan 5: Penyampaian ke SKK Migas
**Prinsip:** Output harus professional, reliable, dan dapat dipertanggungjawabkan

### Chart yang Mendukung:

#### ✅ Export & Reporting Features
- PDF export untuk presentation ke SKK Migas
- Excel export dengan raw data untuk verification
- Print-optimized layouts

#### ✅ 1.1 Project Summary Cards
- **Fungsi:** Quick overview untuk stakeholder presentation
- **Professional:** Clean, clear metrics
- **Reliable:** Sourced from audited database

#### ✅ All Charts with Professional Styling
- Consistent color scheme (SKK Migas/BP branding)
- Clear labels dan legends
- Source data attribution

**Deliverables untuk Tujuan 5:**
- Executive dashboard (high-level untuk SKK Migas)
- Detailed technical reports (dengan semua supporting data)
- Presentation-ready exports

---

## Tujuan 6: Target Penyelesaian 2026
**Prinsip:** Semua pekerjaan harus selesai sebelum akhir 2026

### Chart yang Mendukung:

#### ✅ 6.1 Project Progress Over Time
- **Fungsi:** Tracking completion progress
- **Target:** Visual indicator untuk 2026 deadline
- **Milestones:** Key deliverable markers

#### ✅ 1.3 Project Timeline with Events
- **Fungsi:** Historical timeline dengan future milestones
- **Target:** Show remaining work to 2026
- **Planning:** Resource allocation visibility

**KPI untuk Tujuan 6:**
- % work completed vs target
- Projected completion date
- Risk of delay indicator

---

## Tujuan 7: Independensi Konsultan
**Prinsip:** Evaluasi harus objektif dan bebas konflik kepentingan

### Chart yang Mendukung:

#### ✅ Methodology Transparency
- Semua calculations dapat diverifikasi
- Source data visible dalam tooltips
- Formula/methodology documentation

#### ✅ 7.1 Baseline vs Actual Comparison
- **Fungsi:** Objective comparison tanpa bias
- **Independensi:** Based on factual data only
- **Transparency:** Clear deviation metrics

#### ✅ 3.1 PAMF Distribution (Unbiased View)
- **Fungsi:** Faktual distribution tanpa interpretasi
- **Independensi:** Let data speak for itself
- **Objectivity:** No pre-filtering or manipulation

**Prinsip Implementasi:**
- Open source calculation methods
- Audit trail untuk setiap data transformation
- No manual overrides tanpa justifikasi

---

## Tujuan 8: Pembelajaran Masa Depan
**Prinsip:** Dokumentasi temuan untuk perbaikan proyek masa depan

### Chart yang Mendukung:

#### ✅ 7.2 Deviation Heatmap by Category & Time
- **Fungsi:** Identifikasi pola deviasi
- **Pembelajaran:** Kategori mana yang sering overrun
- **Insight:** Timing of deviations

#### ✅ 4.2 VO Impact by Category
- **Fungsi:** Analisis pola variation orders
- **Pembelajaran:** Kategori dengan most variations
- **Insight:** Predictive indicators untuk future projects

#### ✅ 2.3 Monthly Cost Trends
- **Fungsi:** Historical cost patterns
- **Pembelajaran:** Seasonality dan trend patterns
- **Insight:** Forecasting untuk future budgeting

#### ✅ 5.2 Subcontractor Monthly Trends
- **Fungsi:** Subcontractor performance over time
- **Pembelajaran:** Identify reliable vs problematic vendors
- **Insight:** Vendor selection criteria

**Deliverables untuk Tujuan 8:**
- Lessons learned report
- Best practices documentation
- Risk factors identification
- Recommendation for future contracts

---

## Chart Priority Matrix

### High Priority (Must-Have - Phase 1)
1. **1.1 Project Summary Cards** - Executive overview
2. **1.2 Contract Evolution Timeline** - Core story
3. **2.1 Cost Breakdown Treemap** - Primary analysis
4. **3.3 PAMF Claims Table** - Audit requirement
5. **7.1 Baseline vs Actual Comparison** - Key insight

### Medium Priority (Should-Have - Phase 2)
6. **2.3 Monthly Cost Trends** - Detailed analysis
7. **3.1 PAMF Distribution Chart** - Support auditability
8. **4.1 Variation Orders Waterfall** - Change tracking
9. **5.1 Subcontractor Distribution** - Cost allocation
10. **6.1 Project Progress** - Timeline tracking

### Lower Priority (Nice-to-Have - Phase 3)
11. **1.3 Project Timeline with Events** - Context
12. **2.2 Cost Discipline Distribution** - Detailed breakdown
13. **3.2 PAMF Value Heatmap** - Advanced analysis
14. **4.2 VO Impact by Category** - Learning
15. **5.2 Subcontractor Trends** - Performance tracking
16. **6.2 Monthly POB Trends** - Resource analysis
17. **7.2 Deviation Heatmap** - Pattern analysis

---

## Dashboard Navigation Structure

```
┌─────────────────────────────────────────────┐
│  BP Tangguh TEP - PLK Review Dashboard      │
│  [Logo]                           [User]     │
└─────────────────────────────────────────────┘

┌─────────────────┐
│  Navigation     │
│                 │
│  🏠 Overview    │  ← Tujuan 4, 5, 6
│  💰 Cost        │  ← Tujuan 3
│  📋 PAMF        │  ← Tujuan 1, 2
│  🔄 Variations  │  ← Tujuan 1, 8
│  👷 Subcon      │  ← Tujuan 3
│  📈 Progress    │  ← Tujuan 6
│  📊 Analysis    │  ← Tujuan 3, 8
│  📄 Reports     │  ← Tujuan 5
│                 │
└─────────────────┘

Main Content Area →
[Dynamic charts based on selected page]
```

---

## Success Metrics per Objective

| Tujuan | Key Metric | Target | Dashboard Indicator |
|--------|-----------|--------|---------------------|
| 1. Auditability | Documentation Completeness | 100% | Green badge on PAMF table |
| 2. Acceptability | Governance Compliance | 95%+ | Compliance score card |
| 3. Cost Reasonableness | Variance within Threshold | ±15% | Color-coded deviations |
| 4. Konsolidasi | Data Integration | 100% | All tables populated |
| 5. Penyampaian SKK | Report Readiness | Ready | Export functionality active |
| 6. Target 2026 | Progress Tracking | On track | Timeline indicator green |
| 7. Independensi | Audit Trail | Complete | Methodology documented |
| 8. Pembelajaran | Insights Generated | 10+ key findings | Lessons learned section |

---

## Color Coding System

### Chart Colors (Consistent Across Dashboard)

**Primary Palette:**
- `#0066CC` - Primary blue (BP brand)
- `#00A86B` - Success green (on track, within budget)
- `#FFA500` - Warning orange (review needed)
- `#DC3545` - Alert red (over budget, delayed)
- `#6C757D` - Neutral gray (baseline, reference)

**Cost Categories:**
- FGRS: `#4A90E2`
- LOGI: `#7B68EE`
- POB: `#50C878`

**Amendments:**
- Original: `#6C757D` (gray)
- AMD-1: `#E3F2FD` (light blue)
- AMD-2: `#BBDEFB`
- AMD-3: `#90CAF9`
- AMD-4: `#64B5F6`
- AMD-5: `#0066CC` (primary blue)

---

**Document Version:** 1.0
**Created:** 2026-02-09
**Purpose:** Alignment guide antara project objectives dan dashboard visualization
