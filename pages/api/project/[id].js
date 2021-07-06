/* eslint-disable import/no-anonymous-default-export */

import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
  // 📡 GET /api/project/1
  if (req.method === 'GET') {
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

      //incredibly not optimal very brute force-y

      //order tasks within a column by its index
      const columns = result.columns
      const tasks = columns.map(col => col.tasks)

      //get array of sorted indexes
      const taskIndex = []
      for (let i = 0; i < columns.length; i++) {
        let colTask = []
        for (let j = 0; j < columns[i].tasks.length; j++) {
          colTask.push(columns[i].tasks[j].index)
        }
        taskIndex.push(colTask)
      }

      const sortedTaskIdx = taskIndex.map(task => task.sort((a, b) => a - b))

      //match index back to task and in order
      let newTasks = []
      let k = 0

      while (k < sortedTaskIdx.length) {
        let innerArr = []
        for (let i = 0; i < sortedTaskIdx[k].length; i++) {
          for (let j = 0; j < tasks[k].length; j++) {
            if (sortedTaskIdx[k][i] === tasks[k][j].index) {
              innerArr.push(tasks[k][j])
            }
          }
        }
        newTasks.push(innerArr)
        k++
      }

      //order column by index
      const colOrder = result.columns
        .map(col => col.index)
        .sort((a, b) => a - b)

      let i = 0
      let newColumns = []
      while (i <= colOrder.length) {
        for (let j = 0; j < columns.length; j++) {
          if (colOrder[i] === columns[j].index) {
            columns[j].tasks = newTasks[j] //add newly ordered task to the columns's task field
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

  // 📡 PUT api/project/1
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
