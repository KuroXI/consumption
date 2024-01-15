import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type TransactionType } from "@prisma/client";
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

    let total = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "ADD") {
        total += transaction.amount;
      } else {
        total -= transaction.amount;
      }
    });

    expense.forEach((expense) => (total -= expense.amount));

    return total;
  }),

  add: protectedProcedure
    .input(z.object({ name: z.string(), amount: z.number(), type: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction.create({
        data: {
          name: input.name,
          amount: input.amount,
          type: input.type as TransactionType,
          createdById: ctx.session.user.id,
        },
      });
    }),
});
