import React, { useState } from 'react'
import { tw, css } from 'twind/css'
import ReactDOM from 'react-dom'

export default function Modal({ task, show, onClose }) {
  if (!show) return null
  return ReactDOM.createPortal(
    <div
      className={tw`bg-opacity-0 fixed flex-1 items-center justify-center`}
      onClick={onClose}
    >
      <div className={tw`container mx-auto`} onClick={e => e.stopPropagation()}>
        <div>
          <h1>{task.title}</h1>
          <div>{task.body}</div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.getElementById('root')
  )
}
