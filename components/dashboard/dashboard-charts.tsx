'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartCard } from './chart-card'
import { ContractEvolutionChart } from '@/components/charts/contract-evolution-chart'
import { MonthlyCostChart } from '@/components/charts/monthly-cost-chart'
import { CostBreakdownChart } from '@/components/charts/cost-breakdown-chart'
import { PAMFAnalysisChart } from '@/components/charts/pamf-analysis-chart'
import { POBTimelineChart } from '@/components/charts/pob-timeline-chart'
import { ProjectProgressChart } from '@/components/charts/project-progress-chart'
import { VariationOrdersChart } from '@/components/charts/variation-orders-chart'
import { t } from '@/lib/translations'

export function DashboardCharts() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
        <TabsTrigger value="overview">{t('Overview')}</TabsTrigger>
        <TabsTrigger value="cost">{t('Cost Analysis')}</TabsTrigger>
        <TabsTrigger value="operations">{t('Operations')}</TabsTrigger>
        <TabsTrigger value="pamf">PAMF & VO</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard
            title={t('Contract Evolution Timeline')}
            description={t('Contract value progression from Original (2016) to AMD-5 (2024)')}
          >
            <ContractEvolutionChart />
          </ChartCard>
          <ChartCard
            title={t('Monthly Cost Trends')}
            description="FGRS & LOGI RCE monthly cost with COVID impact overlay"
          >
            <MonthlyCostChart />
          </ChartCard>
        </div>
      </TabsContent>

      <TabsContent value="cost" className="space-y-4">
        <ChartCard
          title={t('Cost Breakdown')}
          description="AMD-5 cost composition and PAMF claims per discipline"
        >
          <CostBreakdownChart />
        </ChartCard>
        <ChartCard
          title="Variation Orders"
          description="Change orders by status and approved amendment"
        >
          <VariationOrdersChart />
        </ChartCard>
      </TabsContent>

      <TabsContent value="operations" className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard
            title={t('POB Timeline')}
            description={t('Monthly Personnel on Board (POB)')}
          >
            <POBTimelineChart />
          </ChartCard>
          <ChartCard
            title={t('Subcontractor Progress')}
            description="Plan vs actual progress curves by subcontractor"
          >
            <ProjectProgressChart />
          </ChartCard>
        </div>
      </TabsContent>

      <TabsContent value="pamf" className="space-y-4">
        <ChartCard
          title={t('PAMF Analysis')}
          description={t('Top 15 PAMF Claim Categories')}
        >
          <PAMFAnalysisChart />
        </ChartCard>
      </TabsContent>
    </Tabs>
  )
}
