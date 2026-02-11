/**
 * Chart Utility Functions
 *
 * Reusable formatting and calculation functions for charts in BP POC Dashboard.
 */

import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { CHART_COLORS_HEX } from './chart-colors'

/**
 * Format currency with optional compact notation
 * @param value - Number to format
 * @param compact - Use compact notation (K, M, B)
 * @param currency - Currency code (default: USD)
 */
export function formatCurrency(
  value: number,
  compact = false,
  currency = 'USD'
): string {
  if (compact) {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`
    }
    if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}K`
    }
    return `$${value.toFixed(0)}`
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format number with thousand separators (Indonesian locale)
 * @param value - Number to format
 * @param decimals - Number of decimal places
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Format date in Indonesian locale
 * @param date - Date string or Date object
 * @param formatStr - Date format (default: 'long')
 */
export function formatDate(
  date: string | Date,
  formatStr: 'short' | 'medium' | 'long' = 'long'
): string {
  const d = typeof date === 'string' ? new Date(date) : date

  const formats = {
    short: 'MMM yyyy',      // Jan 2024
    medium: 'd MMM yyyy',   // 15 Jan 2024
    long: 'd MMMM yyyy',    // 15 Januari 2024
  }

  return format(d, formats[formatStr], { locale: idLocale })
}

/**
 * Format month-year from year and month numbers
 * @param year - Year number (e.g., 2024)
 * @param month - Month number (1-12)
 */
export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month - 1, 1)
  return format(date, 'MMM yyyy', { locale: idLocale })
}

/**
 * Format percentage
 * @param value - Number to format as percentage
 * @param decimals - Number of decimal places
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Get color based on value comparison (performance indicator)
 * @param actual - Actual value
 * @param plan - Planned value
 * @param reverse - Reverse logic (lower is better)
 */
export function getPerformanceColor(
  actual: number,
  plan: number,
  reverse = false
): string {
  const isGood = reverse ? actual < plan : actual >= plan
  return isGood ? CHART_COLORS_HEX.green : CHART_COLORS_HEX.orange
}

/**
 * Calculate percentage change
 * @param current - Current value
 * @param previous - Previous value
 */
export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

/**
 * Convert number to billions for chart display
 * @param value - Number in full value
 */
export function toBillions(value: number): number {
  return value / 1_000_000_000
}

/**
 * Convert number to millions for chart display
 * @param value - Number in full value
 */
export function toMillions(value: number): number {
  return value / 1_000_000
}

/**
 * Get abbreviated unit label
 * @param value - Number to check
 */
export function getUnitLabel(value: number): string {
  if (value >= 1_000_000_000) return 'B'
  if (value >= 1_000_000) return 'M'
  if (value >= 1_000) return 'K'
  return ''
}

/**
 * Format Y-axis tick for currency charts
 * @param value - Tick value
 */
export function formatYAxisCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return `$${value}`
}

/**
 * Aggregate array of numbers
 * @param values - Array of numbers
 * @param operation - Aggregation operation
 */
export function aggregate(
  values: number[],
  operation: 'sum' | 'avg' | 'min' | 'max' = 'sum'
): number {
  if (values.length === 0) return 0

  switch (operation) {
    case 'sum':
      return values.reduce((acc, val) => acc + val, 0)
    case 'avg':
      return values.reduce((acc, val) => acc + val, 0) / values.length
    case 'min':
      return Math.min(...values)
    case 'max':
      return Math.max(...values)
    default:
      return 0
  }
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

/**
 * Debounce function for filter updates
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Generate date range for filters
 * @param startYear - Start year
 * @param endYear - End year
 */
export function generateMonthRange(
  startYear: number,
  endYear: number
): Array<{ year: number; month: number; label: string }> {
  const range: Array<{ year: number; month: number; label: string }> = []

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === endYear && month > new Date().getMonth() + 1) break

      range.push({
        year,
        month,
        label: formatMonthYear(year, month),
      })
    }
  }

  return range
}
