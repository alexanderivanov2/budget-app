import type React from 'react';
import FormField from '../../components/ui/input/FormField';
import useTransactionForm from '../../hooks/useTransactionForm';
import { useLocation } from 'react-router-dom';
// import { useContext } from 'react';
// import { useDataContext } from '../../context/DataContext';

const SELECT_CATEGORY_DATA = {
    income: {
        label: 'incomeType',
        labelTitle: 'Income',
        className: 'income-type',
        option: ['Choose Income Type', 'Salary', 'Gift', 'Others'],
    },
    expense: {
        label: 'categoryType',
        labelTitle: 'Category',
        className: 'category-type',
        option: ['Choose Category', 'Food', 'Bills', 'Rent', 'Others'],
    },
}

const TransactionForm = () => {
    const location = useLocation();
    const transactionFormType = location.pathname.includes('expenses') ? 'expense' : 'income';
    const { form: transactionForm, selectedDate, handleSubmit, handleChange, handleBlur } = useTransactionForm(transactionFormType);
    const selectCategoryData = SELECT_CATEGORY_DATA[transactionFormType];
    // const { incomeData, dataDispatch } = useDataContext();

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label={{
                    htmlFor: 'transactionBudget',
                    className: 'transaction-budget-label',
                    label: 'Budget',
                }}
                error={{
                    message: transactionForm.budget.errorMessage,
                    className: 'transcation-budget-error'
                }}
                className='transaction-form-field'
            >
                <select value={transactionForm.budget.value} onChange={(e) => handleChange(e, 'budget')} onBlur={() => handleBlur('budget')}>
                    <option value={""}>Choose budget</option>
                    <option value="me">Personal</option>
                    <option value="wife">Family</option>
                    <option value="savings">Savings</option>
                </select>
            </FormField>
            <FormField
                label={{
                    htmlFor: 'transactionAmount',
                    className: 'transaction-amount-label',
                    label: 'Amount',
                }}
                input={{
                    id: 'transactionAmount',
                    className: 'transaction-amount-input',
                    type: 'text',
                    name: 'transactionAmount',
                    placeholder: 'Amount',
                    value: transactionForm.amount.value,
                    onChange: (e: React.ChangeEvent) => { handleChange(e, 'amount') },
                    onBlur: () => { handleBlur('amount') }
                }}
                error={{
                    message: transactionForm.amount.errorMessage,
                    className: 'transcation-amount-error'
                }}
                className='transaction-form-field'
            />
            <FormField
                label={{
                    htmlFor: 'transactionDescription',
                    className: 'transaction-description-label',
                    label: 'Description',
                }}
                className='transaction-form-field'
            >
                <textarea
                    id='transactionDescription'
                    className='transaction-description-input'
                    name='transactionDescription'
                    placeholder='Description'
                    value={transactionForm.description.value}
                    onChange={(e: React.ChangeEvent) => { handleChange(e, 'description') }}
                />
            </FormField>
            <FormField
                label={{
                    htmlFor: 'transactionDate',
                    className: 'transaction-date-label',
                    label: 'Date',
                }}
                error={{
                    message: transactionForm.date.errorMessage,
                    className: 'transcation-date-error'
                }}
                className='transaction-form-field'
                input={{
                    id: 'transactionDate',
                    className: 'transaction-date-input',
                    type: 'date',
                    name: 'transactionDate',
                    value: selectedDate,
                    onChange: (e: React.ChangeEvent) => { handleChange(e, 'date') }
                }}
            />
            <FormField
                label={{
                    htmlFor: `transaction${selectCategoryData.label}`,
                    className: `transaction-${selectCategoryData.className}`,
                    label: selectCategoryData.labelTitle,
                }}
                error={{
                    message: transactionForm.category.errorMessage,
                    className: `transcation-${selectCategoryData.className}-error`
                }}
                className='transaction-form-field'
            >
                <select value={transactionForm.category.value} onChange={(e) => handleChange(e, 'category')} onBlur={() => { handleBlur('category') }}>
                    {selectCategoryData.option.map((value, index) => {
                        return <option key={value} value={index === 0 ? "" : value}>{value}</option>
                    })}
                </select>
            </FormField>
            <button type='submit'>Add</button>
        </form>
    )
}

export default TransactionForm;