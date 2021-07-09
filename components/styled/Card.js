import { tw, apply } from 'twind'

const variantMap = {
  green: 'green',
  primary: 'gray',
  warning: 'yellow',
  variant: 'red'
}

const baseStyle = apply`
	flex flex-col justify-between items-center
	border border-gray-400 shadow-lg p-2
`

export default function Card({
  variant = 'primary',
  title = 'Hello',
  round = false,
  className,
  children
}) {
  const instanceStyles = apply`
	${baseStyle}
	bg-${variantMap[variant]}
	rounded-${round ? 'full' : 'lg'}
	`
  return (
    <div className={tw(instanceStyles, className)}>
      <h1 className="text-2xl font-light">{title}</h1>
      {children}
    </div>
  )
}
