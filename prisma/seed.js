const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.org.create({
    data: {
      name: 'seiton-team',
      projects: {
        create: [
          {
            name: 'seiton-test-project',
            columns: {
              create: [
                {
                  title: 'to-do',
                  index: 0,
                  tasks: {
                    create: [
                      {
                        title: 'task1',
                        body: 'watch videos on next.js',
                        index: 0
                      },
                      {
                        title: 'task2',
                        body: 'practice using react hooks by refactoring class components',
                        index: 1
                      }
                    ]
                  }
                },
                {
                  title: 'in-progress',
                  index: 1,
                  tasks: {
                    create: [
                      {
                        title: 'task3',
                        body: 'read documentation on redux toolkit',
                        index: 0
                      },
                      {
                        title: 'task4',
                        body: 'write prisma schema',
                        index: 1
                      },
                      {
                        title: 'task5',
                        body: '- [ ] seed the `prisma` **database**',
                        index: 2
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            name: 'seiton-test-project-2',
            columns: {
              create: [
                {
                  title: 'to-do',
                  index: 0,
                  tasks: {
                    create: [
                      {
                        title: 'task1',
                        body: 'stop procrastinating',
                        index: 0
                      },
                      {
                        title: 'task2',
                        body: 'get to work',
                        index: 1
                      }
                    ]
                  }
                },
                {
                  title: 'in-progress',
                  index: 1,
                  tasks: {
                    create: [
                      {
                        title: 'task3',
                        body: 'how to be centered',
                        index: 0
                      },
                      {
                        title: 'task4',
                        body: 'how to be zen',
                        index: 1
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  })

  await prisma.org.create({
    data: {
      name: 'bad trello',
      projects: {
        create: [
          {
            name: 'empty project',
            columns: {
              create: [
                {
                  title: 'to-do',
                  index: 0,
                  tasks: {
                    create: [
                      {
                        title: 'task1',
                        body: 'task1',
                        index: 0
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
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
