"use server"

import { PeriodToDateRange } from "@/lib/helper/dates"
import prisma from "@/lib/prisma"
import { Period } from "@/types/analytics"
import { WorkflowExecutionStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { eachDayOfInterval, format } from "date-fns"

type Stats = { date: string; success: number; failed: number }[];

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

    const dateFormat = "yyyy-MM-dd";

    const stats: Stats = eachDayOfInterval({ start: dateRange.startDate, end: dateRange.endDate }).map((date) => {

        const formattedDate = format(date, dateFormat);

        const dailyExecutions = executions.filter(
            (execution) => format(execution.startedAt!, dateFormat) === formattedDate
        );

        const success = dailyExecutions.filter((exec) => exec.status === WorkflowExecutionStatus.COMPLETED).length;
        const failed = dailyExecutions.filter((exec) => exec.status === WorkflowExecutionStatus.FAILED).length;

        return { date: formattedDate, success, failed };
    });

    return stats;
}