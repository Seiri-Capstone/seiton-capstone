/* eslint-disable import/no-anonymous-default-export */

import prisma from '../../../prisma/prisma'

// const testdata = {
//   id: 1,
//   name: 'seiton-test-project',
//   orgId: 1,
//   columns: [
//     {
//       id: 1,
//       title: 'to-do',
//       projectId: 1,
//       index: 3,
//       tasks: [
//         {
//           id: 1,
//           title: 'task1',
//           body: 'watch videos on next.js',
//           columnId: 1,
//           index: 0
//         },
//         {
//           id: 2,
//           title: 'task2',
//           body: 'practice using react hooks by refactoring class components',
//           columnId: 1,
//           index: 1
//         }
//       ]
//     },
//     {
//       id: 2,
//       title: 'in-progress',
//       projectId: 1,
//       index: 2,
//       tasks: [
//         {
//           id: 3,
//           title: 'task3',
//           body: 'read documentation on redux toolkit',
//           columnId: 2,
//           index: 2
//         }
//       ]
//     },
//     {
//       id: 3,
//       title: 'needs-review',
//       projectId: 1,
//       index: 1,
//       tasks: [
//         {
//           id: 5,
//           title: 'task5',
//           body: 'seed the database',
//           columnId: 3,
//           index: 4
//         }
//       ]
//     },
//     {
//       id: 4,
//       title: 'completed',
//       projectId: 1,
//       index: 0,
//       tasks: [
//         {
//           id: 4,
//           title: 'task4',
//           body: 'write prisma schema',
//           columnId: 4,
//           index: 3
//         }
//       ]
//     }
//   ]
// }

export default async function putProject(req, res) {
  try {
    console.log("we're in the put request!")
    // const data = req.body
    const result = await prisma.project.update({
      where: { id: 1 },
      data: { ...testdata }
    })

    res.status(200).json(result)
  } catch (error) {
    console.log('error in the project id api call!', error)
  }
}
