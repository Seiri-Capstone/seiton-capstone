import React, { useState } from 'react'
import { tw, apply } from 'twind'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Link from 'next/link'
import NewTask from './NewTask'

export default function Column(props) {
  const column = props.column
  // const btn = apply`text-base rounded-md focus:outline-none`

  const [toggleTask, setToggleTask] = useState(false)
  const toggleNewTask = () => setToggleTask(!toggleTask)

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
              {column.title}({column.tasks.length})
            </h3>
            {
              <button
                onClick={toggleNewTask}
                value={props.value}
                className="flex justify-end"
              >
                <a>+</a>
              </button>
            }
          </div>

          {toggleTask && <NewTask props={props} toggleTask={toggleNewTask} />}
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
        </div>
      )}
    </Draggable>
  )
}
