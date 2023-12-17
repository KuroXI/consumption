import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const expensesRouter = createTRPCRouter({
	all: protectedProcedure.query(({ ctx }) => {
		return ctx.db.expenses.findMany({
			where: { createdBy: { id: ctx.session.user.id } },
		});
	})
});
