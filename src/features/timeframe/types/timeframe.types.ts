export type TimeFrameType = 'allTime' | 'year' | 'month' | 'week' | 'day' | 'custom';
export type TimeFrameDate = Date | null;

export interface TimeFrameContext {
    startDate: TimeFrameDate;
    endDate: TimeFrameDate;
    timeFrameType: TimeFrameType;
    timeFrameDate: Date;
    timeFrameDispatch: React.Dispatch<TimeFrameReducerAction>;
}

export type TimeFrameReducerAction =
    | { type: 'setTimeFrameType'; payload: TimeFrameType }
    | { type: 'setStartDate' | 'setEndDate' | 'setTimeFrameDate'; payload: TimeFrameDate }
    | { type: 'setTimeFrameDate'; payload: Date };

export type TimeFrameReducerState = Omit<TimeFrameContext, 'timeFrameDispatch'>;
