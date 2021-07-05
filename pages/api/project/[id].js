/* eslint-disable import/no-anonymous-default-export */

import prisma from '../../../prisma/prisma'

export default async function getProject(req, res) {
  try {
    const { id } = req.query
    const result = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        columns: {
          include: { tasks: true }
        }
      }
    })

    //order columns based on index brute force-y method
    const colOrder = result.columns.map(col => col.index).sort((a, b) => a - b)

    const columns = result.columns
    let i = 0
    let newColumns = []
    while (i <= colOrder.length) {
      for (let j = 0; j < columns.length; j++) {
        if (colOrder[i] === columns[j].index) {
          newColumns.push(columns[j])
        }
      }
      i++
    }

    const newResults = { ...result, columns: newColumns }
    res.status(200).json(newResults)
  } catch (error) {
    console.log('error in the project id api call!', error)
  }
}
