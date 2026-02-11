'use client'

import { useEffect, useState } from 'react'
import {
  Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer,
  Tooltip, XAxis, YAxis, ReferenceArea,
} from 'recharts'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { useFilters, buildFilterQuery } from '@/lib/filter-context'
import { CHART_COLORS_HEX } from '@/lib/chart-colors'
import { Card } from '@/components/ui/card'
import { t } from '@/lib/translations'

interface POBData {
  year: number
  month: number
  date: string
  pobCount: number
  isolationCount: number
}

export function POBTimelineChart() {
  const { filters } = useFilters()
  const [data, setData] = useState<POBData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = buildFilterQuery(filters, ['selectedYear', 'dateRange'])
    setLoading(true)
    fetch(`/api/bp/pob-timeline${query}`)
      .then((res) => res.json())
      .then((d) => { setData(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => { setData([]); setLoading(false) })
  }, [filters.selectedYear, filters.dateRange.start?.toISOString(), filters.dateRange.end?.toISOString()])

  if (loading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <div className="text-sm text-muted-foreground animate-pulse">{t('Loading chart...')}</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <div className="text-sm text-muted-foreground">{t('No data available')}</div>
      </div>
    )
  }

  const formatDate = (value: string) => {
    const [y, m] = value.split('-')
    return format(new Date(parseInt(y), parseInt(m) - 1), 'MMM yy', { locale: idLocale })
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPOB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS_HEX.blue} stopOpacity={0.7} />
              <stop offset="95%" stopColor={CHART_COLORS_HEX.blue} stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorIsolation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS_HEX.orange} stopOpacity={0.7} />
              <stop offset="95%" stopColor={CHART_COLORS_HEX.orange} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            tickFormatter={formatDate}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <ReferenceArea
            x1="2020-03" x2="2021-06"
            fill={CHART_COLORS_HEX.red} fillOpacity={0.08}
            label={{ value: t('COVID Wave 1'), position: 'top', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <ReferenceArea
            x1="2021-06" x2="2022-01"
            fill={CHART_COLORS_HEX.orange} fillOpacity={0.08}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload as POBData
                return (
                  <Card className="p-3 shadow-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      {format(new Date(d.year, d.month - 1), 'MMMM yyyy', { locale: idLocale })}
                    </p>
                    <p className="text-sm font-bold">{t('POB Count')}: {d.pobCount}</p>
                    <p className="text-sm">{t('Isolation Count')}: {d.isolationCount}</p>
                  </Card>
                )
              }
              return null
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Area
            type="monotone" dataKey="pobCount" name={t('POB (CSTS+SubCon)')}
            stroke={CHART_COLORS_HEX.blue} strokeWidth={2}
            fillOpacity={1} fill="url(#colorPOB)"
          />
          <Area
            type="monotone" dataKey="isolationCount" name={t('Isolation Facility')}
            stroke={CHART_COLORS_HEX.orange} strokeWidth={2}
            fillOpacity={1} fill="url(#colorIsolation)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
