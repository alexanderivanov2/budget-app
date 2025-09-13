import { createContext, useContext, useReducer, type Dispatch } from 'react';

type TimeFrameType = 'allTime' | 'year' | 'month' | 'week' | 'day' | 'custom';
type TimeFrameDate = Date | null;

interface TimeFrameContext {
    startDate: TimeFrameDate;
    endDate: TimeFrameDate;
    timeFrameType: TimeFrameType;
    timeFrameDispatch: React.Dispatch<TimeFrameReducerAction>;
}

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
type TimeFrameReducerAction =
    | { type: 'setTimeFrameType'; payload: TimeFrameType }
    | { type: 'setStartDate' | 'setEndDate'; payload: TimeFrameDate };

type TimeFrameReducerState = Omit<TimeFrameContext, 'timeFrameDispatch'>;

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
