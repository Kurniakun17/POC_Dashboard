'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'
import { useFilters, buildFilterQuery } from '@/lib/filter-context'
import { CHART_COLORS_HEX } from '@/lib/chart-colors'

interface PAMFAnalysisData {
  topCategories: Array<{ category: string; claimAmount: number; pamfCount: number }>
  scatterData: Array<{ discipline: string; pamfCount: number; totalClaim: number; color: string }>
}

export function PAMFAnalysisChart() {
  const { filters } = useFilters()
  const [data, setData] = useState<PAMFAnalysisData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = buildFilterQuery(filters, ['disciplineIds'])
    setLoading(true)
    fetch(`/api/bp/pamf-analysis${query}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [filters.disciplineIds.join(',')])

  if (loading || !data) {
    return <div className="h-[400px] flex items-center justify-center animate-pulse">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Top 15 PAMF Claim Categories</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.topCategories} layout="vertical" margin={{ left: 120 }}>
            <XAxis type="number" tickFormatter={(v) => `$${v / 1_000_000}M`} />
            <YAxis dataKey="category" type="category" width={120} style={{ fontSize: 10 }} />
            <Tooltip formatter={(value) => `$${(Number(value) / 1_000_000).toFixed(1)}M`} />
            <Bar dataKey="claimAmount" fill={CHART_COLORS_HEX.orange} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">PAMF: Claim Count vs Amount</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="pamfCount" name="PAMF Count" />
            <YAxis dataKey="totalClaim" name="Total Claim" tickFormatter={(v) => `$${v / 1_000_000}M`} />
            <ZAxis range={[400, 2000]} />
            <Tooltip
              formatter={(value, name) =>
                name === 'totalClaim' ? `$${(Number(value) / 1_000_000).toFixed(1)}M` : value
              }
            />
            <Scatter data={data.scatterData} fill={CHART_COLORS_HEX.blue} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
