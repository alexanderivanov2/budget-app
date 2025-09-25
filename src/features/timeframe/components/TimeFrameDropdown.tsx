import { useState } from 'react';
import type { TimeFrameType } from '../types/timeframe.types';
import { useTimeFrameContext } from './TimeFrameContext';

const DROPDOWN_ITEMS: TimeFrameType[] = ['allTime', 'year', 'month', 'day'];

interface Props {
    className?: string;
}

const TimeFrameDropdown: React.FC<Props> = ({ className }) => {
    const [show, setShow] = useState(false);
    const { timeFrameType, timeFrameDispatch } = useTimeFrameContext();

    const handleSelectItem = (item: TimeFrameType) => {
        timeFrameDispatch({ type: 'setTimeFrameType', payload: item });
    };

    return (
        <div
            className={`time-frame-dropdown ${className || ''}`}
            onClick={() => setShow((prevValue) => !prevValue)}
        >
            <div className="time-frame-dropdown-selected">{timeFrameType}</div>
            {show && (
                <div className="time-frame-dropdown-items">
                    {DROPDOWN_ITEMS.map((item) => {
                        if (item === timeFrameType) return null;
                        return (
                            <div
                                className="time-frame-dropdown-item"
                                key={item}
                                onClick={() => handleSelectItem(item)}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TimeFrameDropdown;
