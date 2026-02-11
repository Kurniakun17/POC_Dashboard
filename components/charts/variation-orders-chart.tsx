'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useFilters, buildFilterQuery } from '@/lib/filter-context'
import { CHART_COLORS_HEX } from '@/lib/chart-colors'
import { Badge } from '@/components/ui/badge'
import { t } from '@/lib/translations'

interface VariationOrder {
  voNumber: string
  voName: string
  amountUsd: number
  status: string
  approvedInAmendment: number
  approvedDate: string | null
}

const STATUS_COLORS: Record<string, string> = {
  Approved: CHART_COLORS_HEX.green,
  approved: CHART_COLORS_HEX.green,
  Pending: CHART_COLORS_HEX.orange,
  pending: CHART_COLORS_HEX.orange,
  Rejected: CHART_COLORS_HEX.red,
  rejected: CHART_COLORS_HEX.red,
}

export function VariationOrdersChart() {
  const { filters } = useFilters()
  const [data, setData] = useState<VariationOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = buildFilterQuery(filters, ['amendmentIds', 'dateRange'])
    setLoading(true)
    fetch(`/api/bp/variation-orders${query}`)
      .then((res) => res.json())
      .then((d) => { setData(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => { setData([]); setLoading(false) })
  }, [filters.amendmentIds.join(','), filters.dateRange.start?.toISOString(), filters.dateRange.end?.toISOString()])

  if (loading) {
    return <div className="h-[400px] flex items-center justify-center animate-pulse">Loading...</div>
  }

  if (data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-sm text-muted-foreground">{t('No data available')}</div>
      </div>
    )
  }

  const totalCount = data.length
  const approvedCount = data.filter((v) => v.status.toLowerCase() === 'approved').length
  const totalValue = data.reduce((s, v) => s + v.amountUsd, 0)
  const approvedValue = data
    .filter((v) => v.status.toLowerCase() === 'approved')
    .reduce((s, v) => s + v.amountUsd, 0)

  // Show top 20 VOs by amount
  const chartData = [...data]
    .sort((a, b) => b.amountUsd - a.amountUsd)
    .slice(0, 20)
    .map((v) => ({
      ...v,
      label: v.voNumber.length > 15 ? v.voNumber.slice(0, 15) + '...' : v.voNumber,
    }))

  return (
    <div className="space-y-4">
      {/* Summary badges */}
      <div className="flex items-center gap-3 flex-wrap">
        <Badge variant="outline" className="text-xs">
          {t('Total')}: {totalCount} VOs
        </Badge>
        <Badge variant="outline" className="text-xs" style={{ borderColor: CHART_COLORS_HEX.green }}>
          {t('Completed')}: {approvedCount}
        </Badge>
        <Badge variant="outline" className="text-xs">
          Value: ${(totalValue / 1_000_000).toFixed(1)}M
        </Badge>
        <Badge variant="outline" className="text-xs" style={{ borderColor: CHART_COLORS_HEX.green }}>
          Approved: ${(approvedValue / 1_000_000).toFixed(1)}M
        </Badge>
      </div>

      {/* Horizontal bar chart */}
      <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 28)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
          <XAxis type="number" tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
          <YAxis
            dataKey="label" type="category" width={100}
            style={{ fontSize: 10 }}
          />
          <Tooltip
            formatter={(value) => `$${(Number(value) / 1_000_000).toFixed(2)}M`}
            labelFormatter={(label) => {
              const vo = chartData.find((v) => v.label === label)
              return vo ? `${vo.voNumber}: ${vo.voName}` : label
            }}
          />
          <Bar dataKey="amountUsd" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={STATUS_COLORS[entry.status] || CHART_COLORS_HEX.blue}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
