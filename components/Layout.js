import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/client'

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { _, setTheme } = useTheme()
  const [session, loading] = useSession()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex justify-end">
      <div>Logged in as: {loading ? '' : session.user.name}</div>
      <button
        className="mx-4 border px-2 border-gray-500"
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button
        className="border px-2 border-gray-500"
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
    </div>
  )
}

const Layout = ({ children }) => {
  return (
    <div>
      <ThemeChanger />
      {children}
      <div>Footer</div>
    </div>
  )
}

export default Layout
