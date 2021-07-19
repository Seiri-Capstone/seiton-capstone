/* eslint-disable import/no-anonymous-default-export */
import prisma from '../../../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    if (req.method === 'PUT') {
      try {
        const id = Number(req.query.id)
        const userId = Number(req.query.userId)
        const sessionUserId = Number(session.user.sub)
        const { isAdmin } = req.body
        console.log(
          "we're in the db query for remove user project",
          id,
          userId,
          sessionUserId,
          isAdmin
        )

        const user = await prisma.userProject.findMany({
          where: { userId: sessionUserId, projectId: id }
        })

        if (user[0].isAdmin) {
          console.log("you're a project admin")
          await prisma.userProject.updateMany({
            where: {
              projectId: id,
              userId: userId
            },
            data: {
              isAdmin: isAdmin
            }
          })

          const updatedUserProject = await prisma.userProject.findMany({
            where: { userId: userId, projectId: id },
            include: {
              user: {
                select: {
                  name: true,
                  email: true
                }
              }
            }
          })

          res.status(200).json(updatedUserProject)
        } else {
          res.status(403).json("you aren't authorized to make this request")
        }
      } catch (error) {
        console.log('error in the update user from project id api call!', error)
      }
    }

    if (req.method === 'DELETE') {
      try {
        const id = Number(req.query.id)
        const userId = Number(req.query.userId)
        const sessionUser = Number(session.user.sub)
        console.log(
          "we're in the db query for remove user project",
          id,
          userId,
          sessionUser
        )

        const user = await prisma.userProject.findMany({
          where: { userId: sessionUser, projectId: id }
        })

        if (user[0].isAdmin) {
          console.log("you're a project admin")
          const deletedUserProject = await prisma.userProject.deleteMany({
            where: {
              projectId: id,
              userId: userId
            }
          })

          res.status(200).json({ id: userId })
        } else {
          res.status(403).json("you aren't authorized to make this request")
        }
      } catch (error) {
        console.log('error in the remove user from project id api call!', error)
      }
    }
  }
}
