import React, { useState } from 'react'
import { tw } from 'twind'

const task = {
  title: 'task1',
  body: 'watch videos on next.js',
  columnId: 1,
  index: 0
}
export default function EditTaskModal() {
  const [visibleTaskModal, setVisibleTaskModal] = useState(false)

  return (
    <div className={tw`container mx-auto`}>
      <section>
        <button
          className={tw`border px-2 rounded text-blue-800 hover:text-blue-500 border-blue-500`}
          onClick={() => setVisibleTaskModal(!visibleTaskModal)}
        >
          Hide
        </button>
        <h1>{task.title}</h1>
        <textarea value={task.body}></textarea>
      </section>
    </div>
  )
}
