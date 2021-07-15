import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function AuthForm() {
  const [session] = useSession()

  return (
    <div className="flex justify-center content-center">
      <h2>Set your name:</h2>
      <input
        ref={input => input && input.focus()}
        className="my-4 text-lg leading-relaxed"
        name="body"
        value={columnName}
        onChange={e => setColumnName(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  )
}
