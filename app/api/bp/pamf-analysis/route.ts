import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getDisciplineColor } from '@/lib/chart-colors'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const disciplineIds = searchParams.get('disciplineIds')

    let topCategories
    let scatterData

    if (disciplineIds) {
      const ids = disciplineIds.split(',').map(Number)
      topCategories = await prisma.$queryRaw<
        Array<{ category: string; claimAmount: number; pamfCount: number }>
      >`
        SELECT label as category,
               SUM(claim_amount_usd) as claimAmount,
               SUM(pamf_count) as pamfCount
        FROM tb_t_pamf_claim
        WHERE level = 2 AND discipline_id IN (${Prisma.join(ids)})
        GROUP BY label
        ORDER BY claimAmount DESC
        LIMIT 15
      `
      scatterData = await prisma.$queryRaw<
        Array<{ discipline: string; pamfCount: number; totalClaim: number }>
      >`
        SELECT discipline,
               SUM(pamf_count) as pamfCount,
               SUM(claim_amount_usd) as totalClaim
        FROM tb_t_pamf_claim
        WHERE discipline_id IN (${Prisma.join(ids)})
        GROUP BY discipline
      `
    } else {
      topCategories = await prisma.$queryRaw<
        Array<{ category: string; claimAmount: number; pamfCount: number }>
      >`
        SELECT label as category,
               SUM(claim_amount_usd) as claimAmount,
               SUM(pamf_count) as pamfCount
        FROM tb_t_pamf_claim
        WHERE level = 2
        GROUP BY label
        ORDER BY claimAmount DESC
        LIMIT 15
      `
      scatterData = await prisma.$queryRaw<
        Array<{ discipline: string; pamfCount: number; totalClaim: number }>
      >`
        SELECT discipline,
               SUM(pamf_count) as pamfCount,
               SUM(claim_amount_usd) as totalClaim
        FROM tb_t_pamf_claim
        GROUP BY discipline
      `
    }

    return NextResponse.json({
      topCategories: topCategories.map((row) => ({
        category: row.category,
        claimAmount: Number(row.claimAmount),
        pamfCount: Number(row.pamfCount),
      })),
      scatterData: scatterData.map((row) => ({
        discipline: row.discipline,
        pamfCount: Number(row.pamfCount),
        totalClaim: Number(row.totalClaim),
        color: getDisciplineColor(row.discipline),
      })),
    })
  } catch (error) {
    console.error('PAMF analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PAMF analysis' },
      { status: 500 }
    )
  }
}
