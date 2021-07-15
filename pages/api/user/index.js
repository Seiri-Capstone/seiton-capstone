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
    //GET user
    if (req.method === 'GET') {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(session.user.sub)
          }
        })
        res.status(200).json(user)
      } catch (error) {
        console.error(error)
      }
      // PUT /api/user/ update user name and email
    } else if (req.method === 'PUT') {
      try {
        const result = await prisma.user.update({
          where: { id: req.body.id },
          data: {
            name: req.body.name,
            email: req.body.email
          }
        })
        res.status(200).json(result)
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error(error)
    }
  }
}
