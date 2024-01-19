import moment from "moment-timezone";
import { months } from "@/lib/constant";
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
    const timezone = moment.tz.guess();

    const expenses = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        date: {
          gte: moment().utc().startOf("day").tz(timezone).toDate(),
          lte: moment().utc().endOf("day").tz(timezone).toDate(),
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
          gte: moment().utc().startOf("month").toDate(),
          lte: moment().utc().endOf("month").toDate(),
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
            gte: moment().utc().startOf("year").toDate(),
            lte: moment().utc().endOf("year").toDate(),
          },
        },
      });

      const lastYear = await ctx.db.expenses.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          date: {
            gte: moment(input.year - 1, "YYYY").startOf("year").toDate(),
            lte: moment(input.year - 1, "YYYY").endOf("year").toDate(),
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
          description: input.description,
          amount: input.amount,
          category: input.category,
          date: moment(input.date).utc().toDate(),
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
