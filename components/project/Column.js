import React from 'react'
import { tw } from 'twind'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function Column() {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <div
          className={tw`mx-4 border border-gray-400 rounded-lg flex flex-col bg-white w-[250px]`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h3 className={tw`my-4 mx-0`} {...provided.dragHandleProps}>
            {props.column.title}
          </h3>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={tw`p-4 min-h-[100px] bg-pink-50`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
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
