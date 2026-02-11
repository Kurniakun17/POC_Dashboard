'use client'

import { useEffect, useState } from 'react'
import { useFilters, buildFilterQuery } from '@/lib/filter-context'
import { CHART_COLORS_HEX } from '@/lib/chart-colors'
import { t } from '@/lib/translations'
import { MonthlyCostArea } from './monthly-cost-area'

interface MonthlyCostData {
  year: number
  month: number
  date: string
  FGRS: number
  LOGI: number
}

export function MonthlyCostChart() {
  const { filters } = useFilters()
  const [data, setData] = useState<MonthlyCostData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = buildFilterQuery(filters, ['selectedYear', 'dateRange'])
    setLoading(true)
    fetch(`/api/bp/monthly-cost${query}`)
      .then((res) => res.json())
      .then((d) => {
        setData(Array.isArray(d) ? d : [])
        setLoading(false)
      })
      .catch(() => { setData([]); setLoading(false) })
  }, [filters.selectedYear, filters.dateRange.start?.toISOString(), filters.dateRange.end?.toISOString()])

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-sm text-muted-foreground animate-pulse">{t('Loading chart...')}</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-sm text-muted-foreground">{t('No data available')}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <MonthlyCostArea
        data={data}
        dataKey="FGRS"
        title={`FGRS RCE ${t('Monthly')} Cost (MUSD)`}
        gradientId="colorFGRS"
        color={CHART_COLORS_HEX.blue}
      />
      <MonthlyCostArea
        data={data}
        dataKey="LOGI"
        title="LOGI RCE Cost (MUSD)"
        gradientId="colorLOGI"
        color={CHART_COLORS_HEX.green}
      />
    </div>
  )
}
