import React, { useState } from 'react'
import { tw, css } from 'twind/css'

export default function Modal({ show, onClose }) {
  if (!show) return null
  return (
    <div
      className={tw`bg-opacity-0 fixed flex-1 items-center justify-center`}
      onClick={onClose}
    >
      <div className={tw`container mx-auto`} onClick={e => e.stopPropagation()}>
        <div>
          <h1>modal title</h1>
          <div>modal body</div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
