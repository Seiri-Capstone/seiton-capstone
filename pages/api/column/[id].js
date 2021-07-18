import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

// DELETE/COLUMN/:id
export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    if (req.method === 'DELETE') {
      try {
        const { id } = req.query
        console.log(`🟢  id `, id)
        const deletedColumn = await prisma.column.delete({
          where: { id: Number(id) }
        })
        // Ideally, we want to do a CASCADE delete, but we will do independent deletes
        await prisma.task.deleteMany({
          where: { columnId: id }
        })
        res.status(200).json(deletedColumn)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
