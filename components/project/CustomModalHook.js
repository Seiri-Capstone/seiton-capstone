// all it does true false, thats it. Import it when needed
import { useState } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    toggle
  }
}

export default useModal
