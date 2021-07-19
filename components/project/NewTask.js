import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTask } from '../../store/projectSlice'

export default function NewTask(props) {
  const { addTaskSocket } = props
  const [task, setTask] = useState('')
  const [title, setTitle] = useState('')
  const columnId = props.props.column.id
  const index = props.props.column.tasks.length
  const dispatch = useDispatch()

  const addTask = async e => {
    e.preventDefault()
    const body = { title, task, columnId, index }
    await dispatch(createTask(body))
    props.toggleTask()
    await addTaskSocket(true)
  }

  return (
    <form className="flex flex-col mx-auto rounded-lg w-full">
      <input
        placeholder="Task Title"
        className="text-sm w-full p-1 px-2 text-gray-700 rounded-lg focus:outline-none"
        onChange={e => setTitle(e.target.value)}
      ></input>

      <textarea
        placeholder="Task Body"
        className="text-sm w-full p-1 px-2 text-gray-700 rounded-lg border-none focus:outline-none mt-2"
        onChange={e => setTask(e.target.value)}
      ></textarea>

      <button
        type="submit"
        className="bg-transparent text-sm text-white rounded p-4 py-2 focus:outline-none self-center"
        onClick={addTask}
      >
        + Add Task
      </button>
    </form>
  )
}
