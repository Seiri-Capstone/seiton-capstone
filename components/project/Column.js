import React from 'react'
import { tw } from 'twind'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

export default function Column({ column }) {
  return (
    <div className={tw`flex flex-col border border-gray-300`}>
      <h5 className={tw`flex font-bold justify-center m-2 mb-5`}>
        {column.title}
      </h5>
      <div
        className={tw`mx-4 border border-gray-400 rounded-lg flex flex-col bg-white w-[200px] p-2 w-auto`}
      >
        <Droppable droppableId={String(column.id)}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {column.tasks.map((task, index) => {
                return <Task task={task} key={task.id} index={index} />
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}
