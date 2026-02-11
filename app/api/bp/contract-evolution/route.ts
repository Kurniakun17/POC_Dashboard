import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const amendmentIds = searchParams.get('amendmentIds')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Prisma.TbMAmendmentWhereInput = {}

    if (amendmentIds) {
      where.amendmentId = { in: amendmentIds.split(',').map(Number) }
    }
    if (startDate || endDate) {
      where.effectiveDate = {}
      if (startDate) where.effectiveDate.gte = new Date(startDate)
      if (endDate) where.effectiveDate.lte = new Date(endDate)
    }

    const amendments = await prisma.tbMAmendment.findMany({
      where,
      orderBy: { amendmentId: 'asc' },
      include: { contractValues: true },
    })

    const data = amendments.map((amendment) => {
      const totalValue = amendment.contractValues.reduce(
        (sum, cv) => sum + (cv.amountUsd ? Number(cv.amountUsd) : 0),
        0
      )
      return {
        amendmentCode: amendment.amendmentCode,
        amendmentName: amendment.amendmentName || amendment.amendmentCode,
        effectiveDate: amendment.effectiveDate,
        totalValue,
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
