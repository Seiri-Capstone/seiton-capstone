import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    // 📡 GET /api/projects
    if (req.method === 'GET') {
      try {
        //get user by session
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        })

        //get projects that user is associated with
        const result = await prisma.userProject.findMany({
          where: { userId: user.id },
          include: {
            project: true
          }
        })
        res.status(200).json(result)
      } catch (error) {
        console.error(error) // just for console log purposes
        throw new Error('Error getting projects!')
      }
    }
  }
}
