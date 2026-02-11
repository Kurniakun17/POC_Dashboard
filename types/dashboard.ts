/**
 * TypeScript Interfaces for BP POC Dashboard
 *
 * Centralized type definitions for all chart data and API responses.
 */

// ============================================================================
// Filter Types
// ============================================================================

export interface FilterState {
  selectedYear: number | null
  dateRange: {
    start: Date | null
    end: Date | null
  }
  amendmentIds: number[]
  disciplineIds: number[]
  subcontractorIds: number[]
}

export interface FilterOptions {
  years: number[]
  amendments: { id: number; code: string }[]
  disciplines: { id: number; code: string; name: string }[]
  subcontractors: { id: number; name: string }[]
}

export interface VariationOrderItem {
  voNumber: string
  voName: string
  amountUsd: number
  status: string
  approvedInAmendment: number
  approvedDate: string | null
}

// ============================================================================
// Chart Data Types
// ============================================================================

export interface ContractEvolutionItem {
  amendmentCode: string
  amendmentName: string
  effectiveDate: string
  totalValue: number
  totalValueB: number
  lumpSum?: number
  reimbursable?: number
  provisional?: number
  backcharge?: number
}

export interface CostBreakdownData {
  costSplit: {
    lumpSum: number
    reimbursable: number
    provisional: number
    backcharge: number
    total: number
  }
  pamfByDiscipline: Array<{
    discipline: string
    claimAmount: number
    pamfCount: number
  }>
}

export interface MonthlyCostItem {
  year: number
  month: number
  date: string
  FGRS: number
  LOGI: number
}

export interface POBTimelineItem {
  year: number
  month: number
  date: string
  pobCount: number
  isolationCount: number
  remarks?: string
}

export interface ProgressCurveData {
  subcontractor: string
  monthlyProgress: Array<{
    year: number
    month: number
    date: string
    planProgress: number
    actualProgress: number
  }>
}

export interface PAMFAnalysisData {
  topCategories: Array<{
    category: string
    claimAmount: number
    pamfCount: number
  }>
  scatterData: Array<{
    discipline: string
    pamfCount: number
    totalClaim: number
    color: string
  }>
}

export interface EventMarker {
  eventCode: string
  eventName: string
  eventDate: string
  eventType: string
  description?: string
}

// ============================================================================
// Summary KPI Types
// ============================================================================

export interface SummaryData {
  totalContractValue: number
  originalContractValue: number
  growthPercent: number
  pamfCount: number
  amendmentCount: number
  subcontractorCount: number
  startDate: string
  endDate: string
  latestAmendment: string
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ============================================================================
// Chart Component Props
// ============================================================================

export interface BaseChartProps {
  height?: number
  loading?: boolean
  error?: string
  onDataClick?: (data: unknown) => void
}

export interface ContractEvolutionChartProps extends BaseChartProps {
  data: ContractEvolutionItem[]
}

export interface CostBreakdownChartProps extends BaseChartProps {
  data: CostBreakdownData
}

export interface MonthlyCostChartProps extends BaseChartProps {
  data: MonthlyCostItem[]
  events?: EventMarker[]
}

export interface POBTimelineChartProps extends BaseChartProps {
  data: POBTimelineItem[]
  events?: EventMarker[]
}

export interface ProgressCurvesChartProps extends BaseChartProps {
  data: ProgressCurveData[]
}

export interface PAMFAnalysisChartProps extends BaseChartProps {
  data: PAMFAnalysisData
}

// ============================================================================
// Filter Component Props
// ============================================================================

export interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void
  onClearFilters?: () => void
}

export interface DateRangeFilterProps {
  startDate: Date | null
  endDate: Date | null
  onChange: (start: Date | null, end: Date | null) => void
  presets?: Array<{
    label: string
    startDate: Date
    endDate: Date
  }>
}

export interface SelectFilterProps {
  value: number[]
  options: Array<{
    id: number
    label: string
  }>
  onChange: (value: number[]) => void
  placeholder?: string
  multiple?: boolean
}

// ============================================================================
// Utility Types
// ============================================================================

export type ChartColorKey =
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'purple'
  | 'yellow'
  | 'cyan'
  | 'pink'

export type CostCategory = 'Lump Sum' | 'Reimbursable' | 'Provisional' | 'Backcharge'

export type DisciplineName = 'SMT' | 'LOGISTIC' | 'COVID' | 'PMT'

export type AmendmentCode = 'ORIGINAL' | 'AMD-1' | 'AMD-2' | 'AMD-3' | 'AMD-4' | 'AMD-5'

export type EventType = 'COVID' | 'MILESTONE' | 'CHANGE_ORDER' | 'DELAY'

// ============================================================================
// Recharts Custom Tooltip Types
// ============================================================================

export interface CustomTooltipPayload<T = unknown> {
  name: string
  value: number
  dataKey: string
  color: string
  payload: T
}

export interface CustomTooltipProps<T = unknown> {
  active?: boolean
  payload?: CustomTooltipPayload<T>[]
  label?: string
}
