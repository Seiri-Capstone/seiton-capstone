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
    console.log('is post')
    res.json({ test: 'test' })
  } else {
    throw new Error(
      `The HTTP ${req.method} is not supported at this route: /api/task`
    )
  }
}
