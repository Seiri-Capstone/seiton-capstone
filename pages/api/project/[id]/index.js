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
    // 📡 GET /api/project/1
    if (req.method === 'GET') {
      try {
        const id = Number(req.query.id)
        const result = await prisma.project.findUnique({
          where: { id: id },
          include: {
            columns: {
              orderBy: { index: 'asc' },
              include: {
                tasks: {
                  orderBy: { index: 'asc' },
                  include: {
                    // comments: {
                    //   orderBy: { createdAt: 'asc' },
                    //   include: {
                    //     user: true
                    //   }
                    // }
                    user: true // TODO(sey)
                  }
                }
              }
            },
            users: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        })

        res.status(200).json(result)
      } catch (error) {
        console.error(error) // Which one is idiomatic?
        throw new Error('Error getting project')
      }
    }

    // PUT api/project/1
    if (req.method === 'PUT') {
      try {
        const { name, orgId } = req.body
        const { id } = req.query
        const result = await prisma.project.update({
          where: { id: id },
          data: { name, orgId }
        })

        res.status(200).json(result)
      } catch (error) {
        console.log('error in the project id api call!', error)
      }
    }

    if (req.method === 'DELETE') {
      try {
        const id = Number(req.query.id)

        const sessionUser = await prisma.userProject.findMany({
          where: { userId: +session.user.sub, projectId: id }
        })

        if (sessionUser[0].isAdmin) {
          console.log("you're a project admin")
          const deletedProject = await prisma.project.delete({
            where: {
              id: id
            }
          })
          res.status(200).json(deletedProject)
        } else {
          res.status(403).json("you're not authorized to make this request!")
        }

        res.status(200).json(deletedProject)
      } catch (error) {
        console.log('error in the delete project id api call!', error)
      }
    }
  }
}
