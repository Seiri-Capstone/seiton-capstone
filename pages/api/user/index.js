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
    // PUT /api/user/ update user name
    if (req.method === 'PUT') {
      try {
        const { id, name } = req.body
        const result = await prisma.task.update({
          where: { id },
          data: {
            name
          }
        })
        res.status(200).json(result)
      } catch (error) {
        throw new Error('error in the user api call')
      }
    } else {
      console.error(error)
      throw new Error(
        `The HTTP ${req.method} is not supported at this route: /api/user`
      )
    }
  }
}
