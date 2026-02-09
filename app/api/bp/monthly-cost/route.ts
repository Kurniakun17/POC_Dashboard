import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const monthlyCosts = await prisma.tbTMonthlyCost.findMany({
      orderBy: [{ year: 'asc' }, { month: 'asc' }],
    })

    // Group by year-month
    const grouped = monthlyCosts.reduce((acc, cost) => {
      const key = `${cost.year}-${String(cost.month).padStart(2, '0')}`

      if (!acc[key]) {
        acc[key] = {
          year: cost.year,
          month: cost.month,
          date: `${cost.year}-${String(cost.month).padStart(2, '0')}`,
          FGRS: 0,
          LOGI: 0,
        }
      }

      if (cost.costType === 'FGRS_RCE') {
        acc[key].FGRS = Number(cost.monthlyAmountMusd)
      } else if (cost.costType === 'LOGI_RCE') {
        acc[key].LOGI = Number(cost.monthlyAmountMusd)
      }

      return acc
    }, {} as Record<string, any>)

    const data = Object.values(grouped)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching monthly cost:', error)
    return NextResponse.json(
      { error: 'Failed to fetch monthly cost data' },
      { status: 500 }
    )
  }
}
