import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const transactionRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.transaction.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      orderBy: { createdAt: "desc" },
    });
  }),

  balance: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      orderBy: { createdAt: "desc" },
    });

    const expense = await ctx.db.expenses.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      orderBy: { createdAt: "desc" },
    });

    return (
      transactions.reduce((total, transaction) => total + transaction.amount, 0) -
      expense.reduce((total, expense) => total + expense.amount, 0)
    );
  }),

  add: protectedProcedure
    .input(z.object({ name: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction.create({
        data: {
          name: input.name,
          amount: input.amount,
          createdById: ctx.session.user.id,
        },
      });
    }),
});
