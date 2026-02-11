'use client'

import {
  Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer,
  Tooltip, XAxis, YAxis, ReferenceArea,
} from 'recharts'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { Card } from '@/components/ui/card'
import { CHART_COLORS_HEX } from '@/lib/chart-colors'
import { t } from '@/lib/translations'

interface MonthlyCostData {
  year: number; month: number; date: string; FGRS: number; LOGI: number
}

interface MonthlyCostAreaProps {
  data: MonthlyCostData[]
  dataKey: 'FGRS' | 'LOGI'
  title: string
  gradientId: string
  color: string
}

const formatDate = (value: string) => {
  const [y, m] = value.split('-')
  return format(new Date(parseInt(y), parseInt(m) - 1), 'MMM yy', { locale: idLocale })
}

export function MonthlyCostArea({ data, dataKey, title, gradientId, color }: MonthlyCostAreaProps) {
  const legendLabel = dataKey === 'FGRS' ? 'FGRS RCE' : 'LOGI RCE'

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            tickFormatter={formatDate}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(v) => `$${v}M`}
          />
          <ReferenceArea
            x1="2020-03" x2="2021-06"
            fill={CHART_COLORS_HEX.red} fillOpacity={0.1}
            label={{ value: t('COVID Wave 1'), position: 'top', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <ReferenceArea
            x1="2021-06" x2="2022-01"
            fill={CHART_COLORS_HEX.orange} fillOpacity={0.1}
            label={dataKey === 'FGRS' ? { value: t('Delta Outbreak'), position: 'top', fill: 'hsl(var(--muted-foreground))', fontSize: 10 } : undefined}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload as MonthlyCostData
                return (
                  <Card className="p-3 shadow-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      {format(new Date(d.year, d.month - 1), 'MMMM yyyy', { locale: idLocale })}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ${d[dataKey].toFixed(1)} MUSD
                    </p>
                  </Card>
                )
              }
              return null
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} formatter={() => legendLabel} />
          <Area
            type="monotone" dataKey={dataKey}
            stroke={color} strokeWidth={2}
            fillOpacity={1} fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
