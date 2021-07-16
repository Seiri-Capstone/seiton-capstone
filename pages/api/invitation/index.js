/* eslint-disable import/no-anonymous-default-export */
import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    // 📡 GET /api/invitation/
    // fetch all sent and received invitations from a single user
    if (req.method === 'GET') {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: {
            sentInvites: {
              include: {
                sentFrom: {
                  select: { name: true }
                },
                receivedBy: {
                  select: { name: true }
                },
                project: true,
                org: true
              }
            },
            receivedInvites: {
              include: {
                sentFrom: {
                  select: { name: true }
                },
                receivedBy: {
                  select: { name: true }
                },
                project: true,
                org: true
              }
            }
          }
        })
        res.status(200).json({
          sentInvites: user.sentInvites,
          receivedInvites: user.receivedInvites
        })
      } catch (error) {
        console.error(error) // Which one is idiomatic?
      }
    } else if (req.method === 'POST') {
      try {
        let { receivedById, projectId, orgId, searchEmail } = req.body

        //get user to grab id
        const user = await prisma.user.findUnique({
          where: {
            id: Number(session.user.sub)
          }
        })

        //get searchUser to grab id
        if (searchEmail) {
          const searchUser = await prisma.user.findUnique({
            where: { email: searchEmail }
          })

          receivedById = searchUser.id

          //create invitation
          const invitation = await prisma.invitation.create({
            data: {
              sentFrom: {
                connect: {
                  id: user.id
                }
              },
              receivedBy: {
                connect: {
                  id: receivedById
                }
              },
              org: {
                connect: {
                  id: orgId
                }
              }
            }
          })
        } else if (projectId) {
          const invitation = await prisma.invitation.create({
            data: {
              sentFrom: {
                connect: {
                  id: user.id
                }
              },
              receivedBy: {
                connect: {
                  id: receivedById
                }
              },
              project: {
                connect: {
                  id: projectId
                }
              },
              org: {
                connect: {
                  id: orgId
                }
              }
            }
          })
        }

        console.log(receivedById, projectId, orgId, searchEmail)

        //get user again with new invitation (there is a better way to do this)
        const result = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: {
            sentInvites: {
              include: {
                sentFrom: {
                  select: { name: true }
                },
                receivedBy: {
                  select: { name: true }
                },
                project: true,
                org: true
              }
            },
            receivedInvites: {
              include: {
                sentFrom: {
                  select: { name: true }
                },
                receivedBy: {
                  select: { name: true }
                },
                project: true,
                org: true
              }
            }
          }
        })

        res.status(200).json(result)
      } catch (error) {
        console.error('error in the post invitation api call', error)
      }
    }
  }
}
