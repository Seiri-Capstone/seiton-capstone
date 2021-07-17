import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  }
  // DELETE/TASK/:id
  else {
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
      // pinTask
      if (req.body.action === 'pinTask') {
        try {
          const { pinned, taskId } = req.body
          const task = await prisma.task.update({
            where: {
              id: +taskId
            },
            data: {
              pinned // toggle this? not possible rn
            }
          })

          res.status(200).json(task)
        } catch (error) {
          console.log('error in pinTask', error)
        }
      }
      // assignUser
      else {
        try {
          const { taskId, userIds } = req.body

          const ids = userIds.map(userId => ({ id: userId }))
          const updatedTask = await prisma.task.update({
            where: {
              id: +taskId
            },
            data: {
              user: {
                connect: ids // array of user ids [{ id: 1, }, { id: 2}]
              }
            }
          })
          res.status(201).json(updatedTask)
        } catch (error) {
          console.log('Error in the /api/task/:id put')
          console.log(error)
        }
      }
    }
    // ❗May not be needed
    // else if (req.method === 'DELETE') {
    //   try {
    //     const { taskId, userIds } = req.body
    //     const deletedTasks = await prisma.task.update({
    //       where: {
    //         id: +taskId
    //       },
    //       data: {
    //         users: {
    //           connect: [{ id: +userId }]
    //         }
    //       }
    //     })
    //     // do something here, make sure you get back the updatedTask as well as the id
    //     return deletedTasks
    //   } catch (error) {
    //     console.log(`🟢  in the api task/delete/:id! `)
    //     console.log(error)
    //   }
    // }
  }
}
