import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const amendments = await prisma.tbMAmendment.findMany({
      orderBy: { amendmentId: 'asc' },
      include: {
        contractValues: true,
      },
    })

    const data = amendments.map((amendment) => {
      const totalValue = amendment.contractValues.reduce(
        (sum, cv) => sum + Number(cv.amountUsd),
        0
      )

      return {
        amendmentCode: amendment.amendmentCode,
        amendmentName: amendment.amendmentName || amendment.amendmentCode,
        effectiveDate: amendment.effectiveDate,
        totalValue,
        // Convert to billions for better chart display
        totalValueB: totalValue / 1_000_000_000,
      }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching contract evolution:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contract evolution data' },
      { status: 500 }
    )
  }
}
