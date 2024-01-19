import { months } from "@/lib/constant";
import { getDateWithTimezone } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const expensesRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.expenses.findMany({
      select: {
        id: true,
        amount: true,
        category: true,
        date: true,
        description: true,
      },
      where: { createdBy: { id: ctx.session.user.id } },
      orderBy: { date: "desc" },
    });
  }),

  daily: protectedProcedure.query(async ({ ctx }) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

    const expenses = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        date: {
          gte: getDateWithTimezone(startDate, timezone),
          lte: getDateWithTimezone(endDate, timezone),
        },
      },
    });

    return expenses.reduce((sum, { amount }) => sum + amount, 0);
  }),

  monthly: protectedProcedure.query(async ({ ctx }) => {
    const expenses = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
    });

    return expenses.reduce((sum, { amount }) => sum + amount, 0);
  }),

  yearlyChart: protectedProcedure
    .input(z.object({ year: z.number() }))
    .query(async ({ ctx, input }) => {
      const currentYear = await ctx.db.expenses.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          date: {
            gte: new Date(input.year, 0, 1),
            lte: new Date(input.year, 11, 31),
          },
        },
      });

      const lastYear = await ctx.db.expenses.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          date: {
            gte: new Date(input.year - 1, 0, 1),
            lte: new Date(input.year - 1, 11, 31),
          },
        },
      });

      const result: {
        name: string;
        currentYear: number;
        lastYear: number;
      }[] = [];

      months.forEach((month) => {
        const currentYearMonthlyExpenses = currentYear.filter((expense) => {
          const expenseMonth = new Date(expense.date).getMonth();
          return months[expenseMonth] === month;
        });

        const lastYearMonthlyExpenses = lastYear.filter((expense) => {
          const expenseMonth = new Date(expense.date).getMonth();
          return months[expenseMonth] === month;
        });

        result.push({
          name: month,
          currentYear: currentYearMonthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0),
          lastYear: lastYearMonthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0),
        });
      });

      return result;
    }),

  add: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        category: z.string(),
        date: z.date(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.expenses.create({
        data: {
          ...input,
          createdById: ctx.session.user.id,
        },
      });
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.expenses.delete({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });
    }),
});
