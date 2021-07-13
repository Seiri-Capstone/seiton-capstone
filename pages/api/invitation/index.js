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
                project: true
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
                project: true
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
      } catch (error) {
        console.error('error in the post invitation api call', error)
      }
    }
  }
}
