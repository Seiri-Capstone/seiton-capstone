import prisma from '../../../prisma/prisma'

/**
 * GET /api/task
 */

export default async function handler(req, res) {
  // GET /api/task
  if (req.method === 'GET') {
    const result = await prisma.task.findMany()
    res.json(result)
  } else if (req.method === 'POST') {
    try {
      const { title, task, columnId, index } = req.body
      console.log('in backend before new task created', req.body)
      const newTask = await prisma.task.create({
        data: {
          title,
          body: task,
          columnId,
          index
        }
      })
      console.log('BACKEND TASK CREATED', newTask)
      res.status(200).json(newTask)
    } catch (error) {
      console.error('error in the column api call!', error)
    }
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
