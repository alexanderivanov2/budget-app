import { useState, type ChangeEvent } from 'react';
import { useTimeFrameContext } from './TimeFrameContext';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const TimeFrameNavigator: React.FC = () => {
    const [navigatorDate, setNavigatorDate] = useState(() => new Date());
    const { timeFrameType, timeFrameDate, timeFrameDispatch } = useTimeFrameContext();
    if (timeFrameType === 'allTime') return null;

    const getNavigatorInputData = () => {
        switch (timeFrameType) {
            case 'year': {
                return {
                    inputType: 'year',
                    inputValue: navigatorDate.getFullYear(),
                };
            }
            case 'month': {
                const month = navigatorDate.getMonth() || 0;
                const monthValue = MONTHS[month];
                return {
                    inputType: 'month',
                    inputValue: monthValue,
                };
            }
            case 'day': {
                return {
                    inputType: 'day',
                    inputValue: navigatorDate.getDate(),
                };
            }
            default: {
                return {
                    inputType: 'year',
                    inputValue: navigatorDate.getFullYear(),
                };
            }
        }
    };

    const handleChangeNavigatorInputDate = (e: ChangeEvent) => {
        console.log(e.currentTarget);
    };

    const prevYear = () => {
        const dateUpdate = new Date(timeFrameDate);
        dateUpdate.setFullYear(dateUpdate.getFullYear() - 1);
        timeFrameDispatch({ type: 'setTimeFrameDate', payload: dateUpdate });
    };

    const prevMonth = () => {
        const dateUpdate = new Date(timeFrameDate);
        const monthValue = dateUpdate.getMonth();
        const newMonth = monthValue ? monthValue - 1 : 11;
        dateUpdate.setMonth(newMonth);
        timeFrameDispatch({ type: 'setTimeFrameDate', payload: dateUpdate });
    };

    const prevDay = () => {
        const dateUpdate = new Date(timeFrameDate);
        const dayValue = dateUpdate.getDate() - 1;

        // use Date overflow - 1;
        dateUpdate.setDate(dayValue);
        timeFrameDispatch({ type: 'setTimeFrameDate', payload: dateUpdate });
    };

    const nextDay = () => {
        const dateUpdate = new Date(timeFrameDate);
        const dayValue = dateUpdate.getDate() + 1;

        // use Date overflow + 1
        dateUpdate.setDate(dayValue);
        timeFrameDispatch({ type: 'setTimeFrameDate', payload: dateUpdate });
    };

    const nextMonth = () => {
        const dateUpdate = new Date(timeFrameDate);
        const monthValue = dateUpdate.getMonth();
        const newMonth = monthValue === 11 ? 0 : monthValue + 1;
        dateUpdate.setMonth(newMonth);
        timeFrameDispatch({ type: 'setTimeFrameDate', payload: dateUpdate });
    };

    const nextYear = () => {
        const dateUpdate = new Date(timeFrameDate);
        dateUpdate.setFullYear(dateUpdate.getFullYear() + 1);
        timeFrameDispatch({ type: 'setTimeFrameDate', payload: dateUpdate });
    };

    const handlePrevChangeTimeFrameNavigator = () => {
        if (timeFrameType === 'year') {
            prevYear();
        } else if (timeFrameType === 'month') {
            prevMonth();
        } else if (timeFrameType === 'day') {
            prevDay();
        }
    };

    const handleNextChangeTimeFrameNavigator = () => {
        if (timeFrameType === 'year') {
            nextYear();
        } else if (timeFrameType === 'month') {
            nextMonth();
        } else if (timeFrameType === 'day') {
            nextDay();
        }
    };

    return (
        <div className="time-frame-navigator">
            <p>
                <span>YEAR: {navigatorDate.getFullYear()} </span>
                <span>MONTH: {MONTHS[navigatorDate.getMonth()]} </span>
                <span>DAY: {navigatorDate.getDate()} </span>
            </p>
            <div className="time-frame-navigator-prev" onClick={handlePrevChangeTimeFrameNavigator}>
                prev
            </div>
            <div className="time-frame-navigator-current-input">
                <div>
                    ({timeFrameType}: {timeFrameDate.toLocaleDateString()}){' '}
                </div>
            </div>
            <div className="time-frame-navigator-next" onClick={handleNextChangeTimeFrameNavigator}>
                next
            </div>
        </div>
    );
};

export default TimeFrameNavigator;
