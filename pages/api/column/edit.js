import prisma from '../../../prisma/prisma'

export default async function putColumn(req, res) {
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
