import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { env } from "../src/env.js";

const client = new PrismaClient();

function createExpenses() {
  return {
    description: faker.commerce.productName(),
    category: faker.finance.transactionType(),
    amount: Number(faker.finance.amount()),
    date: faker.date.past({ years: 2 }),
    createdAt: new Date(),
    createdById: env.TEST_ID,
  };
}

function createTransaction() {
  return {
    name: faker.company.name(),
    amount: Number(faker.finance.amount()),
    createdAt: new Date(),
    createdById: env.TEST_ID,
  };
}

const expenses = faker.helpers.multiple(createExpenses, { count: 50 });
const transactions = faker.helpers.multiple(createTransaction, { count: 20 });

async function seed() {
  await client.expenses.createMany({ data: expenses });
  await client.transaction.createMany({ data: transactions });
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
