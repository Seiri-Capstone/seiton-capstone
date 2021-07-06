import React, { useState } from 'react'
import { tw } from 'twind'

export default function NewTask() {
  // const [task, setTask] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={tw`px-4 my-32 max-w-3xl mx-auto space-y-6 bg-gray-50`}
    >
      <label>
        Task:
        <textarea
          className={tw`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4 mt-5`}
        ></textarea>
      </label>
      <button
        type="button"
        className={tw`bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-4 py-2 focus:outline-none`}
      >
        Add Task
      </button>
    </form>
  )
}
