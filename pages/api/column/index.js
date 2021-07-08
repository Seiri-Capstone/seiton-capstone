import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  // const session = await getSession({ req })
  // if (!session) {
  //   res.status(403).json({
  //     message: 'You must be signed in to view this page.'
  //   })
  // }
  // PUT /api/column
  if (req.method === 'PUT') {
    try {
      const { id, title, projectId, index } = req.body
      const result = await prisma.column.update({
        where: { id },
        data: {
          title,
          projectId,
          index
        }
      })

      res.status(200).json(result)
    } catch (error) {
      throw new Error('Column POST edit')
    }
<<<<<<< HEAD
    // POST /api/column
    if (req.method === 'POST') {
      try {
        const { id, title, projectId, index } = req.body
        const newColumn = await prisma.column.create({
          data: {
            title,
            projectId,
            index
          }
        })
        res.status(200).json(newColumn)
      } catch (error) {
        throw new Error('POST route ...')
      }
=======
  }

  if (req.method === 'POST') {
    try {
      // always create the index
      // const { id, title, projectId, index } = req.body
      const result = await prisma.column.create(req.body)

      // What status code?
      res.status(200).json(result)
    } catch (error) {
      throw new Error('POST route ...')
>>>>>>> 68f89f98bab352d31ce13027bb49b4137965d677
    }
  }
}
