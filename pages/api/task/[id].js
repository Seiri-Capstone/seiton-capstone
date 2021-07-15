import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

// DELETE/TASK/:id
export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    if (req.method === 'DELETE') {
      try {
        const deletedTask = await prisma.task.delete({
          where: { id: Number(req.query.id) }
        })
        res.status(200).json(deletedTask)
      } catch (error) {
        console.error(error)
      }
      // PUT/TASK/:id
    } else if (req.method === 'PUT') {
      // TODO(sey)
      try {
        const { taskId, userId } = req.body

        // console.log(
        //   `🟢  taskId, userId `,
        //   taskId,
        //   userId,
        //   typeof +taskId,
        //   typeof +userId
        // )
        // got back id as a integer (hopefully), now assign it to the user?
        const updatedTask = await prisma.task.update({
          where: {
            id: +taskId
          },
          data: {
            users: {
              connect: {
                id: +userId
              }
            }
          }
        })
        // do something here, make sure you get back the updatedTask as well as the id
        return updatedTask
      } catch (error) {
        console.log('Error in the /api/task/:id put')
        console.log(error)
      }
    } else if (req.method === 'DELETE') {
      try {
        //
      } catch (error) {
        console.log(`🟢  in the api task/delete/:id! `)
        console.log(error)
      }
    }
  }
}
