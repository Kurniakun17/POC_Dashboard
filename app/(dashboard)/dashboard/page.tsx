import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KPISummaryCards } from "@/components/charts/kpi-summary-cards"
import { ContractEvolutionChart } from "@/components/charts/contract-evolution-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <div>
          <h1 className="text-lg font-semibold">BP Tangguh TEP Dashboard</h1>
          <p className="text-sm text-muted-foreground">Package Level Cost (PLK) Review 2026</p>
        </div>
      </div>

      {/* KPI Cards */}
      <KPISummaryCards />

      {/* Contract Evolution Chart */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Contract Evolution Timeline</CardTitle>
          <CardDescription>
            Contract value progression from Original (2016) to AMD-5 (2024)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContractEvolutionChart />
        </CardContent>
      </Card>

      {/* Placeholder for more charts */}
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-sm font-medium text-muted-foreground">More charts coming soon</p>
        <p className="text-xs text-muted-foreground mt-1">
          Monthly Cost Trends • PAMF Analysis • Variation Orders • Progress Tracking
        </p>
      </div>
    </div>
  )
}
