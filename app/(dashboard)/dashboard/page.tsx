'use client'

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { FilterBar } from '@/components/filters/filter-bar'
import { DashboardCharts } from '@/components/dashboard/dashboard-charts'
import { KPISummaryCards } from '@/components/charts/kpi-summary-cards'
import { t } from '@/lib/translations'

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b pb-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{t('BP Tangguh TEP Dashboard')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('Package Level Cost (PLK) Review 2026')}
            </p>
          </div>
        </div>

        {/* Unified Filter Bar */}
        <FilterBar />
      </div>

      {/* KPI Summary Cards */}
      <KPISummaryCards />

      {/* Tabbed Chart Layout */}
      <DashboardCharts />
    </div>
  )
}
