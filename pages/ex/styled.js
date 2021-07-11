import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex flex-col">
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
}

const Styled = () => {
  return (
    <div className="bg-white dark:bg-black">
      <ThemeChanger />
      <h1 className="text-center">Styled</h1>
    </div>
  )
}

export default Styled
