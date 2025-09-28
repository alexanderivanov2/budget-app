import type React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isNumber } from '../../../utils/validations';
import { dateToStringValue, convertStringDateToDate } from '../../../utils/convert';
import { useDataContext } from '../../../context/DataContext';
import type { TransferData } from '../../../context/types/DataContextTypes';

const FORM_KEYS = ['budget', 'amount', 'description', 'date', 'category'] as const;
type FormKey = (typeof FORM_KEYS)[number];

type FieldWithString = {
    value: string;
    errorMessage?: string;
};

type FieldWithDate = {
    value: Date;
    errorMessage?: string;
};

interface TransactionForm {
    amount: FieldWithString;
    description: FieldWithString;
    category: FieldWithString;
    budget: FieldWithString;
    date: FieldWithDate;
}

export interface FullTransactionForm {
    amount: FieldWithString;
    description: FieldWithString;
    category: FieldWithString;
    budget: FieldWithString;
    date: FieldWithDate;
    id: string;
    type: 'expense' | 'income';
}

const TRANSACTION_INPUTS_INITAL_STATE: TransactionForm = {
    amount: {
        value: '',
        errorMessage: '',
    },
    budget: {
        value: '',
        errorMessage: '',
    },
    category: {
        value: '',
        errorMessage: '',
    },
    description: {
        value: '',
    },
    date: {
        value: new Date(),
        errorMessage: '',
    },
};

const createInitialForm = (data?: TransferData) => {
    if (data) {
        return createInitialFormWithData(data);
    }
    return createInitialEmptyForm();
};

const createInitialFormWithData = (formData: TransferData) => {
    const initialForm = {} as FullTransactionForm;

    FORM_KEYS.forEach((keyValue) => {
        if (keyValue === 'date') {
            initialForm[keyValue] = { ...TRANSACTION_INPUTS_INITAL_STATE[keyValue] };
            if (formData[keyValue] && new Date(formData[keyValue])?.getTime()) {
                initialForm[keyValue].value = new Date(formData[keyValue]);
            }
        } else {
            initialForm[keyValue] = {
                ...(TRANSACTION_INPUTS_INITAL_STATE[keyValue] as FieldWithString),
            };

            if (initialForm[keyValue] && typeof formData[keyValue] === 'string') {
                initialForm[keyValue].value = formData[keyValue];
            }
        }
    });

    return initialForm;
};

const createInitialEmptyForm = (): TransactionForm => {
    const initialForm = {} as TransactionForm;

    FORM_KEYS.forEach((keyValue) => {
        if (keyValue === 'date') {
            initialForm[keyValue] = { ...TRANSACTION_INPUTS_INITAL_STATE[keyValue] };
        } else {
            initialForm[keyValue] = {
                ...(TRANSACTION_INPUTS_INITAL_STATE[keyValue] as FieldWithString),
            };
        }
    });

    return initialForm;
};

const useTransactionForm = (formType: 'income' | 'expense', transaction?: TransferData) => {
    const [transactionForm, setTransactionForm] = useState<TransactionForm | FullTransactionForm>(
        () => createInitialForm(transaction),
    );
    const { dataDispatch } = useDataContext();
    const dateInputValue = dateToStringValue(transactionForm.date.value);
    const validateInput = (key: FormKey, value: string | Date) => {
        const validateObj = { key, errorMessage: '', isValid: true };
        if (value === '') {
            validateObj.errorMessage = `Empty ${key}`;
            validateObj.isValid = false;
            return validateObj;
        }

        let isValueValid = true;
        if (key === 'amount' && !isNumber(value)) {
            isValueValid = false;
        }

        if (key === 'date' && value instanceof Date && isNaN(value?.getTime())) {
            isValueValid = false;
        }

        if (!isValueValid) {
            validateObj.errorMessage = `Invalid ${key}`;
            validateObj.isValid = false;
        }

        return validateObj;
    };

    const extractErrorValues = () => {
        const extractObject = {} as TransactionForm;
        Object.entries(transactionForm).forEach(([key, value]) => {
            if (!('errorMessage' in value)) return;

            const validated = validateInput(key as FormKey, value.value!);

            if (!validated.isValid) {
                const errorMessage = validated.errorMessage;

                extractObject[key as FormKey] = {
                    ...value,
                    errorMessage: errorMessage,
                };
            }
        });

        return extractObject;
    };

    const validateSubmit = () => {
        const objectWithErrors: Partial<TransactionForm> = extractErrorValues();
        const isValid = !Object.keys(objectWithErrors).length;

        if (!isValid) {
            setTransactionForm((prevTransactionForm) => ({
                ...prevTransactionForm,
                ...objectWithErrors,
            }));
            return false;
        }

        return isValid;
    };

    const handleChange = (e: React.ChangeEvent, key: FormKey) => {
        if (!transactionForm[key]) return;

        const inputElement = e.target as HTMLInputElement;

        const newValue =
            key === 'date' ? convertStringDateToDate(inputElement.value) : inputElement.value;

        const newData: {
            value: string | Date;
            errorMessage?: string;
        } = {
            value: newValue,
        };

        if ('errorMessage' in transactionForm[key]) {
            const validated = validateInput(key, newValue);
            newData.errorMessage = validated.isValid ? '' : validated.errorMessage;
        }

        setTransactionForm((prevTransactionForm) => {
            return {
                ...prevTransactionForm,
                [key]: newData,
            };
        });
    };

    const handleBlur = (key: FormKey) => {
        if ('errorMessage' in transactionForm[key]) {
            const validated = validateInput(key, transactionForm[key].value);

            if (!validated.isValid && validated.errorMessage.startsWith('Empty')) {
                const newData: { value: unknown; errorMessage?: string } = {
                    value: transactionForm[key].value,
                };
                newData.errorMessage = validated.errorMessage;
                setTransactionForm((prevTransactionForm) => ({
                    ...prevTransactionForm,
                    [key]: newData,
                }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateSubmit();

        if (!isValid) {
            console.log('Form is invalid');
            return;
        }
        // TODO SUBMIT AFTER IMPLEMENTATE localStorageStore
        const actionType = formType === 'expense' ? 'addExpense' : 'addIncome';

        const payload = Object.fromEntries(
            Object.entries(transactionForm).map(([key, field]) => [key, field.value]),
        ) as TransferData;

        const id = uuidv4();
        dataDispatch({ type: actionType, payload: { ...payload, id, type: formType } });

        handleResetForm();
    };

    const handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateSubmit();

        if (!isValid) {
            console.log('Form is invalid');
            return;
        }

        const payload = Object.fromEntries(
            Object.entries(transactionForm).map(([key, field]) => [key, field.value]),
        ) as TransferData;

        payload.id = transaction!.id;
        payload.type = transaction!.type;

        return { ...payload };
    };

    const handleResetForm = () => setTransactionForm(createInitialForm());

    return {
        form: transactionForm,
        selectedDate: dateInputValue,
        handleChange,
        handleBlur,
        handleSubmitForm: handleSubmit,
        handleSubmitEditForm: handleSubmitEdit,
        handleResetForm,
    };
};

export default useTransactionForm;
