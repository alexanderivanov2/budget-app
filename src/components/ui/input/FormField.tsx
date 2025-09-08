import React from 'react';
import Label from './Label';
import Input from './Input';
import ErrorOutput from './ErrorOutput';

interface Props {
    label: {
        htmlFor: string;
        className?: string;
        label?: string | React.ReactNode;
    };
    input?: {
        id: string;
        className?: string;
        type: string;
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
    };
    error?: {
        message?: string;
        className?: string;
    };
    className?: string;
    children?: React.ReactNode;
}

const FormField: React.FC<Props> = ({ label, input, error, children }: Props) => {
    return (
        <div className="form-field">
            <Label htmlFor={label.htmlFor} className={label.className}>
                {label.label}
            </Label>
            {children || (input && <Input {...input} />)}
            {error?.message && (
                <ErrorOutput className={error.className}>{error.message}</ErrorOutput>
            )}
        </div>
    );
};

export default FormField;
