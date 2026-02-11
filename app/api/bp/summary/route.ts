import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get latest amendment (AMD-5)
    const latestAmendment = await prisma.tbMAmendment.findFirst({
      orderBy: { amendmentId: 'desc' },
      include: { contractValues: true },
    })

    const latestValue = latestAmendment?.contractValues.reduce(
      (sum, cv) => sum + (cv.amountUsd ? Number(cv.amountUsd) : 0),
      0
    ) || 0

    // Get original contract value
    const originalAmendment = await prisma.tbMAmendment.findFirst({
      where: { amendmentCode: 'ORIGINAL' },
      include: { contractValues: true },
    })

    const originalValue = originalAmendment?.contractValues.reduce(
      (sum, cv) => sum + (cv.amountUsd ? Number(cv.amountUsd) : 0),
      0
    ) || 0

    const growthPercent = originalValue > 0
      ? ((latestValue - originalValue) / originalValue) * 100
      : 0

    const [pamfCount, amendmentCount, subcontractorCount, project] = await Promise.all([
      prisma.tbTPamfClaim.count(),
      prisma.tbMAmendment.count(),
      prisma.tbMSubcontractor.count(),
      prisma.tbMProject.findFirst(),
    ])

    return NextResponse.json({
      totalContractValue: latestValue,
      originalContractValue: originalValue,
      growthPercent: Math.round(growthPercent * 10) / 10,
      pamfCount,
      amendmentCount,
      subcontractorCount,
      startDate: project?.startDate,
      endDate: project?.actualEndDate || project?.plannedEndDate,
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
