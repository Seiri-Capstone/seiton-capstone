import prisma from '../../../prisma/prisma'

export default async function createTask(req, res) {
  try {
    const session = await getSession({ req })
    if (!session) {
      res.status(403).json({
        message: 'You must be signed in to view this page.'
      })
      return
    } else {
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
    }
  } catch (error) {
    console.error('error in the column api call!', error)
  }
}
