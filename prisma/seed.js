const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Jane Doe', email: 'jane@gmail.com' },
      { name: 'Ilana Wexler', email: 'ilana@gmail.com' },
      { name: 'Frodo Baggins', email: 'frodo@gmail.com' }
    ]
  })

  await prisma.org.create({
    data: {
      name: 'Marketing Cat Company',
      projects: {
        create: [
          {
            name: 'Media Solutions Project',
            columns: {
              create: [
                {
                  title: 'To-Do',
                  index: 0,
                  tasks: {
                    create: [
                      {
                        title: 'Negotiate Influencer campaign buys',
                        body: 'Meet with Bustle and clients to find 2x influencers within budget for Summer campaign',
                        index: 0
                      },
                      {
                        title: 'Create strategy for social following',
                        body: '- [ ] Pull audience demographic report ',
                        index: 1
                      },
                      {
                        title: 'Reach out to Programmatic team for QoQ budgets',
                        body: 'Need 2021 quarterly budgets for EOQ billing actualizations',
                        index: 2
                      }
                    ]
                  }
                },
                {
                  title: 'In-Progress',
                  index: 1,
                  tasks: {
                    create: [
                      {
                        title:
                          'Create audience segmentation on portfolio brands',
                        body: '- [ ] Pull audience demographic report from Tableau dashboard - [ ] Work with analytics team to get latest insights',

                        index: 0
                      },
                      {
                        title:
                          'Gather client feedback on strategic brief for Seiton',
                        body: 'Work with vendors for tweaks in media buys',
                        index: 1
                      },
                      {
                        title: 'Rotate in new creative assets',
                        body: '- [ ] QA trafficking sheet from creative agency - [ ] Send confirmation screenshots to clients',
                        index: 2
                      }
                    ]
                  }
                },
                {
                  title: 'Done',
                  index: 2,
                  tasks: {
                    create: [
                      {
                        title: 'Update media flowchart',
                        body: '- [ ] update flow w/ costs and imps - [ ] QA by supervisor - [ ] sent to clients',
                        index: 0
                      },
                      {
                        title: 'Meet with vendors from Hulu for CTV placement',
                        body: 'Negotiate potential buys and sponsorships for repurposed portfolio assets',
                        index: 1
                      },
                      {
                        title: 'Idenitfy target search keyword categories',
                        body: 'Generate list of top-performing search keywords for Google and Bing',
                        index: 2
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
