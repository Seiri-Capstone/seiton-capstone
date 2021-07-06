import prisma from '../../../prisma/prisma'

export default async function createTask(req, res) {
  try {
    const { id, title, body, columnId, index } = req.body
    const newTask = await prisma.task.create({
      data: {
        title,
        body,
        columnId,
        index
      }
    })
    res.status(200).json(newTask)
  } catch (error) {
    console.error('error in the column api call!', error)
  }
}
