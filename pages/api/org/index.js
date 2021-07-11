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
    // 📡 GET /api/org/
    if (req.method === 'GET') {
      try {
        //get user by session
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        })

        //get organizations that user is associated with
        const result = await prisma.userOrg.findMany({
          where: { userId: user.id },
          include: {
            org: true
          }
        })

        res.status(200).json(result)
      } catch (error) {
        console.error(error) // Which one is idiomatic?
        throw new Error('Error getting org!')
      }
    }
  }
}
