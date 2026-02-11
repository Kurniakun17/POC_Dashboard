'use client'

/**
 * Global Filter Context
 *
 * Single source of truth for all dashboard filters.
 * All charts subscribe to relevant filters and re-fetch when they change.
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

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

interface FilterContextType {
  filters: FilterState
  updateYear: (year: number | null) => void
  updateDateRange: (start: Date | null, end: Date | null) => void
  updateAmendments: (ids: number[]) => void
  updateDisciplines: (ids: number[]) => void
  updateSubcontractors: (ids: number[]) => void
  clearFilters: () => void
  hasActiveFilters: boolean
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const DEFAULT_FILTERS: FilterState = {
  selectedYear: null,
  dateRange: { start: null, end: null },
  amendmentIds: [],
  disciplineIds: [],
  subcontractorIds: [],
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const updateYear = useCallback((year: number | null) => {
    setFilters((prev) => ({ ...prev, selectedYear: year }))
  }, [])

  const updateDateRange = useCallback((start: Date | null, end: Date | null) => {
    setFilters((prev) => ({ ...prev, dateRange: { start, end } }))
  }, [])

  const updateAmendments = useCallback((ids: number[]) => {
    setFilters((prev) => ({ ...prev, amendmentIds: ids }))
  }, [])

  const updateDisciplines = useCallback((ids: number[]) => {
    setFilters((prev) => ({ ...prev, disciplineIds: ids }))
  }, [])

  const updateSubcontractors = useCallback((ids: number[]) => {
    setFilters((prev) => ({ ...prev, subcontractorIds: ids }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      filters.selectedYear !== null ||
      filters.dateRange.start !== null ||
      filters.dateRange.end !== null ||
      filters.amendmentIds.length > 0 ||
      filters.disciplineIds.length > 0 ||
      filters.subcontractorIds.length > 0
    )
  }, [filters])

  const value = useMemo(
    () => ({
      filters,
      updateYear,
      updateDateRange,
      updateAmendments,
      updateDisciplines,
      updateSubcontractors,
      clearFilters,
      hasActiveFilters,
    }),
    [filters, updateYear, updateDateRange, updateAmendments, updateDisciplines, updateSubcontractors, clearFilters, hasActiveFilters]
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}

/**
 * Build query string from filter state for a specific chart's relevant filters
 */
export function buildFilterQuery(
  filters: FilterState,
  relevantKeys: Array<keyof FilterState>
): string {
  const params = new URLSearchParams()

  if (relevantKeys.includes('selectedYear') && filters.selectedYear !== null) {
    params.append('year', filters.selectedYear.toString())
  }
  if (relevantKeys.includes('dateRange')) {
    if (filters.dateRange.start) {
      params.append('startDate', filters.dateRange.start.toISOString().split('T')[0])
    }
    if (filters.dateRange.end) {
      params.append('endDate', filters.dateRange.end.toISOString().split('T')[0])
    }
  }
  if (relevantKeys.includes('amendmentIds') && filters.amendmentIds.length > 0) {
    params.append('amendmentIds', filters.amendmentIds.join(','))
  }
  if (relevantKeys.includes('disciplineIds') && filters.disciplineIds.length > 0) {
    params.append('disciplineIds', filters.disciplineIds.join(','))
  }
  if (relevantKeys.includes('subcontractorIds') && filters.subcontractorIds.length > 0) {
    params.append('subcontractorIds', filters.subcontractorIds.join(','))
  }

  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}
