# BP Tangguh TEP Dashboard - Planning Documents

Folder ini berisi planning documents untuk implementasi dashboard PLK Review.

## 📋 Documents

### 1. [dashboard-charts-plan.md](./dashboard-charts-plan.md)
**Comprehensive technical plan untuk semua charts dan visualizations**

**Isi:**
- 7 dashboard sections dengan 17+ chart specifications
- Data source mapping (13 database tables)
- Shadcn/UI component recommendations
- SQL query examples
- Implementation phases (8 weeks)
- Technical stack decisions
- Performance optimization strategies
- Responsive design guidelines
- Export & reporting features

**Untuk:** Developers, Technical Lead

---

### 2. [objectives-mapping.md](./objectives-mapping.md)
**Pemetaan 8 tujuan project ke visualizations**

**Isi:**
- Detail mapping setiap tujuan ke specific charts
- KPI definitions per objective
- Chart priority matrix (High/Medium/Low)
- Success metrics per objective
- Color coding system
- Dashboard navigation structure

**Untuk:** Project Manager, Stakeholders, Product Owner

---

## 🎯 Quick Reference: 8 Tujuan Project

1. **Auditability** - Keterlacakan bukti setiap PAMF
2. **Acceptability** - Kepatuhan tata kelola proyek
3. **Cost Reasonableness** - Kewajaran nilai secara independen
4. **Konsolidasi PLK** - Konsolidasi data menyeluruh
5. **Penyampaian SKK Migas** - Output professional & reliable
6. **Target 2026** - Penyelesaian sebelum akhir 2026
7. **Independensi** - Evaluasi objektif konsultan
8. **Pembelajaran** - Dokumentasi untuk improvement

---

## 📊 Dashboard Structure Overview

```
┌─────────────────────────────────────────────────────┐
│                  BP Tangguh TEP                      │
│            PLK Review Dashboard 2026                 │
└─────────────────────────────────────────────────────┘

1. 🏠 OVERVIEW DASHBOARD
   ├─ 1.1 Project Summary KPI Cards
   ├─ 1.2 Contract Evolution Timeline (Line Chart)
   └─ 1.3 Project Timeline with Events

2. 💰 COST ANALYSIS DASHBOARD
   ├─ 2.1 Cost Breakdown by Category (Treemap)
   ├─ 2.2 Cost Discipline Distribution (Bar Chart)
   └─ 2.3 Monthly Cost Trends (Area Chart)

3. 📋 PAMF ANALYSIS DASHBOARD
   ├─ 3.1 PAMF Claims Distribution (Bar Chart)
   ├─ 3.2 PAMF Value Heatmap (Matrix)
   └─ 3.3 Top PAMF Claims Table (Data Table)

4. 🔄 VARIATION ORDERS DASHBOARD
   ├─ 4.1 VO Summary (Waterfall Chart)
   └─ 4.2 VO Impact by Category (Grouped Bar)

5. 👷 SUBCONTRACTOR ANALYSIS
   ├─ 5.1 Subcon Cost Distribution (Pie Chart)
   └─ 5.2 Subcon Monthly Trends (Multi-line)

6. 📈 PROGRESS TRACKING DASHBOARD
   ├─ 6.1 Project Progress Over Time (Area Chart)
   └─ 6.2 Monthly POB Trends (Bar + Line)

7. 📊 COMPARISON & DEVIATION ANALYSIS
   ├─ 7.1 Baseline vs Actual Comparison (Grouped Bar)
   └─ 7.2 Deviation Heatmap (Calendar/Matrix)
```

---

## 🗄️ Database Schema (13 Tables)

### Master Tables (6)
- `tb_m_project` - 1 row (TEP project)
- `tb_m_amendment` - 6 rows (Original → AMD-5)
- `tb_m_cost_category` - 42 rows
- `tb_m_cost_discipline` - 15 rows
- `tb_m_subcontractor` - 3 rows
- `tb_m_event` - 10 rows

### Transaction Tables (7)
- `tb_t_contract_value` - 258 rows
- `tb_t_monthly_cost` - 112 rows
- `tb_t_pamf_claim` - 94 rows (target: 4000+)
- `tb_t_monthly_pob` - 54 rows
- `tb_t_variation_order` - 12 rows
- `tb_t_subcontractor_monthly` - 1,172 rows
- `tb_t_project_progress` - 162 rows

---

## 🚀 Implementation Roadmap

### Phase 1: Core Infrastructure (Week 1-2)
- Setup shadcn/ui
- Database connection layer
- API routes
- Base chart components

### Phase 2: Overview Dashboard (Week 3)
- KPI cards
- Contract evolution chart
- Timeline

### Phase 3: Cost Analysis (Week 4)
- Cost breakdown treemap
- Discipline distribution
- Monthly trends

### Phase 4: PAMF & VO (Week 5)
- PAMF distribution & table
- Variation orders waterfall

### Phase 5: Subcontractor & Progress (Week 6)
- Subcontractor charts
- Progress tracking

### Phase 6: Advanced Analysis (Week 7)
- Comparison charts
- Export functionality

### Phase 7: Testing & Refinement (Week 8)
- UAT
- Performance optimization
- Documentation

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- shadcn/ui
- Recharts
- Tailwind CSS

**Backend:**
- Next.js API Routes
- Prisma/Drizzle ORM
- MySQL (Docker)

**Additional:**
- date-fns
- @tanstack/react-table
- react-to-pdf, xlsx
- lucide-react

---

## 📈 Chart Priority

### 🔴 High Priority (Must-Have)
1. Project Summary Cards
2. Contract Evolution Timeline
3. Cost Breakdown Treemap
4. PAMF Claims Table
5. Baseline vs Actual Comparison

### 🟡 Medium Priority (Should-Have)
6. Monthly Cost Trends
7. PAMF Distribution Chart
8. Variation Orders Waterfall
9. Subcontractor Distribution
10. Project Progress

### 🟢 Lower Priority (Nice-to-Have)
11-17. Timeline, Heatmaps, Detailed trends

---

## 🎨 Design System

### Colors
- Primary: `#0066CC` (BP Blue)
- Success: `#00A86B` (Green)
- Warning: `#FFA500` (Orange)
- Danger: `#DC3545` (Red)
- Neutral: `#6C757D` (Gray)

### Typography
- Headings: Inter, sans-serif
- Body: Inter, sans-serif
- Monospace: Fira Code

### Spacing
- Base unit: 4px
- Container max-width: 1440px
- Grid: 12 columns

---

## 📝 Next Steps

1. ✅ Review planning documents
2. ⬜ Get stakeholder approval
3. ⬜ Setup development environment
4. ⬜ Initialize Next.js project with shadcn/ui
5. ⬜ Configure database connection
6. ⬜ Begin Phase 1 implementation

---

## 📞 Questions?

Refer to individual planning documents for detailed information, or reach out to the project team.

**Last Updated:** 2026-02-09
**Status:** Planning Complete - Ready for Implementation
