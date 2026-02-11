'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, CartesianGrid, Legend, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { useFilters, buildFilterQuery } from '@/lib/filter-context'
import { CHART_PALETTE } from '@/lib/chart-colors'
import { Card } from '@/components/ui/card'
import { t } from '@/lib/translations'

interface ProgressData {
  subcontractor: string
  monthlyProgress: Array<{
    year: number; month: number; date: string
    planProgress: number; actualProgress: number
  }>
}

interface FlatPoint {
  date: string
  year: number
  month: number
  [key: string]: number | string
}

export function ProjectProgressChart() {
  const { filters } = useFilters()
  const [data, setData] = useState<ProgressData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = buildFilterQuery(filters, ['selectedYear', 'subcontractorIds', 'dateRange'])
    setLoading(true)
    fetch(`/api/bp/project-progress${query}`)
      .then((res) => res.json())
      .then((d) => { setData(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => { setData([]); setLoading(false) })
  }, [filters.selectedYear, filters.subcontractorIds.join(','), filters.dateRange.start?.toISOString(), filters.dateRange.end?.toISOString()])

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

  // Flatten data for recharts: one row per date, columns per subcontractor
  const dateMap: Record<string, FlatPoint> = {}
  data.forEach((sub, idx) => {
    sub.monthlyProgress.forEach((p) => {
      if (!dateMap[p.date]) {
        dateMap[p.date] = { date: p.date, year: p.year, month: p.month }
      }
      dateMap[p.date][`actual_${idx}`] = p.actualProgress
      dateMap[p.date][`plan_${idx}`] = p.planProgress
    })
  })
  const flatData = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={flatData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickFormatter={(v) => {
            const [y, m] = v.split('-')
            return format(new Date(parseInt(y), parseInt(m) - 1), 'MMM yy', { locale: idLocale })
          }}
        />
        <YAxis
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const point = payload[0].payload as FlatPoint
              return (
                <Card className="p-3 shadow-lg">
                  <p className="text-xs text-muted-foreground mb-2">
                    {format(new Date(Number(point.year), Number(point.month) - 1), 'MMMM yyyy', { locale: idLocale })}
                  </p>
                  {payload.map((p, i) => (
                    <p key={i} className="text-xs" style={{ color: p.color }}>
                      {p.name}: {Number(p.value).toFixed(1)}%
                    </p>
                  ))}
                </Card>
              )
            }
            return null
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        {data.map((sub, idx) => (
          <Line
            key={`plan_${idx}`}
            type="monotone"
            dataKey={`plan_${idx}`}
            name={`${sub.subcontractor} (${t('Plan')})`}
            stroke={CHART_PALETTE[idx % CHART_PALETTE.length]}
            strokeDasharray="5 5"
            strokeWidth={1.5}
            dot={false}
          />
        ))}
        {data.map((sub, idx) => (
          <Line
            key={`actual_${idx}`}
            type="monotone"
            dataKey={`actual_${idx}`}
            name={`${sub.subcontractor} (${t('Actual')})`}
            stroke={CHART_PALETTE[idx % CHART_PALETTE.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
