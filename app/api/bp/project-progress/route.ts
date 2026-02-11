import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const subcontractorIds = searchParams.get('subcontractorIds')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Prisma.TbTProjectProgressWhereInput = {}

    if (year) {
      where.year = parseInt(year)
    } else if (startDate || endDate) {
      const conditions: Prisma.TbTProjectProgressWhereInput[] = []
      if (startDate) {
        const s = new Date(startDate)
        conditions.push({
          OR: [
            { year: { gt: s.getFullYear() } },
            { year: s.getFullYear(), month: { gte: s.getMonth() + 1 } },
          ],
        })
      }
      if (endDate) {
        const e = new Date(endDate)
        conditions.push({
          OR: [
            { year: { lt: e.getFullYear() } },
            { year: e.getFullYear(), month: { lte: e.getMonth() + 1 } },
          ],
        })
      }
      if (conditions.length > 0) where.AND = conditions
    }

    if (subcontractorIds) {
      where.subcontractorId = { in: subcontractorIds.split(',').map(Number) }
    }

    const data = await prisma.tbTProjectProgress.findMany({
      where,
      orderBy: [{ year: 'asc' }, { month: 'asc' }],
      include: { subcontractorRef: { select: { subcontractorName: true } } },
    })

    // Group by subcontractor
    const grouped: Record<string, {
      subcontractor: string
      monthlyProgress: Array<{
        year: number; month: number; date: string
        planProgress: number; actualProgress: number
      }>
    }> = {}

    for (const row of data) {
      const name = row.subcontractorRef?.subcontractorName || row.subcontractor
      if (!grouped[name]) {
        grouped[name] = { subcontractor: name, monthlyProgress: [] }
      }
      grouped[name].monthlyProgress.push({
        year: row.year,
        month: row.month,
        date: `${row.year}-${String(row.month).padStart(2, '0')}`,
        planProgress: Number(row.planProgressPct),
        actualProgress: Number(row.overallProgressPct),
      })
    }

    return NextResponse.json(Object.values(grouped))
  } catch (error) {
    console.error('Project progress error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project progress data' },
      { status: 500 }
    )
  }
}
