import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
    return
  } else {
    // GET /api/task
    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })
      res.json(result)
    } else if (req.method === 'POST') {
      const { name, email } = req.body
      const userUpdated = await prisma.user.update({
        where: { id },
        data: {
          name,
          email
        }
      })
      res.status(200).json(userUpdated)
    }
  }
}
