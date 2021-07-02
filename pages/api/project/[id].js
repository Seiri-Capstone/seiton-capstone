/* eslint-disable import/no-anonymous-default-export */

import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  try {
    const { id } = req.query
    console.log(id)
    const result = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        columns: {
          include: { tasks: true }
        }
      }
    })
    res.status(200).json(result)
  } catch (error) {
    console.log('error in the project id api call!', error)
  }
}
