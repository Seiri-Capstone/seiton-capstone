/* eslint-disable import/no-anonymous-default-export */
import prisma from '../../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    //DELETE api/org/:id/users
    if (req.method === 'DELETE') {
      try {
        const id = Number(req.query.id)
        const userId = Number(req.body.userId)

        console.log('user', userId)

        //get user by session
        const user = await prisma.userOrg.findUnique({
          where: { userId: userId, orgId: id }
        })

        console.log('user', user)

        if (user.isCreator) {
          console.log("you're an org creator")
          const deletedUserOrg = await prisma.userOrg.delete({
            where: {
              orgId: id,
              userId: userId
            }
          })

          res.status(200).json(deletedUserOrg)
        } else {
          res.status(403).json("you aren't authorized to make this request")
        }
      } catch (error) {
        console.log('error in the delete org id api call!', error)
      }
    }
  }
}
