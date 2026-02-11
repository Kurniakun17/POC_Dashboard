/**
 * Centralized Chart Color System
 *
 * Provides consistent colors across all charts in the BP Dashboard.
 * Colors are defined using CSS variables for theme support (light/dark mode).
 */

export const CHART_COLORS = {
  blue: 'hsl(var(--chart-blue))',
  green: 'hsl(var(--chart-green))',
  orange: 'hsl(var(--chart-orange))',
  red: 'hsl(var(--chart-red))',
  purple: 'hsl(var(--chart-purple))',
  yellow: 'hsl(var(--chart-yellow))',
  cyan: 'hsl(var(--chart-cyan))',
  pink: 'hsl(var(--chart-pink))',
} as const

// Raw hex colors for Recharts - Soft pastel BP colors
export const CHART_COLORS_HEX = {
  blue: '#6B9BD1',      // Soft blue
  green: '#7FBF7F',     // Soft green
  orange: '#F4A460',    // Soft orange
  red: '#E69A9A',       // Soft red
  purple: '#B595C7',    // Soft purple
  yellow: '#F5E17D',    // Soft yellow
  cyan: '#7FC7D9',      // Soft cyan
  pink: '#F0A6CA',      // Soft pink
} as const

// Contract value categories
export const CATEGORY_COLORS = {
  'Lump Sum': CHART_COLORS.blue,
  'Reimbursable': CHART_COLORS.green,
  'Provisional': CHART_COLORS.orange,
  'Backcharge': CHART_COLORS.red,
} as const

export const CATEGORY_COLORS_HEX = {
  'Lump Sum': CHART_COLORS_HEX.blue,
  'Reimbursable': CHART_COLORS_HEX.green,
  'Provisional': CHART_COLORS_HEX.orange,
  'Backcharge': CHART_COLORS_HEX.red,
} as const

// PAMF disciplines
export const DISCIPLINE_COLORS = {
  'SMT': CHART_COLORS.orange,
  'LOGISTIC': CHART_COLORS.blue,
  'COVID': CHART_COLORS.red,
  'PMT': CHART_COLORS.green,
} as const

export const DISCIPLINE_COLORS_HEX = {
  'SMT': CHART_COLORS_HEX.orange,
  'LOGISTIC': CHART_COLORS_HEX.blue,
  'COVID': CHART_COLORS_HEX.red,
  'PMT': CHART_COLORS_HEX.green,
} as const

// Amendment colors (progression)
export const AMENDMENT_COLORS = [
  CHART_COLORS_HEX.blue,    // ORIGINAL
  CHART_COLORS_HEX.cyan,    // AMD-1
  CHART_COLORS_HEX.green,   // AMD-2
  CHART_COLORS_HEX.orange,  // AMD-3
  CHART_COLORS_HEX.red,     // AMD-4
  CHART_COLORS_HEX.purple,  // AMD-5
] as const

// Chart palette for multi-series charts
export const CHART_PALETTE = [
  CHART_COLORS_HEX.blue,
  CHART_COLORS_HEX.green,
  CHART_COLORS_HEX.orange,
  CHART_COLORS_HEX.red,
  CHART_COLORS_HEX.purple,
  CHART_COLORS_HEX.yellow,
  CHART_COLORS_HEX.cyan,
  CHART_COLORS_HEX.pink,
] as const

// Status colors
export const STATUS_COLORS = {
  success: CHART_COLORS.green,
  warning: CHART_COLORS.orange,
  danger: CHART_COLORS.red,
  info: CHART_COLORS.blue,
} as const

export const STATUS_COLORS_HEX = {
  success: CHART_COLORS_HEX.green,
  warning: CHART_COLORS_HEX.orange,
  danger: CHART_COLORS_HEX.red,
  info: CHART_COLORS_HEX.blue,
} as const

/**
 * Get color by discipline name
 */
export function getDisciplineColor(discipline: string): string {
  const key = discipline.toUpperCase() as keyof typeof DISCIPLINE_COLORS_HEX
  return DISCIPLINE_COLORS_HEX[key] || CHART_COLORS_HEX.blue
}

/**
 * Get color by category name
 */
export function getCategoryColor(category: string): string {
  const key = category as keyof typeof CATEGORY_COLORS_HEX
  return CATEGORY_COLORS_HEX[key] || CHART_COLORS_HEX.blue
}

/**
 * Get color based on value comparison (green if good, orange if behind)
 */
export function getProgressColor(actual: number, plan: number): string {
  return actual >= plan ? CHART_COLORS_HEX.green : CHART_COLORS_HEX.orange
}
