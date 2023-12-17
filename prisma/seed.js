import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { env } from "../src/env.js";

const client = new PrismaClient();

function createExpenses() {
  return {
    description: faker.finance.transactionDescription(),
    category: faker.finance.transactionType(),
    amount: Number(faker.finance.amount()),
    date: faker.date.past(),
    createdAt: new Date(),
    createdById: env.TEST_ID,
  };
}

const expenses = faker.helpers.multiple(createExpenses, { count: 50 });

async function seed() {
  await client.expenses.createMany({ data: expenses });
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
