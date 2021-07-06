import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
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
  }
}
