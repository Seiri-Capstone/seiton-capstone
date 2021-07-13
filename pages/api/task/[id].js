import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

// DELETE/TASK/:id
export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    if (req.method === 'DELETE') {
      try {
        const deletedTask = await prisma.task.delete({
          where: { id: Number(req.query.id) }
        })
        res.status(200).json(deletedTask)
      } catch (error) {
        console.error(error)
      }
    } else if (req.method === 'PUT') {
      try {
        console.log('❗❗❗ Request Query:', req.query)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
