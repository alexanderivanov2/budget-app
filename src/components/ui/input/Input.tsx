import React  from 'react'
interface Props {
    id: string,
    className: string,
    type: string,
    value?: string | number,
    placeholder?: string,
    disabled?: boolean,
    ref?: React.RefObject<HTMLInputElement>,
    onClick?: () => void,
    onChange?: () => void,
    onFocus?: () => void,
    onInput?: () => void,
    onBlur?: () => void,
}   

const Input = (props: Props) => {
  return <input {...props} />
}

export default Input