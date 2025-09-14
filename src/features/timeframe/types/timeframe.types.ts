export type TimeFrameType = 'allTime' | 'year' | 'month' | 'week' | 'day' | 'custom';
export type TimeFrameDate = Date | null;

export interface TimeFrameContext {
    startDate: TimeFrameDate;
    endDate: TimeFrameDate;
    timeFrameType: TimeFrameType;
    timeFrameDispatch: React.Dispatch<TimeFrameReducerAction>;
}

export type TimeFrameReducerAction =
    | { type: 'setTimeFrameType'; payload: TimeFrameType }
    | { type: 'setStartDate' | 'setEndDate'; payload: TimeFrameDate };

export type TimeFrameReducerState = Omit<TimeFrameContext, 'timeFrameDispatch'>;
