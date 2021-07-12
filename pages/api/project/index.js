import prisma from '../../../prisma/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403).json({
      message: 'You must be signed in to view this page.'
    })
  } else {
    // 📡 GET /api/projects
    if (req.method === 'GET') {
      try {
        //get user by session
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        })

        //get projects that user is associated with
        const result = await prisma.userProject.findMany({
          where: { userId: user.id },
          include: {
            project: {
              include: {
                org: true
              }
            }
          }
        })
        res.status(200).json(result)
      } catch (error) {
        console.error(error) // just for console log purposes
        throw new Error('Error getting projects!')
      }
    } else if (req.method === 'POST') {
      try {
        //get user by session
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        })
        //create new project
        const { name, orgId } = req.body
        const newProject = await prisma.project.create({
          data: {
            name,
            orgId: Number(orgId)
          }
        })
        //create new association between project and current user
        const newUserOrg = await prisma.userProject.create({
          data: { userId: user.id, projectId: newProject.id, isAdmin: true }
        })
        //find all projects belonging to org to send back to thunk
        //is there another way to do this?
        const result = await prisma.org.findUnique({
          where: { id: Number(orgId) },
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
        res.status(200).json(result)
      } catch (error) {
        console.error(error)
        throw new Error('Error creating org!')
      }
    }
  }
}
