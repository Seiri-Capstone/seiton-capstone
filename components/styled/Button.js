import { tw, apply } from 'twind'

const variantMap = {
  success: 'green',
  primary: 'blue',
  warning: 'yellow',
  info: 'gray',
  danger: 'red'
}

const sizeMap = {
  sm: apply`text-xs py(2 md:1) px-2`,
  md: apply`text-sm py(3 md:2) px-2`,
  lg: apply`text-lg py-2 px-4`,
  xl: apply`text-xl py-3 px-6`
}

const baseStyles = apply`
  w(full md:auto)
  text(sm white uppercase)
  px-4
  border-none
  transition-colors
  duration-300
`

export default function Button({
  size = 'md',
  variant = 'primary',
  round = false,
  disabled = false,
  className,
  children
}) {
  // Collect all styles into one class
  const instanceStyles = apply`
    ${baseStyles}
    bg-${variantMap[variant]}(600 700(hover:& focus:&)))
    ${sizeMap[size]}
    rounded-${round ? 'full' : 'lg'}
    ${disabled && 'bg-gray-400 text-gray-100 cursor-not-allowed'}
  `

  // Allow passed classNames to override instance styles
  return <button className={tw(instanceStyles, className)}>{children}</button>
}
