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
        createdAt: true,
        description: true,
      },
      where: { createdBy: { id: ctx.session.user.id } },
      orderBy: { createdAt: "desc" },
    });
  }),

  daily: protectedProcedure.input(z.object({ date: z.date() })).query(async ({ ctx, input }) => {
    const currentDay = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: {
          gte: moment(input.date).startOf("day").toDate(),
          lte: moment(input.date).endOf("day").toDate(),
        },
      },
    });
    
    const lastDay = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: {
          gte: moment(input.date).subtract(1, "days").startOf("day").toDate(),
          lte: moment(input.date).subtract(1, "days").endOf("day").toDate(),
        },
      },
    });

    return {
      current: currentDay.reduce((sum, { amount }) => sum + amount, 0),
      last: lastDay.reduce((sum, { amount }) => sum + amount, 0),
    }
  }),

  monthly: protectedProcedure.input(z.object({ date: z.date() })).query(async ({ ctx, input }) => {
    const currentMonth = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: {
          gte: moment(input.date).startOf("month").toDate(),
          lte: moment(input.date).endOf("month").toDate(),
        },
      },
    });

    const lastMonth = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: {
          gte: moment(input.date).subtract(1, "months").startOf("month").toDate(),
          lte: moment(input.date).subtract(1, "months").endOf("month").toDate(),
        },
      },
    });

    return {
      current: currentMonth.reduce((sum, { amount }) => sum + amount, 0),
      last: lastMonth.reduce((sum, { amount }) => sum + amount, 0),
    }
  }),

  yearly: protectedProcedure.input(z.object({ date: z.date() })).query(async ({ ctx, input }) => {
    const currentYear = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: {
          gte: moment(input.date.getFullYear(), "YYYY").startOf("year").toDate(),
          lte: moment(input.date.getFullYear(), "YYYY").endOf("year").toDate(),
        },
      },
    });

    const lastYear = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: {
          gte: moment(input.date.getFullYear(), "YYYY").subtract(1, "years").startOf("year").toDate(),
          lte: moment(input.date.getFullYear(), "YYYY").subtract(1, "years").endOf("year").toDate(),
        },
      },
    });

    return {
      current: currentYear.reduce((sum, { amount }) => sum + amount, 0),
      last: lastYear.reduce((sum, { amount }) => sum + amount, 0),
    }
  }),

  yearlyChart: protectedProcedure
    .input(z.object({ year: z.number() }))
    .query(async ({ ctx, input }) => {
      const currentYear = await ctx.db.expenses.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          createdAt: {
            gte: moment(input.year, "YYYY").startOf("year").toDate(),
            lte: moment(input.year, "YYYY").endOf("year").toDate(),
          },
        },
      });

      const lastYear = await ctx.db.expenses.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          createdAt: {
            gte: moment(input.year, "YYYY").subtract(1, "years").startOf("year").toDate(),
            lte: moment(input.year, "YYYY").subtract(1, "years").endOf("year").toDate(),
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
          const expenseMonth = new Date(expense.createdAt).getMonth();
          return months[expenseMonth] === month;
        });

        const lastYearMonthlyExpenses = lastYear.filter((expense) => {
          const expenseMonth = new Date(expense.createdAt).getMonth();
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
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.expenses.create({
        data: {
          description: input.description,
          amount: input.amount,
          category: input.category,
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
