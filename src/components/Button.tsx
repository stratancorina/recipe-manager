import React from 'react'

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
}

const Button = ({ onClick, children, disabled, type = "button", className  }: ButtonProps) => {
  return <button type={type} onClick={onClick} disabled={disabled} className={`px-4 py-2 bg-blue-300 rounded cursor-pointer hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}>{children}</button>
}

export default Button