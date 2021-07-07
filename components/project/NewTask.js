import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tw } from 'twind'
// import useForm from 'react-hook-form'
import { createTask } from '../../store/projectSlice'

export default function NewTask(props) {
  const [task, setTask] = useState('')
  const [title, setTitle] = useState('')
  const columnId = props.props.column.id
  const index = props.props.column.tasks.length
  const dispatch = useDispatch()

  const addTask = e => {
    e.preventDefault()
    if (task.length <= 1) return alert("Task isn't long enough")
    const body = { title, task, columnId, index }
    dispatch(createTask(body))
    props.toggleTask()
  }

  return (
    <form
      className={tw`px-4 my-3 max-w-3xl mx-auto space-y-6 bg-gray-50 rounded-lg`}
    >
      <label>
        Title:
        <input
          className={tw`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none rows=4 mb-3 focus:outline-none`}
          onChange={e => setTitle(e.target.value)}
        ></input>
      </label>
      <label>
        Task:
        <textarea
          className={tw`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4 mt-2 focus:outline-none`}
          onChange={e => setTask(e.target.value)}
        ></textarea>
      </label>
      <button
        type="submit"
        className={tw`bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-4 py-2 focus:outline-none`}
        onClick={addTask}
      >
        Add Task
      </button>
    </form>
  )
}
