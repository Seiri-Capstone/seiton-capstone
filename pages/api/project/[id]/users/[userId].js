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
    if (req.method === 'DELETE') {
      try {
        console.log("we're in the db query for remove user project")
        const id = Number(req.query.id)
        const userId = Number(req.query.userId)

        const user = await prisma.userProject.findMany({
          where: { userId: userId, projectId: id }
        })

        if (user[0].isAdmin) {
          console.log("you're a project admin")
          const deletedUserProject = await prisma.userProject.deleteMany({
            where: {
              projectId: id,
              userId: userId
            }
          })

          res.status(200).json(user)
        } else {
          res.status(403).json("you aren't authorized to make this request")
        }
      } catch (error) {
        console.log('error in the remove user from project id api call!', error)
      }
    }
  }
}
