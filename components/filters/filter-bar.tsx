'use client'

import { useEffect, useState } from 'react'
import { useFilters } from '@/lib/filter-context'
import { MultiSelectFilter } from './multi-select-filter'
import { DateRangeFilter } from './date-range-filter'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, SlidersHorizontal } from 'lucide-react'
import { t } from '@/lib/translations'

interface FilterOptions {
  years: number[]
  amendments: { id: number; code: string }[]
  disciplines: { id: number; code: string; name: string }[]
  subcontractors: { id: number; name: string }[]
}

export function FilterBar() {
  const {
    filters, updateYear, updateDateRange,
    updateAmendments, updateDisciplines, updateSubcontractors,
    clearFilters, hasActiveFilters,
  } = useFilters()
  const [options, setOptions] = useState<FilterOptions | null>(null)

  useEffect(() => {
    fetch('/api/bp/filter-options')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setOptions(data)
      })
      .catch(console.error)
  }, [])

  if (!options) {
    return (
      <div className="flex items-center gap-2 h-8">
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  const activeCount = [
    filters.selectedYear !== null,
    filters.amendmentIds.length > 0,
    filters.disciplineIds.length > 0,
    filters.subcontractorIds.length > 0,
    filters.dateRange.start !== null,
  ].filter(Boolean).length

  return (
    <div className="filter-bar flex flex-col gap-2">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{t('Filters')}</span>
        </div>

        {/* Year Select */}
        <Select
          value={filters.selectedYear?.toString() ?? 'all'}
          onValueChange={(v) => updateYear(v === 'all' ? null : parseInt(v))}
        >
          <SelectTrigger size="sm" className="h-8 min-w-[110px] text-xs">
            <SelectValue placeholder={t('All')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('All')} Years</SelectItem>
            {options.years.map((y) => (
              <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Amendment Multi-select */}
        <MultiSelectFilter
          label="Amendment"
          options={options.amendments.map((a) => ({ id: a.id, label: a.code }))}
          selected={filters.amendmentIds}
          onChange={updateAmendments}
        />

        {/* Discipline Multi-select */}
        <MultiSelectFilter
          label="Discipline"
          options={options.disciplines.map((d) => ({ id: d.id, label: d.name }))}
          selected={filters.disciplineIds}
          onChange={updateDisciplines}
        />

        {/* Subcontractor Multi-select */}
        <MultiSelectFilter
          label="Subcontractor"
          options={options.subcontractors.map((s) => ({ id: s.id, label: s.name }))}
          selected={filters.subcontractorIds}
          onChange={updateSubcontractors}
        />

        {/* Date Range */}
        <DateRangeFilter
          start={filters.dateRange.start}
          end={filters.dateRange.end}
          onChange={updateDateRange}
        />

        {/* Clear All */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
            <X className="h-3 w-3 mr-1" />
            {t('Clear All')}
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Active:</span>
          {filters.selectedYear !== null && (
            <Badge variant="secondary" className="text-[10px] h-5 gap-1">
              {filters.selectedYear}
              <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => updateYear(null)} />
            </Badge>
          )}
          {filters.amendmentIds.length > 0 && (
            <Badge variant="secondary" className="text-[10px] h-5 gap-1">
              {filters.amendmentIds.length} {t('Amendment')}
              <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => updateAmendments([])} />
            </Badge>
          )}
          {filters.disciplineIds.length > 0 && (
            <Badge variant="secondary" className="text-[10px] h-5 gap-1">
              {filters.disciplineIds.length} {t('Discipline')}
              <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => updateDisciplines([])} />
            </Badge>
          )}
          {filters.subcontractorIds.length > 0 && (
            <Badge variant="secondary" className="text-[10px] h-5 gap-1">
              {filters.subcontractorIds.length} {t('Subcontractor')}
              <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => updateSubcontractors([])} />
            </Badge>
          )}
          {filters.dateRange.start && (
            <Badge variant="secondary" className="text-[10px] h-5 gap-1">
              {t('Date Range')}
              <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => updateDateRange(null, null)} />
            </Badge>
          )}
          {activeCount > 0 && (
            <span className="text-[10px] text-muted-foreground ml-1">
              ({activeCount} filter{activeCount > 1 ? 's' : ''})
            </span>
          )}
        </div>
      )}
    </div>
  )
}
