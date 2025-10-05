import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import type {
    Action,
    DataContextType,
    MetaMinDateData,
    State,
    TransactionsTypes,
} from './types/DataContextTypes';
import { getYearMonthDay, isDatesEqual, isPastDate } from '../utils/dateUtils';

const DataContext = createContext<DataContextType>({
    transactions: {},
    incomeData: {},
    expenseData: {},
    transactionsCount: 0,
    incomeCount: 0,
    expenseCount: 0,
    initialDate: new Date(),
    metaMinDateData: {
        income: null,
        expense: null,
        all: null,
    },
    dataDispatch: () => {},
});

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('DataContext must be used within a DataProvider');
    return context;
};

interface Props {
    children: React.ReactNode;
}

const dataReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'addIncome': {
            const { year, month, day } = getYearMonthDay(action.payload.date);
            const incomeDataItem = {
                id: action.payload.id,
                date: action.payload.date,
            };
            state.transactions = {
                ...state.transactions,
                [action.payload.id]: action.payload,
            };

            const isRecordExist = state.incomeData?.[year]?.[month]?.[day]?.find(
                (item) => item.id === incomeDataItem.id,
            );
            if (!isRecordExist) {
                return {
                    ...state,
                    incomeData: {
                        ...state.incomeData,
                        [year]: {
                            ...(state.incomeData[year] ?? {}),
                            [month]: {
                                ...(state.incomeData[year]?.[month] ?? {}),
                                [day]: state.incomeData[year]?.[month]?.[day]
                                    ? [...state.incomeData[year][month][day], incomeDataItem]
                                    : [incomeDataItem],
                            },
                        },
                    },
                };
            }
            return { ...state };
        }
        case 'addExpense': {
            const { year, month, day } = getYearMonthDay(action.payload.date);
            const expenseDataItem = {
                id: action.payload.id,
                date: action.payload.date,
            };

            state.transactions = {
                ...state.transactions,
                [action.payload.id]: action.payload,
            };

            const isRecordExist = state.expenseData?.[year]?.[month]?.[day]?.find(
                (item) => item.id === expenseDataItem.id,
            );

            if (!isRecordExist) {
                return {
                    ...state,
                    expenseData: {
                        ...state.expenseData,
                        [year]: {
                            ...(state.expenseData[year] ?? {}),
                            [month]: {
                                ...(state.expenseData[year]?.[month] ?? {}),
                                [day]: [
                                    ...(state.expenseData[year]?.[month]?.[day] ?? []),
                                    expenseDataItem,
                                ],
                            },
                        },
                    },
                };
            }
            return { ...state };
        }
        case 'setDate': {
            return { ...state };
        }
        case 'deleteTransaction': {
            const { type, date, id } = action.payload;
            const { year, month, day } = getYearMonthDay(new Date(date));
            const dataKey: 'incomeData' | 'expenseData' = `${type}Data`;
            const data = state[dataKey]?.[year]?.[month]?.[day];

            if (data) {
                const newDayData = data.filter((transaction) => transaction.id !== id);
                const { [id]: _removedTransaction, ...newTransactions } = { ...state.transactions };
                return {
                    ...state,
                    transactions: newTransactions,
                    [dataKey]: {
                        ...state[dataKey],
                        [year]: {
                            ...state[dataKey][year],
                            [month]: {
                                ...state[dataKey][year][month],
                                [day]: newDayData,
                            },
                        },
                    },
                };
            }
            return { ...state };
        }
        case 'editTransaction': {
            const { type, date, id } = action.payload;
            if (!date) return state;

            const { year, month, day } = getYearMonthDay(new Date(date));
            const dataKey: 'incomeData' | 'expenseData' = `${type}Data`;
            const data = state?.[dataKey]?.[year]?.[month]?.[day] ?? [];
            const transactionData = state.transactions[id];

            if (transactionData) {
                const { date: transactionDate } = transactionData;
                if (!transactionDate) return state;

                const {
                    year: trYear,
                    month: trMonth,
                    day: trDay,
                } = getYearMonthDay(new Date(transactionDate));

                const isSameDate = trYear === year && trMonth === month && trDay === day;

                if (isSameDate) {
                    const newDayData = data.map((transaction) => {
                        if (transaction.id === id) {
                            return {
                                id,
                                date: date,
                            };
                        }
                        return transaction;
                    });
                    return {
                        ...state,
                        transactions: {
                            ...state.transactions,
                            [id]: { ...action.payload },
                        },
                        [dataKey]: {
                            ...(state[dataKey] || {}),
                            [year]: {
                                ...(state?.[dataKey]?.[year] || {}),
                                [month]: {
                                    ...(state?.[dataKey]?.[year]?.[month] || {}),
                                    [day]: newDayData,
                                },
                            },
                        },
                    };
                }

                const filterOldDay =
                    state?.[dataKey]?.[trYear]?.[trMonth]?.[trDay].filter(
                        (dayTransaction) => dayTransaction.id !== transactionData.id,
                    ) || [];
                const newEditDay = [
                    ...(state[dataKey]?.[year]?.[month]?.[day] || []),
                    { id: action.payload.id, date: action.payload.date },
                ];

                if (trYear === year && trMonth === month) {
                    return {
                        ...state,
                        transactions: {
                            ...state.transactions,
                            [id]: { ...action.payload },
                        },
                        [dataKey]: {
                            ...(state?.[dataKey] || {}),
                            [year]: {
                                ...(state?.[dataKey]?.[year] || {}),
                                [month]: {
                                    ...(state?.[dataKey]?.[year]?.[month] || {}),
                                    [trDay]: filterOldDay,
                                    [day]: newEditDay,
                                },
                            },
                        },
                    };
                }

                return {
                    ...state,
                    transactions: {
                        ...state.transactions,
                        [id]: { ...action.payload },
                    },
                    [dataKey]: {
                        ...(state[dataKey] || {}),
                        [trYear]: {
                            ...(state?.[dataKey]?.[trYear] || {}),
                            [trMonth]: {
                                ...(state?.[dataKey]?.[trYear]?.[trMonth] || {}),
                                [trDay]: filterOldDay,
                            },
                        },
                        [year]: {
                            ...(state[dataKey]?.[year] || {}),
                            [month]: {
                                ...(state[dataKey]?.[year]?.[month] || {}),
                                [day]: newEditDay,
                            },
                        },
                    },
                };
            }
            return state;
        }
        case 'dateUpdate': {
            const { date, type, oldDate } = action.payload;
            const allOldDate = state.metaMinDateData.all
                ? new Date(state.metaMinDateData.all)
                : new Date();

            const isNewDateAllOld = isPastDate(date, allOldDate);

            const minDateByType = state.metaMinDateData[type];

            if (minDateByType) {
                const minTypeDate = new Date(minDateByType);

                const isNewDateOld = isPastDate(date, minTypeDate);

                if (oldDate) {
                    const { year, month, day } = getYearMonthDay(new Date(oldDate));
                    // const oldDateTime = new Date(oldDate).getTime();

                    const isOldMinData = isDatesEqual(oldDate, minTypeDate);

                    // HERE WE NEED CHECK HOW REDUCER WILL UPDATE IF WE EXAMINATE IT AFTER CHANGE OR BEFORE  is they will be 1 or will be 0
                    const isOldDateLast =
                        (state[`${type}Data`]?.[year]?.[month]?.[day]?.length || 0) === 0;

                    if (isNewDateOld) {
                        return {
                            ...state,
                            metaMinDateData: isNewDateAllOld
                                ? {
                                      ...state.metaMinDateData,
                                      [type]: date,
                                      all: date,
                                  }
                                : {
                                      ...state.metaMinDateData,
                                      [type]: date,
                                  },
                        };
                    }

                    if (isOldMinData && !isNewDateOld && isOldDateLast) {
                        // calculate new EarlyDate because we don't know is their newer

                        // DONE FOR SINGLE TYPE. DO IT FOR ALL TIME ALSO.
                        const currentYear = new Date().getFullYear();
                        let checkedYear = year;
                        let newOldDate = null;
                        while (checkedYear <= currentYear && !newOldDate) {
                            const recordMonthsInCheckedYear = Object.keys(
                                state?.[`${type}Data`]?.[checkedYear],
                            );

                            if (!recordMonthsInCheckedYear.length) {
                                checkedYear++;
                                continue;
                            }

                            let checkedMonth = null;
                            let checkedDay = null;

                            recordMonthsInCheckedYear.forEach((m) => {
                                const month = Number(m);
                                const daysInMonth = Object.keys(
                                    state?.[`${type}Data`]?.[checkedYear]?.[month] || {},
                                );

                                const dayWithRecords = daysInMonth.find((d) => {
                                    const day = Number(d);
                                    return state[`${type}Data`]?.[checkedYear]?.[month]?.[day]
                                        .length;
                                });

                                if (dayWithRecords) {
                                    checkedMonth = month;
                                    checkedDay = Number(dayWithRecords);
                                    return;
                                }
                            });

                            if (checkedMonth && checkedDay) {
                                newOldDate = new Date(checkedYear, checkedMonth - 1, checkedDay);
                            }

                            checkedYear++;
                        }

                        return {
                            ...state,
                            metaMinDateData: {
                                ...state.metaMinDateData,
                                [type]: newOldDate,
                            },
                        };
                    }
                }

                if (!isNewDateOld) {
                    return state;
                }

                return {
                    ...state,
                    metaMinDateData: isNewDateAllOld
                        ? {
                              ...state.metaMinDateData,
                              [type]: date,
                              all: date,
                          }
                        : {
                              ...state.metaMinDateData,
                              [type]: date,
                          },
                };
            }

            return {
                ...state,
                metaMinDateData: isNewDateAllOld
                    ? {
                          ...state.metaMinDateData,
                          [type]: date,
                          all: date,
                      }
                    : {
                          ...state.metaMinDateData,
                          [type]: date,
                      },
            };
        }
    }
};

const normalizeMetaMinDateDataToDate = (metaDateData: MetaMinDateData) => {
    const data = {} as MetaMinDateData;
    const keys: TransactionsTypes[] = ['all', 'income', 'expense'];
    keys.forEach((key) => {
        data[key] = metaDateData[key] ? new Date(metaDateData[key]) : null;
    });

    return data;
};

const transactionsJSONData = localStorage.getItem('transactionsData');
const incomeJSONData = localStorage.getItem('incomeData');
const expenseJSONData = localStorage.getItem('expenseData');
const metaMinDateDataJSONData = localStorage.getItem('metaMinDateData');
const initialDataReducer: State = {
    transactions: transactionsJSONData ? JSON.parse(transactionsJSONData) : {},
    incomeData: incomeJSONData ? JSON.parse(incomeJSONData) : {},
    expenseData: expenseJSONData ? JSON.parse(expenseJSONData) : {},
    initialDate: new Date(),
    metaMinDateData: metaMinDateDataJSONData
        ? normalizeMetaMinDateDataToDate(JSON.parse(metaMinDateDataJSONData) as MetaMinDateData)
        : { income: null, expense: null, all: null },
};

const DataProvider: React.FC<Props> = ({ children }) => {
    const [data, dispatch] = useReducer(dataReducer, initialDataReducer);
    const dataRef = useRef(data);
    const transactionsCount = Object.keys(data.transactions).length;
    const incomeCount = Object.values(data.transactions).filter(
        (transaction) => transaction.type === 'income',
    ).length;
    const expenseCount = transactionsCount - incomeCount;

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        const handleWindowClose = () => {
            if (Object.keys(dataRef.current.incomeData).length) {
                localStorage.setItem('incomeData', JSON.stringify(dataRef.current.incomeData));
            }
            if (Object.keys(dataRef.current.expenseData).length) {
                localStorage.setItem('expenseData', JSON.stringify(dataRef.current.expenseData));
            }
            if (Object.keys(dataRef.current.transactions).length) {
                localStorage.setItem(
                    'transactionsData',
                    JSON.stringify(dataRef.current.transactions),
                );
            }
            // EXAMINATE
            // const minData = {
            //     income: new Date('2024-01-21T00:00:00.000Z'),
            //     expense: new Date('2024-01-21T00:00:00.000Z'),
            //     all: new Date('2024-01-21T00:00:00.000Z'),
            // };
            localStorage.setItem(
                'metaMinDateData',
                JSON.stringify(dataRef.current.metaMinDateData),
            );
        };

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, []);

    return (
        <DataContext.Provider
            value={{
                transactions: data.transactions,
                incomeData: data.incomeData,
                expenseData: data.expenseData,
                transactionsCount,
                incomeCount,
                expenseCount,
                initialDate: data.initialDate,
                metaMinDateData: data.metaMinDateData,
                dataDispatch: dispatch,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
