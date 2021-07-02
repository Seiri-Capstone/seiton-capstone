import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const columnsAndTasks = await prisma.column.create({
    data: {
      title: "project 1",
      tasks: {
        create: [
          { title: "task 1", body: "...", idx: 1 },
          { title: "task 2", body: "...", idx: 2 },
          { title: "task 3", body: "...", idx: 3 },
        ],
      },
    },
  });
  const columnsAndTasks2 = await prisma.column.create({
    data: {
      title: "project 2",
      tasks: {
        create: [
          { title: "task 4", body: "...", idx: 1 },
          { title: "task 5", body: "...", idx: 2 },
          { title: "task 6", body: "...", idx: 3 },
        ],
      },
    },
  });
  const columnsAndTasks3 = await prisma.column.create({
    data: {
      title: "project 3",
      tasks: {
        create: [
          { title: "task 5", body: "...", idx: 1 },
          { title: "task 6", body: "...", idx: 2 },
          { title: "task 7", body: "...", idx: 3 },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
