import { createContext, useContext, useReducer, type Dispatch } from 'react';
import type {
    TimeFrameContext,
    TimeFrameReducerAction,
    TimeFrameReducerState,
} from '../types/timeframe.types';

const initialContext: TimeFrameContext = {
    startDate: null,
    endDate: null,
    timeFrameType: 'allTime',
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

const timeFrameReducer = (state: TimeFrameReducerState, action: TimeFrameReducerAction) => {
    switch (action.type) {
        case 'setTimeFrameType': {
            return { ...state, timeFrameType: action.payload };
        }
        case 'setStartDate': {
            return { ...state, startDate: action.payload };
        }
        case 'setEndDate': {
            return { ...state, endDate: action.payload };
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
    });

    return (
        <TimeframeContext.Provider
            value={{
                timeFrameType: data.timeFrameType,
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
