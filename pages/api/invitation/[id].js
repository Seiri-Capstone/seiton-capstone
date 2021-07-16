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
    // PUT api/invitation/:id
    if (req.method === 'PUT') {
      try {
        const { invite, value } = req.body
        //invite status change to accept or decline

        const updatedInvite = await prisma.invitation.update({
          where: {
            id: Number(invite.id)
          },
          data: {
            status: value
          }
        })

        console.log('invite', invite)

        //if accept, create userProject row
        if (value === 'ACCEPTED') {
          console.log('we are connecting a userProject', invite.projectId)
          if (invite.projectId) {
            const userProject = await prisma.userProject.create({
              data: {
                user: {
                  connect: {
                    id: invite.receivedUserId
                  }
                },
                project: {
                  connect: {
                    id: invite.projectId
                  }
                },
                isAdmin: false
              }
            })
          } else {
            const userOrg = await prisma.userOrg.create({
              data: {
                user: {
                  connect: {
                    id: invite.receivedUserId
                  }
                },
                org: {
                  connect: {
                    id: invite.orgId
                  }
                },
                isCreator: false
              }
            })
          }
        }

        res.status(200).json(updatedInvite)
      } catch (error) {
        console.log('error in the project id api call!', error)
      }
    }
  }
}
