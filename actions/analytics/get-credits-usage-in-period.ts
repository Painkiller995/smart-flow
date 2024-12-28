"use server"

import { PeriodToDateRange } from "@/lib/helper/dates"
import prisma from "@/lib/prisma"
import { Period } from "@/types/analytics"
import { ExecutionPhaseStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { eachDayOfInterval, format } from "date-fns"

type Stats = { date: string; success: number; failed: number }[];

const { COMPLETED, FAILED } = ExecutionPhaseStatus

export async function GetCreditsUsageInPeriod(period: Period) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const dateRange = PeriodToDateRange(period)

    const executionPhases = await prisma.executionPhase.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },
            status: {
                in: [COMPLETED, FAILED]
            }
        }
    })

    const dateFormat = "yyyy-MM-dd";

    const stats: Stats = eachDayOfInterval({ start: dateRange.startDate, end: dateRange.endDate }).map((date) => {

        const formattedDate = format(date, dateFormat);

        const dailyExecutions = executionPhases.filter(
            (executionPhase) => format(executionPhase.startedAt!, dateFormat) === formattedDate
        );

        const success = dailyExecutions.filter((exec) => exec.status === COMPLETED).reduce((acc, phase) => acc + (phase.creditsConsumed || 0), 0)
        const failed = dailyExecutions.filter((exec) => exec.status === FAILED).reduce((acc, phase) => acc + (phase.creditsConsumed || 0), 0)

        return { date: formattedDate, success, failed };
    });

    return stats;
} 