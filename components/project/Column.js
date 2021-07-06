import React, { useState } from 'react'
import { tw, apply } from 'twind'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Link from 'next/link'
import NewTask from './NewTask'

export default function Column(props) {
  const column = props.column
  const btn = apply`inline-block bg-gray-200 text-base rounded-md m-2 p-2 `

  const [toggleTask, setToggleTask] = useState(false)
  const toggleNewTask = () => setToggleTask(!toggleTask)

  // New task toggle func, passed by props from parent
  // function toggleNewTask(event) {
  //   props.onChange(event.target.value)
  // }

  return (
    <Draggable draggableId={`column-${column.id}`} index={props.index}>
      {provided => (
        <div
          className={tw`bg-gray-200 w-80 rounded-lg m-4 p-4 flex flex-col`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h3 className={tw`text-2xl`} {...provided.dragHandleProps}>
            {column.title}
          </h3>
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
          {
            // column.title == 'to-do' &&
            <button
              onClick={toggleNewTask}
              value={props.value}
              className={tw`flex justify-left ${btn}`}
            >
              <a>+</a>
            </button>
          }
          {toggleTask && <NewTask />}
        </div>
      )}
    </Draggable>
  )
}
