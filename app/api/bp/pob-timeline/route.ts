import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Prisma.TbTMonthlyPobWhereInput = {}

    if (year) {
      where.year = parseInt(year)
    } else if (startDate || endDate) {
      const conditions: Prisma.TbTMonthlyPobWhereInput[] = []
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

    const data = await prisma.tbTMonthlyPob.findMany({
      where,
      orderBy: [{ year: 'asc' }, { month: 'asc' }],
    })

    return NextResponse.json(
      data.map((row) => ({
        year: row.year,
        month: row.month,
        date: `${row.year}-${String(row.month).padStart(2, '0')}`,
        pobCount: row.pobCount,
        isolationCount: row.isolationCount,
        remarks: row.remarks,
      }))
    )
  } catch (error) {
    console.error('POB timeline error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch POB data' },
      { status: 500 }
    )
  }
}
