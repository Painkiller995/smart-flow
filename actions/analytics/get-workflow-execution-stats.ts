"use server"

import { PeriodToDateRange } from "@/lib/helper/dates"
import prisma from "@/lib/prisma"
import { Period } from "@/types/analytics"
import { WorkflowExecutionStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { eachDayOfInterval, format } from "date-fns"

type Stats = Record<string, { success: number; failed: number }>;

export async function GetWorkflowExecutionStats(period: Period) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const dateRange = PeriodToDateRange(period)

    const executions = await prisma.workflowExecution.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },

        }
    })

    const dateFormat = 'yyyy-MM-dd'

    const stats: Stats = Object.fromEntries(
        eachDayOfInterval({ start: dateRange.startDate, end: dateRange.endDate }).map((date) => [
            format(date, dateFormat),
            { success: 0, failed: 0 },
        ])
    );

    executions.forEach(({ startedAt, status }) => {
        const date = format(startedAt!, dateFormat);
        if (stats[date]) {
            if (status === WorkflowExecutionStatus.COMPLETED) stats[date].success += 1;
            if (status === WorkflowExecutionStatus.FAILED) stats[date].failed += 1;
        }
    });

    return stats
}