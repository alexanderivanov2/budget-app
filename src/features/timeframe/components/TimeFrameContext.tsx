import { createContext, useContext, useReducer } from 'react';
import type {
    TimeFrameContext,
    TimeFrameReducerAction,
    TimeFrameReducerState,
    TimeFrameType,
} from '../types/timeframe.types';
import { getDaysInMonth } from '../../../utils/dateUtils';

const initialContext: TimeFrameContext = {
    startDate: null,
    endDate: null,
    timeFrameType: 'allTime',
    timeFrameDate: new Date(),
    timeFrameDispatch: () => {},
};

const TimeframeContext = createContext(initialContext);

export const useTimeFrameContext = () => {
    const context = useContext(TimeframeContext);

    if (!context) {
        throw 'TimeFrameContext must be used within a TimeContextProvider';
    }

    return context;
};

const getStartEndDates = (currentDate: Date, timeFrameType: TimeFrameType) => {
    const startEndDateResult: { startDate: null | Date; endDate: null | Date } = {
        startDate: null,
        endDate: null,
    };
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    // 1 = monday, 0 = sunday
    const daysInTheMonth = getDaysInMonth(year, month + 1);

    if (timeFrameType === 'year') {
        startEndDateResult.startDate = new Date(year, 11, 31);
        startEndDateResult.endDate = new Date(year, 0, 1);
    } else if (timeFrameType === 'month') {
        startEndDateResult.startDate = new Date(year, month, daysInTheMonth);
        startEndDateResult.endDate = new Date(year, month, 1);
    } else if (timeFrameType === 'day') {
        startEndDateResult.startDate = new Date(year, month, day);
        startEndDateResult.endDate = new Date(year, month, day);
    }

    console.log(startEndDateResult);
    return startEndDateResult;
};

const timeFrameReducer = (state: TimeFrameReducerState, action: TimeFrameReducerAction) => {
    switch (action.type) {
        case 'setTimeFrameType': {
            const { startDate, endDate } = getStartEndDates(state.timeFrameDate, action.payload);
            return {
                ...state,
                startDate: startDate,
                endDate: endDate,
                timeFrameType: action.payload,
            };
        }
        case 'setStartDate': {
            return { ...state, startDate: action.payload };
        }
        case 'setEndDate': {
            return { ...state, endDate: action.payload };
        }
        case 'setTimeFrameDate': {
            if (!action.payload) return state;
            const { startDate, endDate } = getStartEndDates(action.payload, state.timeFrameType);
            return {
                ...state,
                startDate: startDate,
                endDate: endDate,
                timeFrameDate: action.payload,
            };
        }
    }
};

interface Props {
    children: React.ReactNode;
}

const TimeFrameProvider: React.FC<Props> = ({ children }) => {
    const [data, dispatch] = useReducer(timeFrameReducer, {
        startDate: null,
        endDate: null,
        timeFrameType: 'allTime',
        timeFrameDate: new Date(),
    });

    return (
        <TimeframeContext.Provider
            value={{
                timeFrameType: data.timeFrameType,
                timeFrameDate: data.timeFrameDate,
                startDate: data.startDate,
                endDate: data.endDate,
                timeFrameDispatch: dispatch,
            }}
        >
            {children}
        </TimeframeContext.Provider>
    );
};

export default TimeFrameProvider;
