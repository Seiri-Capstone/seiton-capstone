import prisma from '../../../prisma/prisma'

export default async function createTask(req, res) {
  try {
    const session = await getSession({ req })
    if (!session) {
      res.status(403).json({
        message: 'You must be signed in to view this page.'
      })
      return
    }
  } catch (error) {
    console.error('error in the column api call!', error)
  }
}
