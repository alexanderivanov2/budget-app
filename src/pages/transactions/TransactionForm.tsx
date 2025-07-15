import React, { type FormEvent, useState } from 'react'
import FormField from '../../components/ui/input/FormField';

const TransactionForm = () => {
    const [transactionForm, setTransactionForm] = useState({
        amount: {
            value: 0,
            errorMessage: '',
        },
        description: {
            value: '',
        },
        category: {
            value: '',
            errorMessage: ''
        },
        budget: {
            value: '',
            errorMessage: '',
        },
        date: {
            value: new Date(),
        }
    })

    const formKeys = ['amount', 'description',]
    const isInvalid = formKeys.some((value) => !!transactionForm[value].errorMessage)
    const selectedDate = `${transactionForm.date.value.getFullYear()}-${String(transactionForm.date.value.getMonth() + 1).padStart(2, '0')}-${String(transactionForm.date.value.getDate()).padStart(2, '0')}`
    const handleChange = (e: React.ChangeEvent, key: string) => {
        if (!transactionForm[key]) return;

        const inputElement = e.target as HTMLInputElement;
        if (key === 'date') {
            console.log(inputElement.value)
            console.log(new Date(inputElement.value))
        }
        const newValue = key === 'date' ? new Date(inputElement.value) : inputElement.value;

        setTransactionForm(prevTransactionForm => {
            return {
                ...prevTransactionForm,
                [key]: {
                    value: newValue,
                    errorMessage: '',
                }
            }
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(transactionForm);
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                <>
                    <p>Amount: {transactionForm.amount.value}</p>
                    <p>Description: {transactionForm.description.value}</p>
                    <p>Category: {transactionForm.category.value}</p>
                    <p>Budget: {transactionForm.budget.value}</p>
                    <p>Budget: { }</p>
                </>
            }
            {isInvalid && <p>Invalid</p>}
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
                <select value={transactionForm.budget.value} onChange={(e) => handleChange(e, 'budget')}>
                    <option value={""}>Choose budget</option>
                    <option value="me">Me</option>
                    <option value="wife">Wife</option>
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
                    onChange: (e: React.ChangeEvent) => { handleChange(e, 'amount') }
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
                    htmlFor: 'transactionCategory',
                    className: 'transaction-category-label',
                    label: 'Category',
                }}
                error={{
                    message: transactionForm.category.errorMessage,
                    className: 'transcation-category-error'
                }}
                className='transaction-form-field'
            >
                <select value={transactionForm.category.value} onChange={(e) => handleChange(e, 'category')}>
                    <option value={""}>Choose Category</option>
                    <option value="food">Food</option>
                    <option value="electricity">Electricity</option>
                    <option value="TV">TV</option>
                </select>
            </FormField>
            <button type='submit'>Add</button>
        </form>
    )
}

export default TransactionForm