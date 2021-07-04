import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { tw } from 'twind'

export default function Task({ task }) {
  return (
    <div className={tw`bg-white rounded-lg my-4 p-1`}>
      <h3>{task.title}</h3>
      <p>{task.body}</p>
    </div>
  )
}
