export default function validateString(value: string | null | undefined): boolean {
    if (value === null || value === undefined)
        return false;
    
    return value.replace(/\s/g, '').length >= 1;
}