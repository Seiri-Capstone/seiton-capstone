import prisma from '../../../prisma/prisma'

/**
 * File should be ...column/[id]
 * Preferably, ...some_user/project_board/column/[id]
 *
 * TODO REFACTOR:
 * if (req.method === 'PUT') { ... }
 *
 * In this way, we can use the file page for multiple routes, like the way we did
 * in Express with the router.get, router.post, etc., essentially separating the
 * logic via the req.method under the hood
 */

export default async function hanlder(req, res) {
  try {
    console.log("we're in the put column request!", req.body)
    const { id, title, projectId, index } = req.body
    const result = await prisma.column.update({
      where: { id: id },
      data: {
        title,
        projectId,
        index
      }
    })

    res.status(200).json(result)
  } catch (error) {
    console.log('error in the column api call!', error)
  }
}
