export interface TransferData {
    id: string;
    amount: string;
    date: Date;
    budget: string;
    category: string;
    description?: string;
    type: 'income' | 'expense';
}

export type Action = { type: 'addIncome' | 'addExpense' | 'setDate'; payload: TransferData };

export type typeData = {
    id: string;
    date: Date;
};
export interface Data {
    [year: number]: {
        [month: number]: {
            [day: number]: typeData[];
        };
    };
}

export interface MetaMinDateData {
    income: Date | null;
    expense: Date | null;
    all: Date | null;
}

export interface DataContextType {
    transactions: Record<string, TransferData>;
    incomeData: Data;
    expenseData: Data;
    transactionsCount: number;
    incomeCount: number;
    expenseCount: number;
    initialDate: Date;
    metaMinDateData: MetaMinDateData;
    dataDispatch: React.Dispatch<Action>;
}

export type State = {
    transactions: Record<string, TransferData>;
    incomeData: Data;
    expenseData: Data;
    initialDate: Date;
    metaMinDateData: MetaMinDateData;
};

export type TransactionsTypes = 'all' | 'income' | 'expense';
