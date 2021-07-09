import React, { useState, useEffect } from 'react'
import Button from '../../components/styled/Button'
import Card from '../../components/styled/Card'
import { tw } from 'twind'
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={tw`flex flex-col`}>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
}

const Styled = () => {
  return (
    <div className={tw`bg-white dark:bg-black`}>
      <ThemeChanger />
      <h1>Styled</h1>
      <div className={tw`flex bg-gray-200 dark:bg-pink-500`}>
        <Button>Normal Button</Button>
        <Button variant="warning">Warning</Button>
        <Button round disabled>
          Round, Disabled
        </Button>
        <Button className={tw`bg-red-200 text-green-700`} size="xl">
          Overwritten
        </Button>
      </div>
      <div className={tw`flex bg-gray-200`}>
        <Card title="Hello">
          <div>Hello World!</div>
          <Button>Hello!</Button>
        </Card>
      </div>
    </div>
  )
}

export default Styled
