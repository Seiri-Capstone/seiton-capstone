import prisma from '../../../prisma/prisma'

// DELETE/TASK/:id
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(req.query.id) }
      })
      res.status(200).json(task)
    } catch (error) {
      console.error(error)
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedTask = await prisma.task.delete({
        where: { id: Number(req.query.id) }
      })
      res.status(200).json(deletedTask)
    } catch (error) {
      console.error(error)
    }
  }
}
