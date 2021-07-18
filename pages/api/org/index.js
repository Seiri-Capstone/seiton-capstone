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
    // 📡 GET /api/org/
    if (req.method === 'GET') {
      try {
        const sessionUser = await prisma.user.findUnique({
          where: { email: session.user.email }
        })
        //get user by session and eager load org info
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },

          include: {
            orgs: {
              include: {
                org: {
                  include: {
                    projects: {
                      include: {
                        users: true
                      }
                    }
                  }
                }
              }
            }
          }
        })

        const orgs = user.orgs.map(org => {
          return org.org
        })

        // const filteredOrgs = orgs.filter(org => {
        //   // console.log(org.projects)
        //   const newOrg = org.projects.filter(project => {
        //     // console.log(project.users)
        //     return project.users.length > 0
        //   })
        //   return newOrg
        // })

        // const filteredProjects = orgs.filter(org => {
        //   return org.projects.users.length > 0
        // })

        res.status(200).json(orgs)
      } catch (error) {
        console.error(error) // Which one is idiomatic?
        throw new Error('Error getting org!')
      }
    }

    // 📡 POST /api/org/
    if (req.method === 'POST') {
      try {
        const org = req.body

        //get user by session
        const user = await prisma.user.findUnique({
          where: { email: session.user.email }
        })

        //create org
        const newOrg = await prisma.org.create({ data: org })

        //connect user and org
        const result = await prisma.userOrg.create({
          data: {
            user: {
              connect: {
                id: user.id
              }
            },
            org: {
              connect: {
                id: newOrg.id
              }
            },
            isCreator: true
          }
        })

        //wanted to avoid multiple commands, but needed newOrg Id

        res.status(200).json(newOrg)
      } catch (error) {
        console.log('error in org post request', error)
      }
    }
  }
}
