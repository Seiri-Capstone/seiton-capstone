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
    if (task.length <= 1) return alert("Task isn't long enough")
    const body = { title, task, columnId, index }
    await dispatch(createTask(body))
    props.toggleTask()
    await addTaskSocket(true)
  }

  return (
    <form className="p-4 my-3 max-w-3xl mx-auto space-y-6 bg-gray-50 rounded-lg">
      <label>
        Title:
        <input
          className="w-full p-3 py-2 text-gray-700 border rounded-lg focus:outline-none rows=4 mb-3 focus:outline-none"
          onChange={e => setTitle(e.target.value)}
        ></input>
      </label>
      <label>
        Task:
        <textarea
          className="w-full p-3  text-gray-700 border rounded-lg focus:outline-none rows=4 mt-2 focus:outline-none"
          onChange={e => setTask(e.target.value)}
        ></textarea>
      </label>
      <button
        type="submit"
        className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 p-4 py-2 focus:outline-none"
        onClick={addTask}
      >
        Add Task
      </button>
    </form>
  )
}
