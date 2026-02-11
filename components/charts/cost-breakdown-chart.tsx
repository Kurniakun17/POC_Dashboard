'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useFilters, buildFilterQuery } from '@/lib/filter-context'
import { CHART_COLORS_HEX } from '@/lib/chart-colors'

interface CostBreakdownData {
  costSplit: {
    lumpSum: number; reimbursable: number; provisional: number; backcharge: number; total: number
  }
  pamfByDiscipline: Array<{ discipline: string; claimAmount: number; pamfCount: number }>
}

export function CostBreakdownChart() {
  const { filters } = useFilters()
  const [data, setData] = useState<CostBreakdownData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = buildFilterQuery(filters, ['disciplineIds'])
    setLoading(true)
    fetch(`/api/bp/cost-breakdown${query}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [filters.disciplineIds.join(',')])

  if (loading || !data) {
    return <div className="h-[350px] flex items-center justify-center animate-pulse">Loading...</div>
  }

  const total = data.costSplit.total || 1
  const pieData = [
    { name: 'Lump Sum', value: data.costSplit.lumpSum, color: CHART_COLORS_HEX.blue },
    { name: 'Reimbursable', value: data.costSplit.reimbursable, color: CHART_COLORS_HEX.green },
    { name: 'Provisional', value: data.costSplit.provisional, color: CHART_COLORS_HEX.orange },
    { name: 'Backcharge', value: data.costSplit.backcharge, color: CHART_COLORS_HEX.red },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium mb-3">
          Cost Split (${(total / 1_000_000_000).toFixed(2)}B)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${(Number(value) / 1_000_000_000).toFixed(2)}B`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">PAMF Claims by Discipline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.pamfByDiscipline} layout="vertical">
            <XAxis type="number" tickFormatter={(v) => `$${v / 1_000_000}M`} />
            <YAxis dataKey="discipline" type="category" width={80} />
            <Tooltip formatter={(value) => `$${(Number(value) / 1_000_000).toFixed(1)}M`} />
            <Bar dataKey="claimAmount" fill={CHART_COLORS_HEX.orange} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
