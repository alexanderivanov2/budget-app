export const isNumber = (value: unknown): boolean => {
    const num = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
    if (typeof num === 'number' && Number.isFinite(num)) return true;

    return false
}