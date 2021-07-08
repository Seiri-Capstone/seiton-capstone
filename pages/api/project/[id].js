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
    // 📡 GET /api/project/1
    if (req.method === 'GET') {
      try {
        const { id } = req.query
        const result = await prisma.project.findUnique({
          where: { id: Number(id) },
          include: {
            columns: {
              orderBy: { index: 'asc' },
              include: {
                tasks: {
                  orderBy: { index: 'asc' }
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
        console.log("we're in the put project request!")
        const { name, orgId } = req.body
        const result = await prisma.project.update({
          where: { id: 1 },
          data: { name, orgId }
        })

        res.status(200).json(result)
      } catch (error) {
        console.log('error in the project id api call!', error)
      }
    }
  }
}
