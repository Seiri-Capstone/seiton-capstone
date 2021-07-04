const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const org = await prisma.org.create({
    data: {
      name: 'seiton-team'
    }
  })

  const project = await prisma.project.create({
    data: {
      name: 'seiton-test-project',
      orgId: 1
    }
  })

  const columns = await prisma.column.createMany({
    data: [
      { title: 'to-do', projectId: 1, index: 0 },
      { title: 'in-progress', projectId: 1, index: 1 },
      { title: 'needs-review', projectId: 1, index: 2 },
      { title: 'completed', projectId: 1, index: 3 }
    ]
  })

  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'task1',
        body: 'watch videos on next.js',
        columnId: 1,
        index: 0
      },
      {
        title: 'task2',
        body: 'practice using react hooks by refactoring class components',
        columnId: 1,
        index: 1
      },
      {
        title: 'task3',
        body: 'read documentation on redux toolkit',
        columnId: 2,
        index: 2
      },
      { title: 'task4', body: 'write prisma schema', columnId: 4, index: 3 },
      { title: 'task5', body: 'seed the database', columnId: 3, index: 4 }
    ]
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
