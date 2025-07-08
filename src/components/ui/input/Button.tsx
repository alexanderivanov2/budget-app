import React from 'react'

interface Props {
    btnText: string,
    className: string,
    id?: string,
    disabled?: boolean,
    onClick?: () => void,
    onSubmit?: () => void,
    onHover?: () => void,
    onFocus?: () => void,
    onBlur?: () => void,
}

const Button = ({btnText, ...args}: Props) => {
  return <button {...args}>{btnText}</button>
}

export default Button