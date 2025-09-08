export const convertStringDateToDate = (value: string) => new Date(value);
export const dateToStringValue = (value: Date) =>
    `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
