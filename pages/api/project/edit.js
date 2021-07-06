/* eslint-disable import/no-anonymous-default-export */

import prisma from '../../../prisma/prisma'

export default async function putProject(req, res) {
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
