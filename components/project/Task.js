import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { tw } from 'twind'

export default function Task({ task }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.body}</p>
    </div>
  )
}
