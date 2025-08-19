import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import type { Action, DataContextType, State } from "./types/DataContextTypes";
import { getYearMonthDay } from "../utils/dateUtils";

const DataContext = createContext<DataContextType>({
    transactions: {},
    incomeData: {},
    expenseData: {},
    transactionsCount: 0,
    dataDispatch: () => { }
});

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('DataContext must be used within a DataProvider');
    return context;
}

interface Props {
    children: React.ReactNode;
}

const dataReducer = (state: State, action: Action) => {
    switch (action.type) {
        case ('addIncome'): {
            const { year, month, day } = getYearMonthDay(action.payload.date);
            const incomeDataItem = {
                id: action.payload.id,
                date: action.payload.date
            }
            state.transactions = { ...state.transactions, [action.payload.id]: action.payload }

            const isRecordExist = state.incomeData?.[year]?.[month]?.[day]?.find((item) => item.id === incomeDataItem.id);
            if (!isRecordExist) {
                return {
                    ...state,
                    incomeData: {
                        ...state.incomeData,
                        [year]: {
                            ...((state.incomeData[year]) ?? {}),
                            [month]: {
                                ...((state.incomeData[year]?.[month]) ?? {}),
                                [day]: state.incomeData[year]?.[month]?.[day] ? [...state.incomeData[year][month][day], incomeDataItem] : [incomeDataItem]
                            }
                        }
                    }
                }
            }
            return { ...state }
        }
        case ('addExpense'): {
            const { year, month, day } = getYearMonthDay(action.payload.date);
            const expenseDataItem = {
                id: action.payload.id,
                date: action.payload.date,
            }

            state.transactions = {
                ...state.transactions, [action.payload.id]: action.payload,
            }

            const isRecordExist = state.expenseData?.[year]?.[month]?.[day]?.find((item) => item.id === expenseDataItem.id);

            if (!isRecordExist) {
                return {
                    ...state,
                    expenseData: {
                        ...state.expenseData,
                        [year]: {
                            ...((state.expenseData[year]) ?? {}),
                            [month]: {
                                ...((state.expenseData[year]?.[month]) ?? {}),
                                [day]: [
                                    ...((state.expenseData[year]?.[month]?.[day]) ?? []),
                                    expenseDataItem
                                ]
                            }
                        }
                    }
                }
            }
            return { ...state }
        }
    }
    return state
}

const transactionsJSONData = localStorage.getItem('transactionsData');
const incomeJSONData = localStorage.getItem('incomeData');
const expenseJSONData = localStorage.getItem('expenseData');
const initialDataReducer: State = {
    transactions: transactionsJSONData ? JSON.parse(transactionsJSONData) : {},
    incomeData: incomeJSONData ? JSON.parse(incomeJSONData) : {},
    expenseData: expenseJSONData ? JSON.parse(expenseJSONData) : {},
}

const DataProvider: React.FC<Props> = ({ children }) => {
    const [data, dispatch] = useReducer(dataReducer, initialDataReducer);
    const dataRef = useRef(data);
    const transactionsCount = Object.keys(data.transactions).length;

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        const handleWindowClose = () => {
            Object.keys(dataRef.current.incomeData).length && localStorage.setItem('incomeData', JSON.stringify(dataRef.current.incomeData));
            Object.keys(dataRef.current.expenseData).length && localStorage.setItem('expenseData', JSON.stringify(dataRef.current.expenseData));
            Object.keys(dataRef.current.transactions).length && localStorage.setItem('transactionsData', JSON.stringify(dataRef.current.transactions));
        }

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        }
    }, []);

    return (
        <DataContext.Provider value={{ transactions: data.transactions, incomeData: data.incomeData, expenseData: data.expenseData, transactionsCount, dataDispatch: dispatch }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;