/* eslint-disable import/no-anonymous-default-export */
import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    // 📡 GET /api/org/:id
    if (req.method === 'GET') {
      try {
        const { id } = req.query
        //get user by session
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        })

        const result = await prisma.org.findUnique({
          where: { id: Number(id) },
          include: {
            projects: {
              include: {
                users: true
              }
            },
            users: {
              include: {
                user: true
              }
            }
          }
        })

        const filteredProjects = result.projects.filter((project, idx) => {
          return project.users[idx] && project.users[idx].userId === user.id
        })

        const userResults = { ...result, projects: filteredProjects }

        res.status(200).json(userResults)
      } catch (error) {
        console.error(error) // Which one is idiomatic?
        throw new Error('Error getting org!')
      }
    }
  }
}
