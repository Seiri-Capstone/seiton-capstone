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
        const id = Number(req.query.id)
        const userId = Number(req.query.userId)

        const sessionUser = await prisma.userOrg.findMany({
          where: { userId: +session.user.sub, orgId: id }
        })

        //find deleted user to return
        const deletedUser = await prisma.user.findUnique({
          where: { id: userId }
        })

        if (sessionUser[0].isCreator) {
          console.log("you're an org creator")
          const deletedUserOrg = await prisma.userOrg.deleteMany({
            where: {
              orgId: id,
              userId: userId
            }
          })

          res.status(200).json(deletedUser)
        } else if (userId === +session.user.sub) {
          const deletedUserOrg = await prisma.userOrg.deleteMany({
            where: {
              orgId: id,
              userId: userId
            }
          })

          console.log(deletedUser)
          res.status(200).json(deletedUser)
        } else {
          res.status(403).json("you aren't authorized to make this request")
        }
      } catch (error) {
        console.log('error in the delete org id api call!', error)
      }
    }
  }
}
