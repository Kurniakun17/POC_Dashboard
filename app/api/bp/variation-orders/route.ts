import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const amendmentIds = searchParams.get('amendmentIds')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Prisma.TbTVariationOrderWhereInput = {}

    if (amendmentIds) {
      where.approvedInAmendment = { in: amendmentIds.split(',').map(Number) }
    }
    if (startDate || endDate) {
      where.approvedDate = {}
      if (startDate) where.approvedDate.gte = new Date(startDate)
      if (endDate) where.approvedDate.lte = new Date(endDate)
    }

    const data = await prisma.tbTVariationOrder.findMany({
      where,
      orderBy: { voId: 'asc' },
    })

    return NextResponse.json(
      data.map((vo) => ({
        voNumber: vo.voNumber,
        voName: vo.voName,
        amountUsd: Number(vo.amountUsd),
        status: vo.status,
        approvedInAmendment: vo.approvedInAmendment,
        approvedDate: vo.approvedDate?.toISOString().split('T')[0] ?? null,
      }))
    )
  } catch (error) {
    console.error('Variation orders error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch variation orders' },
      { status: 500 }
    )
  }
}
