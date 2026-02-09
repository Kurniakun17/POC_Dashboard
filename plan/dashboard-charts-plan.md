# BP Tangguh TEP Dashboard - Charts & Visualization Plan

## Project Context

**Tangguh Expansion Project (TEP) Train-3 - Package Level Cost (PLK) Review Dashboard**

Dashboard ini dirancang untuk mendukung 8 tujuan utama review PLK dengan visualisasi data yang komprehensif, auditabel, dan mendukung pengambilan keputusan objektif untuk stakeholder: BP, SKK Migas, dan auditor.

### Key Challenges
- 4000+ PAMF yang perlu direview
- Kontrak berubah dari lumpsum ke reimbursable
- Biaya meningkat signifikan dari baseline
- Evaluasi 100% berbasis dokumentasi (project sudah selesai)
- Target completion: akhir 2026

---

## Dashboard Structure

### 1. Overview Dashboard (Home)
**Tujuan yang didukung:** Tujuan 4, 5, 6 (Konsolidasi, Penyampaian, Timeline)

#### 1.1 Project Summary Cards
**Chart Type:** Stat Cards / KPI Cards
**Data Source:** `tb_m_project`, `tb_m_amendment`, `tb_t_contract_value`
**Metrics:**
- Total Contract Value (Latest Amendment)
- Contract Growth % (Original vs AMD-5)
- Total PAMF Claims
- Completion Progress %

**Shadcn Components:**
- `Card` with `CardHeader`, `CardTitle`, `CardContent`
- Custom stat cards with trend indicators

---

#### 1.2 Contract Evolution Timeline
**Chart Type:** Line Chart with area fill
**Data Source:** `tb_m_amendment` → `tb_t_contract_value`
**Purpose:** Menunjukkan evolusi nilai kontrak dari Original hingga AMD-5

**X-Axis:** Amendment (Original, AMD-1, AMD-2, AMD-3, AMD-4, AMD-5)
**Y-Axis:** Contract Value (USD)
**Lines:**
- Total contract value per amendment
- Baseline comparison line

**Shadcn Components:**
- `recharts` Line Chart
- Custom tooltips showing amendment details and dates

**SQL Query Logic:**
```sql
SELECT
  a.amendment_code,
  a.effective_date,
  SUM(cv.value) as total_value
FROM tb_m_amendment a
LEFT JOIN tb_t_contract_value cv ON a.amendment_id = cv.amendment_id
GROUP BY a.amendment_id
ORDER BY a.effective_date
```

---

#### 1.3 Project Timeline with Key Events
**Chart Type:** Timeline / Gantt-style visualization
**Data Source:** `tb_m_event`, `tb_t_project_progress`
**Purpose:** Menampilkan timeline proyek dengan key milestones dan events

**Shadcn Components:**
- Custom timeline component using `Card` and `Badge`
- Event markers with descriptions

---

### 2. Cost Analysis Dashboard
**Tujuan yang didukung:** Tujuan 3 (Cost Reasonableness)

#### 2.1 Cost Breakdown by Category
**Chart Type:** Treemap atau Sunburst Chart
**Data Source:** `tb_m_cost_category` → `tb_t_contract_value`
**Purpose:** Visualisasi hierarki biaya per kategori untuk analisis cost reasonableness

**Dimensions:**
- Level 1: Main Categories (42 categories)
- Value: USD amount
- Color scale: by cost magnitude

**Shadcn Components:**
- `recharts` Treemap
- Interactive tooltips with category details

**SQL Query Logic:**
```sql
SELECT
  cc.category_name,
  cc.category_code,
  SUM(cv.value) as total_cost
FROM tb_m_cost_category cc
LEFT JOIN tb_t_contract_value cv ON cc.category_id = cv.category_id
WHERE cv.amendment_id = (SELECT MAX(amendment_id) FROM tb_m_amendment)
GROUP BY cc.category_id
ORDER BY total_cost DESC
```

---

#### 2.2 Cost Discipline Distribution
**Chart Type:** Horizontal Bar Chart
**Data Source:** `tb_m_cost_discipline` → `tb_t_pamf_claim`
**Purpose:** Breakdown biaya per discipline (15 disciplines)

**X-Axis:** Total Cost (USD)
**Y-Axis:** Discipline Name
**Colors:** Gradient based on cost magnitude

**Shadcn Components:**
- `recharts` Bar Chart (horizontal)
- Custom legend with percentages

---

#### 2.3 Monthly Cost Trends
**Chart Type:** Area Chart (stacked)
**Data Source:** `tb_t_monthly_cost`
**Purpose:** Trend analysis untuk identifikasi pola deviasi biaya

**X-Axis:** Month-Year
**Y-Axis:** Cost (USD)
**Series:**
- FGRS costs
- LOGI costs
- POB costs
- Total (line overlay)

**Shadcn Components:**
- `recharts` Area Chart with stacking
- Date range selector
- Export to CSV functionality

**SQL Query Logic:**
```sql
SELECT
  year,
  month,
  SUM(fgrs_cost) as fgrs,
  SUM(logi_cost) as logi,
  SUM(pob_cost) as pob
FROM tb_t_monthly_cost
WHERE project_id = 1
GROUP BY year, month
ORDER BY year, month
```

---

### 3. PAMF Analysis Dashboard
**Tujuan yang didukung:** Tujuan 1, 2 (Auditability, Acceptability)

#### 3.1 PAMF Claims Distribution
**Chart Type:** Bar Chart with drill-down
**Data Source:** `tb_t_pamf_claim`
**Purpose:** Analisis distribusi 94 PAMF claims untuk audit tracking

**Grouping Options:**
- By Cost Discipline
- By Status (if available)
- By Value Range

**X-Axis:** Category
**Y-Axis:** Number of PAMFs / Total Value

**Shadcn Components:**
- `recharts` Bar Chart
- Tabs for switching between count/value views
- Filter dropdowns using `Select`

---

#### 3.2 PAMF Value Heatmap
**Chart Type:** Matrix Heatmap
**Data Source:** `tb_t_pamf_claim`
**Purpose:** Identifikasi PAMF dengan nilai tinggi yang perlu prioritas review

**Dimensions:**
- X: Time period (if available)
- Y: Discipline
- Color: Claim amount

**Shadcn Components:**
- Custom heatmap using CSS Grid
- Tooltips with PAMF details

---

#### 3.3 Top PAMF Claims Table
**Chart Type:** Data Table (sortable, filterable)
**Data Source:** `tb_t_pamf_claim`
**Purpose:** Detail view untuk auditability

**Columns:**
- PAMF ID
- Discipline
- Claim Amount
- Description
- Status

**Shadcn Components:**
- `Table` with sorting
- `Input` for search/filter
- Pagination

---

### 4. Variation Orders Dashboard
**Tujuan yang didukung:** Tujuan 1, 3, 8 (Auditability, Cost Reasonableness, Pembelajaran)

#### 4.1 Variation Orders Summary
**Chart Type:** Waterfall Chart
**Data Source:** `tb_t_variation_order`
**Purpose:** Menunjukkan impact variation orders terhadap contract value

**Bars:**
- Starting contract value
- +/- each variation order (12 VOs)
- Final contract value

**Shadcn Components:**
- Custom waterfall chart using `recharts` Bar Chart
- Color coding: green (positive), red (negative)

---

#### 4.2 VO Impact by Category
**Chart Type:** Grouped Bar Chart
**Data Source:** `tb_t_variation_order` (join with categories)
**Purpose:** Analisis pola deviasi per kategori untuk pembelajaran

**Shadcn Components:**
- `recharts` Bar Chart with grouping
- Toggle for absolute/percentage view

---

### 5. Subcontractor Analysis
**Tujuan yang didukung:** Tujuan 3, 4 (Cost Reasonableness, Konsolidasi)

#### 5.1 Subcontractor Cost Distribution
**Chart Type:** Pie/Donut Chart
**Data Source:** `tb_m_subcontractor` → `tb_t_subcontractor_monthly`
**Purpose:** Breakdown biaya per subcontractor (3 subcontractors)

**Segments:** Each subcontractor
**Value:** Total cost across all months

**Shadcn Components:**
- `recharts` Pie Chart with custom labels
- Legend with percentages and amounts

**SQL Query Logic:**
```sql
SELECT
  s.subcontractor_name,
  SUM(sm.cost) as total_cost
FROM tb_m_subcontractor s
LEFT JOIN tb_t_subcontractor_monthly sm ON s.subcontractor_id = sm.subcontractor_id
GROUP BY s.subcontractor_id
```

---

#### 5.2 Subcontractor Monthly Trends
**Chart Type:** Multi-line Chart
**Data Source:** `tb_t_subcontractor_monthly` (1172 rows)
**Purpose:** Trend analysis per subcontractor

**X-Axis:** Month-Year
**Y-Axis:** Cost (USD)
**Lines:** One line per subcontractor (3 lines)

**Shadcn Components:**
- `recharts` Line Chart
- Subcontractor filter checkboxes
- Zoom/pan functionality

---

### 6. Progress Tracking Dashboard
**Tujuan yang didukung:** Tujuan 6 (Target 2026)

#### 6.1 Project Progress Over Time
**Chart Type:** Area Chart with milestone markers
**Data Source:** `tb_t_project_progress` (162 rows)
**Purpose:** Tracking completion progress menuju target 2026

**X-Axis:** Date
**Y-Axis:** Progress %
**Overlays:**
- Milestone markers from `tb_m_event`
- Target completion date indicator (2026)

**Shadcn Components:**
- `recharts` Area Chart
- Custom milestone markers
- Progress percentage indicator

---

#### 6.2 Monthly POB (Personnel on Board) Trends
**Chart Type:** Bar Chart with line overlay
**Data Source:** `tb_t_monthly_pob`
**Purpose:** Resource allocation tracking

**X-Axis:** Month-Year
**Y-Axis (left):** POB count (bars)
**Y-Axis (right):** Cost per person (line)

**Shadcn Components:**
- `recharts` Composed Chart (Bar + Line)

---

### 7. Comparison & Deviation Analysis
**Tujuan yang didukung:** Tujuan 3, 8 (Cost Reasonableness, Pembelajaran)

#### 7.1 Baseline vs Actual Comparison
**Chart Type:** Grouped Bar Chart
**Data Source:** `tb_t_contract_value`
**Purpose:** Perbandingan baseline (Original) vs actual (AMD-5) per kategori

**Groups:** Cost categories
**Bars:**
- Original contract value (baseline)
- AMD-5 value (actual)
- Deviation %

**Shadcn Components:**
- `recharts` Bar Chart with grouping
- Color coding for over/under budget

---

#### 7.2 Deviation Heatmap by Category & Time
**Chart Type:** Calendar Heatmap atau Matrix
**Data Source:** Aggregation from multiple tables
**Purpose:** Identifikasi pola deviasi untuk pembelajaran masa depan

**Shadcn Components:**
- Custom heatmap component
- Time period selector

---

## Implementation Plan

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Setup shadcn/ui components
- [ ] Create database connection layer (Prisma/Drizzle)
- [ ] Setup API routes for data fetching
- [ ] Create base chart wrapper components

### Phase 2: Overview Dashboard (Week 3)
- [ ] Implement KPI cards (1.1)
- [ ] Contract evolution chart (1.2)
- [ ] Project timeline (1.3)

### Phase 3: Cost Analysis (Week 4)
- [ ] Cost breakdown treemap (2.1)
- [ ] Discipline distribution (2.2)
- [ ] Monthly trends (2.3)

### Phase 4: PAMF & VO Analysis (Week 5)
- [ ] PAMF distribution charts (3.1, 3.2)
- [ ] PAMF data table (3.3)
- [ ] Variation orders waterfall (4.1)

### Phase 5: Subcontractor & Progress (Week 6)
- [ ] Subcontractor charts (5.1, 5.2)
- [ ] Progress tracking (6.1, 6.2)

### Phase 6: Advanced Analysis (Week 7)
- [ ] Comparison charts (7.1, 7.2)
- [ ] Export functionality
- [ ] Print-ready reports

### Phase 7: Testing & Refinement (Week 8)
- [ ] User acceptance testing
- [ ] Performance optimization
- [ ] Documentation

---

## Technical Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** shadcn/ui
- **Charts:** Recharts
- **Styling:** Tailwind CSS
- **State Management:** React Context / Zustand

### Backend
- **API:** Next.js API Routes
- **ORM:** Prisma or Drizzle ORM
- **Database:** MySQL (Docker)
- **Validation:** Zod

### Additional Libraries
- **Date handling:** date-fns
- **Tables:** @tanstack/react-table
- **Export:** react-to-pdf, xlsx
- **Icons:** lucide-react

---

## Data Fetching Strategy

### 1. Server Components (Default)
```typescript
// app/dashboard/page.tsx
async function DashboardPage() {
  const data = await fetchContractEvolution()
  return <ContractEvolutionChart data={data} />
}
```

### 2. API Routes for Dynamic Data
```typescript
// app/api/charts/monthly-cost/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')

  const data = await db.query.monthlyCost.findMany({
    where: eq(monthlyCost.year, year)
  })

  return Response.json(data)
}
```

### 3. Client-Side Filtering
```typescript
// Use React state for interactive filtering
const [filteredData, setFilteredData] = useState(data)
```

---

## Chart Components Architecture

```
components/
├── charts/
│   ├── contract-evolution-chart.tsx
│   ├── cost-breakdown-treemap.tsx
│   ├── monthly-cost-trends.tsx
│   ├── pamf-distribution-chart.tsx
│   ├── variation-orders-waterfall.tsx
│   ├── subcontractor-pie-chart.tsx
│   └── progress-area-chart.tsx
├── ui/
│   ├── stat-card.tsx
│   ├── chart-card.tsx
│   ├── date-range-picker.tsx
│   └── export-button.tsx
└── layouts/
    ├── dashboard-layout.tsx
    └── dashboard-nav.tsx
```

---

## Responsive Design Considerations

### Desktop (≥1024px)
- 2-3 charts per row
- Full-featured tooltips and interactions
- Side-by-side comparisons

### Tablet (768px - 1023px)
- 1-2 charts per row
- Simplified tooltips
- Collapsible filters

### Mobile (≤767px)
- 1 chart per row
- Touch-optimized interactions
- Bottom sheet for filters
- Simplified chart types (prefer bar over complex treemap)

---

## Performance Optimization

1. **Data Aggregation at DB Level**
   - Pre-aggregate data in SQL queries
   - Use database views for complex joins

2. **Caching Strategy**
   - Cache static data (master tables) for 24 hours
   - Cache aggregated data for 1 hour
   - Invalidate on data updates

3. **Code Splitting**
   - Lazy load heavy chart components
   - Split dashboard into separate routes

4. **Virtualization**
   - Use virtual scrolling for large tables (PAMF table)
   - Implement pagination for API responses

---

## Accessibility (A11Y)

- ARIA labels for all charts
- Keyboard navigation support
- Screen reader friendly data tables
- Color blind friendly palette
- High contrast mode support

---

## Export & Reporting Features

### PDF Export
- Individual chart export
- Full dashboard report export
- Executive summary format

### Excel Export
- Raw data export
- Pre-formatted reports
- Multiple sheets per export

### Print Optimization
- Print-friendly CSS
- Page break handling
- Header/footer with metadata

---

## Next Steps

1. **Review this plan with stakeholders**
2. **Prioritize charts based on immediate needs**
3. **Setup development environment**
4. **Begin Phase 1 implementation**
5. **Establish weekly review meetings**

---

## Questions for Clarification

1. Are there specific SKK Migas reporting requirements for chart formats?
2. Do we need real-time updates or is periodic refresh sufficient?
3. What level of user interactivity is required (drill-down, filtering, etc.)?
4. Are there existing brand guidelines or color schemes to follow?
5. Should we include predictive analytics or focus only on historical data?
6. What authentication/authorization levels are needed for different stakeholders?

---

**Document Version:** 1.0
**Last Updated:** 2026-02-09
**Author:** Claude (AI Assistant)
**Status:** Draft - Awaiting Review
