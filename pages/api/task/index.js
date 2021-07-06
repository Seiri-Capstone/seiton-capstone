import prisma from '../../../prisma/prisma'

/**
 * GET /api/task
 */

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log(`🟢  we're here `)
    const result = await prisma.task.findMany()
    res.json(result)
  } else if (req.method === 'PUT') {
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
    throw new Error(
      `The HTTP ${req.method} is not supported at this route: /api/task`
    )
  }
}
