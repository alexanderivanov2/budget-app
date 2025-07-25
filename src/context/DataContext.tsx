import { createContext, useContext, useEffect, useReducer, useRef } from "react";

export interface TranseferData {
    amount: string,
    date: Date,
    budget: string,
    category: string,
    description?: string
}

interface IncomeData extends TranseferData {
    type: 'income',
}

interface ExpenseData extends TranseferData {
    type: 'expense'
}

type Action = { type: 'addIncome'; payload: Omit<IncomeData, 'type'> } | { type: 'addExpense'; payload: Omit<ExpenseData, 'type'> }

interface DataContextType {
    incomeData: IncomeData[],
    expenseData: ExpenseData[],
    dataDispatch: React.Dispatch<Action>
}

const DataContext = createContext<DataContextType>({
    incomeData: [],
    expenseData: [],
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

type State = { incomeData: IncomeData[]; expenseData: ExpenseData[]; };

const dataReducer = (state: State, action: Action) => {
    switch (action.type) {
        case ('addIncome'): {
            const newIncomeData: IncomeData = {
                ...action.payload,
                type: 'income',
            }
            return {
                ...state,
                incomeData: [
                    ...state.incomeData,
                    newIncomeData
                ]
            }
        }
        case ('addExpense'): {
            const newExpenseData: ExpenseData = {
                ...action.payload,
                type: 'expense',
            };

            return {
                ...state,
                expenseData: [
                    ...state.expenseData,
                    newExpenseData,
                ]
            }
        }
    }

    return state
}

const incomeJSONData = localStorage.getItem('incomeData');
const expenseJSONData = localStorage.getItem('expenseData');
const initialDataReducer: State = {
    incomeData: incomeJSONData ? JSON.parse(incomeJSONData) : [],
    expenseData: expenseJSONData ? JSON.parse(expenseJSONData) : [],
}

const DataProvider: React.FC<Props> = ({ children }) => {
    const [data, dispatch] = useReducer(dataReducer, initialDataReducer);
    const dataRef = useRef(data);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        const handleWindowClose = () => {
            dataRef.current.incomeData.length && localStorage.setItem('incomeData', JSON.stringify(dataRef.current.incomeData));
            dataRef.current.expenseData.length && localStorage.setItem('expenseData', JSON.stringify(dataRef.current.expenseData));
        }

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        }
    }, []);

    return (
        <DataContext.Provider value={{ incomeData: data.incomeData, expenseData: data.expenseData, dataDispatch: dispatch }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;