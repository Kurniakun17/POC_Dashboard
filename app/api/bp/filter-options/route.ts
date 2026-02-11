import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [yearsRaw, amendments, disciplines, subcontractors] = await Promise.all([
      prisma.tbTMonthlyCost.findMany({
        select: { year: true },
        distinct: ['year'],
        orderBy: { year: 'asc' },
      }),
      prisma.tbMAmendment.findMany({
        select: { amendmentId: true, amendmentCode: true },
        orderBy: { amendmentId: 'asc' },
      }),
      prisma.tbMCostDiscipline.findMany({
        select: { disciplineId: true, disciplineCode: true, disciplineName: true },
        orderBy: { disciplineId: 'asc' },
      }),
      prisma.tbMSubcontractor.findMany({
        select: { subcontractorId: true, subcontractorName: true },
        orderBy: { subcontractorId: 'asc' },
      }),
    ])

    const years = yearsRaw.map((r) => r.year)

    return NextResponse.json({
      years,
      amendments: amendments.map((a) => ({
        id: a.amendmentId,
        code: a.amendmentCode,
      })),
      disciplines: disciplines.map((d) => ({
        id: d.disciplineId,
        code: d.disciplineCode,
        name: d.disciplineName,
      })),
      subcontractors: subcontractors.map((s) => ({
        id: s.subcontractorId,
        name: s.subcontractorName,
      })),
    })
  } catch (error) {
    console.error('Filter options error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    )
  }
}
