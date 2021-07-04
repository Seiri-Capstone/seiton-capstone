import React from 'react'
import { tw } from 'twind'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function Column(props) {
  const column = props.column
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
                    <Task task={task} key={task.id} index={index} />
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
