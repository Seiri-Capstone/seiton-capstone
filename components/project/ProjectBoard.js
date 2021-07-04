import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { tw } from 'twind'
import { fetchProject } from '../../store/projectSlice'

export default function ProjectBoard() {
  const data = useSelector(state => state.project)
  const dispatch = useDispatch()
  const [project, setProject] = useState(data)

  useEffect(() => {
    dispatch(fetchProject(1))
    setProject(project)
  }, [])
  // console.log(data)

  //function needed to keep the state updated
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    // //If there is no destination
    if (!destination) {
      return
    }
    // //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = source.droppableId
    const finish = destination.droppableId
    if (start === finish) {
      const column = data.columns.filter(col => col.id === +start)
      const tasks = column[0].tasks
      const taskIds = column[0].tasks.map(task => task.id)

      console.log('column', column)

      taskIds.splice(source.index, 1)
      taskIds.splice(destination.index, 0, +draggableId)

      const newTaskIndex = []
      let i = 0
      while (i < taskIds.length) {
        for (let j = 0; j < tasks.length; j++) {
          if (taskIds[i] === tasks[j].id) {
            newTaskIndex.push(tasks[j])
          }
        }
        i++
      }
      const updatedTasks = newTaskIndex.map((task, idx) => {
        return { ...task, index: idx }
      })
      // console.log('newtaskindex', newTaskIndex)
      console.log('updated tasks', updatedTasks)

      //output required: column = [{task2}, {task1}]
      const updatedColumn = data.columns.map(col => {
        if (col.id === +start) {
          return { ...col, tasks: updatedTasks }
        }
        return col
      })

      const newState = {
        ...data,
        columns: updatedColumn
      }

      setProject(newState)
      console.log('newstate', newState)
    }
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={tw`mx-auto flex justify-center `}>
          {data.columns &&
            data.columns.map(column => (
              <Column key={column.id} column={column} />
            ))}
        </div>
      </DragDropContext>
    </div>
  )
}
