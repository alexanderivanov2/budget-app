import React from 'react';
interface Props {
    id?: string;
    className?: string;
    type?: string;
    name?: string;
    value?: string | number;
    placeholder?: string;
    disabled?: boolean;
    ref?: React.RefObject<HTMLInputElement>;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = (props: Props) => {
    return <input {...props} />;
};

export default Input;
