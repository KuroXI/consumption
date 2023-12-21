import { months } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const expensesRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const expenses = await ctx.db.expenses.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
    });

    expenses.sort((a, b) => b.date.getTime() - a.date.getTime());

    return expenses.map((expense) => {
      return {
        id: expense.id,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        description: expense.description,
      }
    });
  }),

  yearly: protectedProcedure.input(z.object({ year: z.number() })).query(async ({ ctx, input }) => {
    const expenses = await ctx.db.expenses.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
        date: {
          gte: new Date(input.year, 0, 1),
          lte: new Date(input.year, 11, 31),
        },
      },
    });

    const result: {
      month: string;
      amount: number;
    }[] = [];

    months.forEach((month) => {
      const monthExpenses = expenses.filter((expense) => {
        const expenseMonth = new Date(expense.date).getMonth();
        return months[expenseMonth] === month;
      });

      const totalAmount = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      result.push({
        month,
        amount: totalAmount,
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
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
