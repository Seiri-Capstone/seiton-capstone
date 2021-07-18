const Circle = ({ color = 'red', toggle }) => {
  const colorOfCircle = `text-${color}-500`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${colorOfCircle}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      onClick={() => {
        toggle()
      }}
    >
      <circle cx="10" cy="10" r="10" />
    </svg>
  )
}

export default Circle
