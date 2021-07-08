import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { tw } from 'twind'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../store/projectSlice'

export default function Task(props) {
  const { task } = props
  const dispatch = useDispatch()
  const taskId = task.id

  const submitHandle = event => {
    dispatch(deleteTask(event.target.value))
  }
  return (
    <Draggable draggableId={`task-${task.id}`} index={props.index}>
      {provided => (
        <div
          className={tw`flex flex-col bg-white rounded-lg my-4 p-1 hover:bg-gray-100`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={tw`flex flex-row justify-between items-center`}>
            <h3>{task.title}</h3>
            <button value={taskId} onClick={submitHandle} className={tw`mr-2`}>
              ...(D&E)
            </button>
          </div>
          <p>{task.body}</p>
        </div>
      )}
    </Draggable>
  )
}
