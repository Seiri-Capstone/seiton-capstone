import React, { useState } from 'react'

import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Link from 'next/link'
import NewTask from './NewTask'
import { deleteColumn, updateColumnName } from '../../store/projectSlice'
import { useDispatch } from 'react-redux'
import DeleteColumnModal from '../../components/project/DeleteColumnModal'
import Circle from '../styled/circle'

export default function Column(props) {
  const { setCol, delCol, addTask, column, colColor, setPin, taskEdit } = props
  const dispatch = useDispatch()

  const [columnName, setColumnName] = useState(column.title)
  const [isEditActive, setEditActive] = useState(false)
  const [colorI, setColorI] = useState(0)
  const [colors, setColors] = useState([
    'red',
    'green',
    'purple',
    'yellow',
    'orange'
  ])
  const loopColor = () => {
    let x
    if (colorI === colors.length - 1) x = 0
    else x = colorI + 1
    setColorI(x)
  }

  // Confirm Delete Column Modal
  const [isShowing, setIsShowing] = useState(false)
  const [isClosed, setClosed] = useState(false)

  function toggle() {
    setClosed(!isClosed)
    setIsShowing(!isShowing)
  }

  const [toggleTask, setToggleTask] = useState(false)
  const toggleNewTask = () => setToggleTask(!toggleTask)

  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      setEditActive(false)
      //need to force into an array to pass down new state change?
      await dispatch(updateColumnName([column, columnName]))
      await setCol(true)
    } else if (e.key === 'Escape') {
      setEditActive(false)
    }
  }

  // const removeColumn = async e => {
  //   // make sure there are confirmations here...
  //   await dispatch(deleteColumn(column.id))
  //   await delCol(true)
  // }

  return (
    <Draggable
      // isDragDisabled={column.pinned} // true or false depending on column
      draggableId={`column-${column.id}`}
      index={props.index}
    >
      {provided => (
        <div
          className={`bg-${colColor}-200 border-${colColor}-300 border-2 w-80 rounded-lg m-4 p-4 flex flex-col`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row">
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
              </h3>
              <div className="text-xl ml-1 self-end">
                ({column.tasks.length})
              </div>
              {/* dots */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => console.log('color switch')}
              >
                <circle cx="10" cy="10" r="10" />
              </svg> */}
              <Circle color={colors[colorI]} toggle={loopColor} />
              {/* ✏️ Pencil, cannot import with hero icon under draggable 🤷‍♂️ */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4 self-center"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setEditActive(!isEditActive)}
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>

            <div className="flex justify-end">
              <button
                onClick={toggleNewTask}
                value={props.value}
                className="mr-4 px-2 focus:outline-none "
              >
                <a>+</a>
              </button>

              {/* CONFIRM THAT IT IS CLOSING */}
              <button
                onClick={() => {
                  setIsShowing(true)
                }}
              >
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
                      <Task
                        setPin={setPin}
                        task={task}
                        key={task.id}
                        index={index}
                        taskEdit={taskEdit}
                      />
                    </>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <DeleteColumnModal
            isShowing={isShowing}
            // toggle={toggle}
            colId={column.id}
            delCol={delCol}
            onClose={() => setIsShowing(!isShowing)}
          />
          <div id="columnDeleteModal"></div>
        </div>
      )}
    </Draggable>
  )
}
