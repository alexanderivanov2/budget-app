interface Props {
    className?: string;
}

const TimeFrameDropdown: React.FC<Props> = ({ className }) => {
    return <div className={`time-frame-dropdown ${className || ''}`}>DROPDOWN</div>;
};

export default TimeFrameDropdown;
