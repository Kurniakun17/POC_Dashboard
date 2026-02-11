'use client'

import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts'
import { format } from 'date-fns'
import { useFilters, buildFilterQuery } from '@/lib/filter-context'
import { CHART_COLORS_HEX } from '@/lib/chart-colors'

interface ContractEvolutionData {
  amendmentCode: string
  amendmentName: string
  effectiveDate: string
  totalValue: number
  totalValueB: number
}

export function ContractEvolutionChart() {
  const { filters } = useFilters()
  const [data, setData] = useState<ContractEvolutionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = buildFilterQuery(filters, ['amendmentIds', 'dateRange'])
    setLoading(true)
    fetch(`/api/bp/contract-evolution${query}`)
      .then((res) => res.json())
      .then((d) => {
        setData(Array.isArray(d) ? d : [])
        setLoading(false)
      })
      .catch(() => { setData([]); setLoading(false) })
  }, [filters.amendmentIds.join(','), filters.dateRange.start?.toISOString(), filters.dateRange.end?.toISOString()])

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="text-sm text-muted-foreground animate-pulse">Loading chart...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="text-sm text-muted-foreground">No data available</div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS_HEX.blue} stopOpacity={0.8} />
            <stop offset="95%" stopColor={CHART_COLORS_HEX.blue} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="amendmentCode"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          tickFormatter={(value) => `$${value.toFixed(1)}B`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload as ContractEvolutionData
              return (
                <div className="rounded-lg border bg-background p-3 shadow-md">
                  <div className="text-sm font-medium">{d.amendmentCode}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {format(new Date(d.effectiveDate), 'MMM d, yyyy')}
                  </div>
                  <div className="text-lg font-bold text-primary">${d.totalValueB.toFixed(2)}B</div>
                  <div className="text-xs text-muted-foreground">
                    (${(d.totalValue / 1_000_000).toFixed(0)}M)
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} formatter={() => 'Contract Value'} />
        <Area
          type="monotone"
          dataKey="totalValueB"
          stroke={CHART_COLORS_HEX.blue}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
