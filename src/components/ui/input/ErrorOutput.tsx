import React from 'react';
interface Props {
    className?: string;
    children: React.ReactNode;
}
const ErrorOutput = ({ children, ...args }: Props) => {
    return <div {...args}>{children}</div>;
};

export default ErrorOutput;
