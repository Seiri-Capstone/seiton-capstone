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

        const user = await prisma.userOrg.findMany({
          where: { userId: userId, orgId: id }
        })

        if (user[0].isCreator) {
          console.log("you're an org creator")
          const deletedUserOrg = await prisma.userOrg.deleteMany({
            where: {
              orgId: id,
              userId: userId
            }
          })

          res.status(200).json(user)
        } else {
          res.status(403).json("you aren't authorized to make this request")
        }
      } catch (error) {
        console.log('error in the delete org id api call!', error)
      }
    }
  }
}
