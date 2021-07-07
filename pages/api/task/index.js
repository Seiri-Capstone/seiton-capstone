import prisma from '../../../prisma/prisma'

/**
 * GET /api/task
 */

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log(`🟢  we're here `)
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
  } else {
    throw new Error(
      `The HTTP ${req.method} is not supported at this route: /api/task`
    )
  }
}
