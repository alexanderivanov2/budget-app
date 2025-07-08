import React from 'react'

interface Props {
    for: string,
    className: string,
    children: React.ReactNode,
}

const Label = ({children, ...args}: Props) => {
  return (
    <label {...args}>{children}</label>
  )
}

export default Label;