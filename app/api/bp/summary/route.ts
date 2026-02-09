import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get latest amendment (AMD-5)
    const latestAmendment = await prisma.tbMAmendment.findFirst({
      orderBy: { amendmentId: 'desc' },
      include: {
        contractValues: true,
      },
    })

    // Calculate total contract value for latest amendment
    const latestValue = latestAmendment?.contractValues.reduce(
      (sum, cv) => sum + Number(cv.amountUsd),
      0
    ) || 0

    // Get original contract value
    const originalAmendment = await prisma.tbMAmendment.findFirst({
      where: { amendmentCode: 'ORIGINAL' },
      include: {
        contractValues: true,
      },
    })

    const originalValue = originalAmendment?.contractValues.reduce(
      (sum, cv) => sum + Number(cv.amountUsd),
      0
    ) || 0

    // Calculate growth percentage
    const growthPercent = originalValue > 0
      ? ((latestValue - originalValue) / originalValue) * 100
      : 0

    // Count PAMF claims
    const pamfCount = await prisma.tbTPamfClaim.count()

    // Count amendments
    const amendmentCount = await prisma.tbMAmendment.count()

    // Count subcontractors
    const subcontractorCount = await prisma.tbMSubcontractor.count()

    // Get project date range
    const project = await prisma.tbMProject.findFirst()

    return NextResponse.json({
      totalContractValue: latestValue,
      originalContractValue: originalValue,
      growthPercent: Math.round(growthPercent * 10) / 10,
      pamfCount,
      amendmentCount,
      subcontractorCount,
      startDate: project?.startDate,
      endDate: project?.endDate,
      latestAmendment: latestAmendment?.amendmentCode,
    })
  } catch (error) {
    console.error('Error fetching summary:', error)
    return NextResponse.json(
      { error: 'Failed to fetch summary data' },
      { status: 500 }
    )
  }
}
