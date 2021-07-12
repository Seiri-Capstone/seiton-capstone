import React, { useState } from 'react'

import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Link from 'next/link'
import NewTask from './NewTask'
import { deleteColumn, updateColumnName } from '../../store/projectSlice'
import { useDispatch } from 'react-redux'

export default function Column(props) {
  const { setCol, delCol, addTask, column } = props
  const dispatch = useDispatch()

  const [columnName, setColumnName] = useState(column.title)
  const [isEditActive, setEditActive] = useState(false)

  const [toggleTask, setToggleTask] = useState(false)
  const toggleNewTask = () => setToggleTask(!toggleTask)

  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      setEditActive(false)
      //need to force into an array to pass down new state change?
      await dispatch(updateColumnName([column, columnName]))
      await setCol(true)
    }
  }

  const removeColumn = async e => {
    await dispatch(deleteColumn(column.id))
    await delCol(true)
  }

  return (
    <Draggable draggableId={`column-${column.id}`} index={props.index}>
      {provided => (
        <div
          className="bg-gray-200 w-80 rounded-lg m-4 p-4 flex flex-col"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-2xl" {...provided.dragHandleProps}>
              {isEditActive ? (
                <input
                  ref={input => input && input.focus()}
                  className="my-4 text-lg leading-relaxed"
                  name="body"
                  value={columnName}
                  onChange={e => setColumnName(e.target.value)}
                  onKeyDown={handleKeyDown}
                ></input>
              ) : (
                column.title
              )}
              ({column.tasks.length})
            </h3>
            <div className="flex justify-end">
              <button
                onClick={toggleNewTask}
                value={props.value}
                className="mr-4 px-2 focus:outline-none "
              >
                <a>+</a>
              </button>

              <button onClick={removeColumn}>
                <a>x</a>
              </button>
            </div>
          </div>

          {toggleTask && (
            <NewTask
              addTaskSocket={addTask}
              props={props}
              toggleTask={toggleNewTask}
            />
          )}
          <Droppable droppableId={`column-${column.id}`} type="task">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {column.tasks &&
                  column.tasks.map((task, index) => (
                    <>
                      <Task task={task} key={task.id} index={index} />
                    </>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <button onClick={() => setEditActive(true)}>Edit Column Name</button>
        </div>
      )}
    </Draggable>
  )
}
