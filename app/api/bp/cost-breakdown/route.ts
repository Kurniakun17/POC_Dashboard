import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const disciplineIds = searchParams.get('disciplineIds')

    // Query cost split from latest amendment
    const latestAmendment = await prisma.tbMAmendment.findFirst({
      orderBy: { amendmentId: 'desc' },
    })

    const costSplit = latestAmendment
      ? {
          lumpSum: Number(latestAmendment.lumpSumValue ?? 0),
          reimbursable: Number(latestAmendment.reimbursableValue ?? 0),
          provisional: Number(latestAmendment.provisionalSumValue ?? 0),
          backcharge: Number(latestAmendment.backchargeValue ?? 0),
          total: Number(latestAmendment.totalContractValue ?? 0),
        }
      : { lumpSum: 0, reimbursable: 0, provisional: 0, backcharge: 0, total: 0 }

    // PAMF by discipline with optional discipline filter
    let pamfQuery
    if (disciplineIds) {
      const ids = disciplineIds.split(',').map(Number)
      pamfQuery = await prisma.$queryRaw<
        Array<{ discipline: string; claimAmount: number; pamfCount: number }>
      >`
        SELECT discipline,
               SUM(claim_amount_usd) as claimAmount,
               SUM(pamf_count) as pamfCount
        FROM tb_t_pamf_claim
        WHERE discipline_id IN (${Prisma.join(ids)})
        GROUP BY discipline
      `
    } else {
      pamfQuery = await prisma.$queryRaw<
        Array<{ discipline: string; claimAmount: number; pamfCount: number }>
      >`
        SELECT discipline,
               SUM(claim_amount_usd) as claimAmount,
               SUM(pamf_count) as pamfCount
        FROM tb_t_pamf_claim
        GROUP BY discipline
      `
    }

    const pamfByDiscipline = pamfQuery.map((row) => ({
      discipline: row.discipline,
      claimAmount: Number(row.claimAmount),
      pamfCount: Number(row.pamfCount),
    }))

    return NextResponse.json({ costSplit, pamfByDiscipline })
  } catch (error) {
    console.error('Cost breakdown error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cost breakdown' },
      { status: 500 }
    )
  }
}
