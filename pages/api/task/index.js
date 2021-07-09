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
      const result = await prisma.task.findMany()
      res.json(result)
    }
    // PUT /api/task
    else if (req.method === 'PUT') {
      try {
        const { id, title, body, columnId, index } = req.body
        const result = await prisma.task.update({
          where: { id },
          data: {
            title,
            body,
            columnId,
            index
          }
        })

        res.status(200).json(result)
      } catch (error) {
        throw new Error('error in the column api call')
      }
    } else {
      // OTHER Routes
      throw new Error(
        `The HTTP ${req.method} is not supported at this route: /api/task`
      )
    }
  } 
}
