# POC Data Feasibility Analysis

**Date:** 2026-02-09
**Purpose:** Analisis data aktual di database untuk menentukan chart mana yang feasible dengan POC data

---

## 📊 Current Data Status

### ✅ Master Tables (Fully Populated)
| Table | Rows | Status | Notes |
|-------|------|--------|-------|
| `tb_m_project` | 1 | ✅ Complete | TEP project |
| `tb_m_amendment` | 6 | ✅ Complete | Original → AMD-5 (2016-2024) |
| `tb_m_cost_category` | 42 | ✅ Complete | Full category list |
| `tb_m_cost_discipline` | 15 | ✅ Complete | Full discipline list |
| `tb_m_subcontractor` | 3 | ✅ Complete | Meindo, LOGI, Daewoo |
| `tb_m_event` | 10 | ✅ Complete | Project events |

### ⚠️ Transaction Tables (Partial/POC Data)
| Table | Rows | Status | Data Scope |
|-------|------|--------|------------|
| `tb_t_contract_value` | 258 | ⚠️ **Limited** | Only 3-4 categories out of 42 |
| `tb_t_monthly_cost` | 112 | ✅ Good | 2019-2023, FGRS & LOGI only |
| `tb_t_pamf_claim` | 94 | ✅ Good | 94 PAMF records (target: 4000+) |
| `tb_t_monthly_pob` | 54 | ⚠️ **Sparse** | Most values are 0 |
| `tb_t_variation_order` | 12 | ✅ Good | 12 VOs with amounts |
| `tb_t_subcontractor_monthly` | 1172 | ✅ Excellent | Rich time series (2019-2023) |
| `tb_t_project_progress` | 162 | ✅ Good | Progress tracking data |

---

## 🎯 Chart Feasibility Assessment

### 🟢 FEASIBLE NOW (High Priority - Can Build with POC Data)

#### 1. Contract Evolution Timeline ✅ **READY**
- **Status:** 100% Feasible
- **Data:** 6 amendments with complete values (5.1B → 14.5B)
- **Chart Type:** Line Chart with area fill
- **Implementation:** Ready to build
- **Expected Output:** Shows 3x contract growth from Original to AMD-5

```sql
SELECT
  a.amendment_code,
  a.effective_date,
  SUM(cv.amount_usd) as total_value
FROM tb_m_amendment a
LEFT JOIN tb_t_contract_value cv ON a.amendment_id = cv.amendment_id
GROUP BY a.amendment_id
ORDER BY a.effective_date
```

**Sample Output:**
| Amendment | Date | Value (USD) |
|-----------|------|-------------|
| ORIGINAL | 2016-06-01 | $5.15B |
| AMD-1 | 2017-01-01 | $4.96B |
| AMD-2 | 2019-05-01 | $8.01B |
| AMD-3 | 2020-12-01 | $9.60B |
| AMD-4 | 2022-06-01 | $11.78B |
| AMD-5 | 2024-01-01 | $14.50B |

---

#### 2. Project Summary KPI Cards ✅ **READY**
- **Status:** 100% Feasible
- **Data Available:**
  - ✅ Latest contract value: $14.5B (AMD-5)
  - ✅ Contract growth: +181% (Original vs AMD-5)
  - ✅ Total PAMF: 94 records
  - ✅ Amendments count: 6
  - ✅ Subcontractors: 3
  - ✅ Time span: 2016-2024 (8 years)
- **Implementation:** Simple aggregation queries

**KPI Card Specs:**
1. **Total Contract Value** - $14.50B (AMD-5)
2. **Contract Growth** - +181% from Original
3. **Total Amendments** - 6 (Original + 5 AMDs)
4. **Active PAMF Claims** - 94 records
5. **Project Duration** - 2016-2024 (8 years)
6. **Subcontractors** - 3 companies

---

#### 3. Monthly Cost Trends (FGRS & LOGI) ✅ **READY**
- **Status:** 100% Feasible
- **Data:** 112 rows spanning 2019-2023
- **Chart Type:** Area Chart (stacked)
- **Limitation:** Only FGRS and LOGI (no POB in monthly_cost)
- **Implementation:** Ready with 2 series instead of 3

```sql
SELECT
  year,
  month,
  cost_type,
  monthly_amount_musd,
  cumulative_amount_musd
FROM tb_t_monthly_cost
WHERE project_id = 1
ORDER BY year, month
```

**Available Series:**
- FGRS_RCE (56 data points)
- LOGI_RCE (56 data points)

---

#### 4. PAMF Claims Analysis ✅ **READY**
- **Status:** 100% Feasible
- **Data:** 94 PAMF records with hierarchy structure
- **Chart Options:**
  - ✅ **Distribution by Discipline** (Bar Chart)
  - ✅ **Top Claims Table** (Data Table)
  - ✅ **Hierarchical Tree View** (Tree Map or Sunburst)
- **Fields Available:**
  - discipline_id, discipline name
  - pamf_group, label, level (hierarchy)
  - pamf_count
  - claim_amount_usd

**Sample Disciplines:**
- COVID (45 claims, $90.1M)
- Earthwork/foundation ($XX million)
- Other disciplines...

```sql
SELECT
  discipline,
  COUNT(*) as claim_count,
  SUM(claim_amount_usd) as total_claims
FROM tb_t_pamf_claim
WHERE level = 1  -- Top level
GROUP BY discipline_id
ORDER BY total_claims DESC
```

---

#### 5. Variation Orders Summary ✅ **READY**
- **Status:** 100% Feasible
- **Data:** 12 VO records with amounts and status
- **Chart Type:** Waterfall Chart or Bar Chart
- **Fields:**
  - vo_number, vo_name
  - amount_usd
  - status (APPROVED)
  - approved_in_amendment

**Sample VOs:**
- VO 1-9 (Combined): $26.4M
- VO 10: $6.8M
- Total tracked: 12 variations

```sql
SELECT
  vo_number,
  vo_name,
  amount_usd,
  approved_in_amendment
FROM tb_t_variation_order
WHERE project_id = 1
GROUP BY vo_number
ORDER BY vo_number
```

---

#### 6. Subcontractor Analysis ✅ **READY**
- **Status:** 100% Feasible
- **Data:** 1,172 rows (excellent time series)
- **Chart Options:**
  - ✅ **Cost Distribution** (Pie Chart) - using `invoice_value_musd`
  - ✅ **Monthly Trends** (Multi-line Chart)
  - ✅ **Performance Comparison** (Grouped Bar)

**Available Metrics:**
- `invoice_value_musd` - For cost charts
- `achieved_manhours` - For productivity
- `pob_actual`, `pob_plan` - For resource tracking
- `cumulative_progress_actual`, `cumulative_progress_plan` - For progress

**Subcontractors:**
1. Meindo
2. LOGI
3. Daewoo

```sql
-- Total cost per subcontractor
SELECT
  subcontractor,
  SUM(value) as total_invoice
FROM tb_t_subcontractor_monthly
WHERE metric = 'invoice_value_musd'
GROUP BY subcontractor_id
```

---

#### 7. Project Progress Over Time ✅ **READY**
- **Status:** 100% Feasible
- **Data:** 162 rows (2019-2023)
- **Chart Type:** Area Chart with Plan vs Actual
- **Fields:**
  - overall_progress_pct (actual)
  - plan_progress_pct (planned)
  - year, month
  - subcontractor

```sql
SELECT
  year,
  month,
  subcontractor,
  overall_progress_pct as actual,
  plan_progress_pct as plan
FROM tb_t_project_progress
WHERE project_id = 1
ORDER BY year, month
```

---

### 🟡 PARTIALLY FEASIBLE (Can Build with Limitations)

#### 8. Cost Breakdown by Category ⚠️ **LIMITED**
- **Status:** Partially Feasible
- **Limitation:** Only 3-4 categories have data (out of 42)
- **Current Categories with Data:**
  1. EPC LUMP SUM - $6.66B
  2. PROJECT MANAGEMENT - $6.52B
  3. ENGINEERING - $1.35B
- **Chart Type:** Simple Bar Chart (not Treemap as planned)
- **Note:** Will look sparse until more categories populated

**Recommendation:** Build as simple bar chart now, upgrade to Treemap when more categories have data.

---

#### 9. Monthly POB Trends ⚠️ **SPARSE DATA**
- **Status:** Limited Feasibility
- **Data:** 54 rows but most `pob_count` values are 0
- **Alternative:** Use POB data from `tb_t_subcontractor_monthly` table
  - `pob_actual` and `pob_plan` metrics available
  - Better data quality with 1,172 rows
- **Recommendation:** Use subcontractor monthly table instead

---

### 🔴 NOT FEASIBLE YET (Need More Data)

#### 10. Deviation Heatmap ❌ **NEED MORE DATA**
- **Status:** Not Feasible
- **Reason:** Needs dense data across multiple dimensions
- **Requirements:**
  - Complete category data (only 3/42 available)
  - Baseline comparisons across time
- **Defer to:** Phase 3 when full data available

---

#### 11. Detailed Cost Discipline Distribution ❌ **NEED MORE DATA**
- **Status:** Not Feasible
- **Reason:** PAMF claims by discipline exist (94 records) but contract value breakdown by discipline not available
- **Alternative:** Can show PAMF distribution by discipline (feasible)
- **Defer to:** When contract values mapped to all 15 disciplines

---

## 📋 Recommended Implementation Plan (Revised)

### Phase 1: Core Dashboard (Week 1-2) - **BUILD NOW**
Priority charts with complete POC data:

1. ✅ **1.1 Project Summary KPI Cards**
   - Total contract value
   - Contract growth %
   - PAMF count
   - Subcontractor count
   - Date range

2. ✅ **1.2 Contract Evolution Timeline**
   - Line chart: Original → AMD-5
   - Show 3x growth trajectory
   - Date markers for each amendment

3. ✅ **3.1 PAMF Distribution Chart**
   - Bar chart by discipline
   - 94 claims visualization
   - Drill-down capability

4. ✅ **3.3 PAMF Claims Data Table**
   - Sortable, filterable table
   - Export to Excel/CSV
   - Search functionality

---

### Phase 2: Time Series Analysis (Week 3) - **BUILD NOW**

5. ✅ **2.3 Monthly Cost Trends**
   - FGRS and LOGI stacked area chart
   - 2019-2023 timeline
   - Cumulative overlay

6. ✅ **6.1 Project Progress Chart**
   - Plan vs Actual progress
   - 162 data points (2019-2023)
   - Milestone markers

7. ✅ **5.2 Subcontractor Monthly Trends**
   - Multi-line chart (3 subcontractors)
   - Invoice values over time
   - Toggle metrics (manhours, cost, progress)

---

### Phase 3: Advanced Analysis (Week 4) - **BUILD NOW**

8. ✅ **4.1 Variation Orders Chart**
   - Waterfall or bar chart
   - 12 VOs visualization
   - Link to amendments

9. ✅ **5.1 Subcontractor Cost Distribution**
   - Pie/donut chart
   - 3 subcontractors
   - Total invoice values

10. ⚠️ **2.1 Cost Breakdown (Simplified)**
    - Simple bar chart (3 categories)
    - Note: Will expand when full data available

---

### Phase 4: DEFERRED (Until Full Data Available)

11. ❌ **Deviation Heatmap** - Need complete category data
12. ❌ **Cost Discipline Breakdown** - Need discipline-level contract values
13. ❌ **Monthly POB Detail** - Current data too sparse
14. ❌ **Advanced Treemap** - Need more category data

---

## 🎯 Priority Ranking for POC

### 🔴 Must Build (Critical for Demo)
1. Contract Evolution Timeline (shows main story)
2. KPI Summary Cards (executive overview)
3. PAMF Claims Table (audit requirement)
4. Monthly Cost Trends (operational insight)

### 🟡 Should Build (Strong Value)
5. Project Progress Chart (timeline tracking)
6. Subcontractor Analysis (cost allocation)
7. Variation Orders (change management)
8. PAMF Distribution (breakdown view)

### 🟢 Nice to Have (Enhancement)
9. Cost Category Breakdown (limited data)
10. Additional drill-downs and filters

---

## 📊 Sample Chart Outputs with POC Data

### Contract Evolution
```
$16B ┤                                      ●─── AMD-5 ($14.5B)
     │                              ●─── AMD-4 ($11.8B)
$12B ┤                      ●─── AMD-3 ($9.6B)
     │              ●─── AMD-2 ($8.0B)
 $8B ┤      ●─── AMD-1 ($5.0B)
     │  ●─── ORIGINAL ($5.2B)
 $4B ┤
     │
 $0B ┴────────────────────────────────────
     2016  2017  2019  2020  2022  2024
```

### Monthly Cost Trends (2019-2023)
```
$100M ┤     ╱▀▀▀▀▀╲╱▀▀▀▀╲     FGRS (Cumulative)
      │   ╱         ╲    ╲
 $50M ┤ ╱             ╲    ╲   LOGI (Cumulative)
      │╱                 ╲   ╲
  $0M ┴────────────────────────────
      2019  2020  2021  2022  2023
```

### PAMF Distribution
```
COVID         ████████████████████ $90.1M (45 claims)
Discipline 2  ████████ $XX.XM
Discipline 3  ██████ $XX.XM
Discipline 4  ████ $XX.XM
```

---

## 🚀 Next Steps

### Immediate Actions:
1. ✅ Start Phase 1 implementation (4 core charts)
2. ✅ Setup Next.js + shadcn/ui project structure
3. ✅ Create database connection layer
4. ✅ Build reusable chart components

### Data Enhancement (Parallel Track):
1. ⚠️ Identify missing category mappings in contract_value
2. ⚠️ Validate POB data in monthly_pob table
3. ⚠️ Plan for full 4000+ PAMF data migration
4. ⚠️ Add discipline breakdown to contract values

### Documentation:
1. ✅ Create data dictionary for existing fields
2. ✅ Document known limitations
3. ✅ Define data quality metrics
4. ✅ Setup data validation rules

---

## 💡 Key Insights

### What Works Well:
✅ **Time Series Data** (2019-2023) - Excellent quality
✅ **Amendment Tracking** - Complete history
✅ **Subcontractor Data** - Rich and detailed (1,172 rows)
✅ **PAMF Structure** - Good hierarchical data (94 records)
✅ **Variation Orders** - Complete tracking (12 VOs)

### What Needs Enhancement:
⚠️ **Category Coverage** - Only 3/42 categories populated
⚠️ **POB Data** - Sparse in monthly_pob table
⚠️ **Discipline Mapping** - Need contract value by discipline
⚠️ **PAMF Completion** - 94 of 4000+ target

### Recommendations:
1. **Build MVP with available data** - Focus on 8-10 core charts
2. **Plan for scalability** - Design components for full data
3. **Document gaps** - Clear notes on data limitations
4. **Iterative approach** - Add charts as data becomes available

---

## 🎯 Success Metrics for POC

### Phase 1 (Core Dashboard)
- [ ] 4 KPI cards displaying key metrics
- [ ] Contract evolution chart (6 amendments)
- [ ] PAMF table with search/filter (94 records)
- [ ] Export functionality (PDF, Excel)

### Phase 2 (Time Series)
- [ ] Monthly cost trends (2019-2023)
- [ ] Project progress chart (Plan vs Actual)
- [ ] Subcontractor analysis (3 companies)

### Phase 3 (Advanced)
- [ ] Variation orders visualization
- [ ] Cost breakdown (limited categories)
- [ ] Interactive filters and drill-downs

### POC Demo Readiness:
- [ ] Responsive design (desktop + mobile)
- [ ] Fast load times (<2s)
- [ ] Error handling
- [ ] Professional styling
- [ ] Print-ready exports

---

**Document Status:** Complete
**Last Updated:** 2026-02-09
**Next Review:** After Phase 1 completion
**Contact:** Development Team
