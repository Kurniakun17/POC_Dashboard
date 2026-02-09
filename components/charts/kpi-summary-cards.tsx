'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, FileText, GitBranch, Users, Calendar, DollarSign } from 'lucide-react'

interface SummaryData {
  totalContractValue: number
  originalContractValue: number
  growthPercent: number
  pamfCount: number
  amendmentCount: number
  subcontractorCount: number
  startDate: string
  endDate: string
  latestAmendment: string
}

export function KPISummaryCards() {
  const [data, setData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/bp/summary')
      .then((res) => res.json())
      .then((data) => {
        // Validate that data has expected structure
        if (data && typeof data === 'object' && !data.error) {
          setData(data)
        } else {
          console.error('Invalid data format:', data)
          setData(null)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading summary:', error)
        setData(null)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-20 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!data) {
    return <div className="text-sm text-muted-foreground">Failed to load summary data</div>
  }

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`
    }
    return `$${(value / 1_000_000).toFixed(0)}M`
  }

  const calculateYears = () => {
    if (!data.startDate || !data.endDate) return 'N/A'
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    const years = end.getFullYear() - start.getFullYear()
    return `${years} years`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Contract Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.totalContractValue)}</div>
          <p className="text-xs text-muted-foreground">
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +{data.growthPercent}%
            </Badge>
            <span className="ml-2">from Original</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {data.latestAmendment} • Original: {formatCurrency(data.originalContractValue)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Amendments
          </CardTitle>
          <GitBranch className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.amendmentCount}</div>
          <p className="text-xs text-muted-foreground">
            Contract modifications
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Original → {data.latestAmendment}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            PAMF Claims
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.pamfCount}</div>
          <p className="text-xs text-muted-foreground">
            Package Level Cost claims
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Requires audit review
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Project Duration
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateYears()}</div>
          <p className="text-xs text-muted-foreground">
            {data.subcontractorCount} subcontractors
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(data.startDate).getFullYear()} - {new Date(data.endDate).getFullYear()}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
