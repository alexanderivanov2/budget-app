export interface TransferData {
    id: string,
    amount: string,
    date: Date,
    budget: string,
    category: string,
    description?: string,
    type: 'income' | 'expense',
}

export type Action = { type: 'addIncome' | 'addExpense'; payload: TransferData }

export type typeData = {
    id: string;
    date: Date;
}
export interface Data {
    [year: number]: {
        [month: number]: {
            [day: number]: typeData[];
        };
    };
};

export interface DataContextType {
    transactions: Record<string, TransferData>,
    incomeData: Data,
    expenseData: Data,
    dataDispatch: React.Dispatch<Action>
}

export type State = { transactions: Record<string, TransferData>, incomeData: Data; expenseData: Data; };
