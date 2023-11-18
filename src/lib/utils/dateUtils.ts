/**
 * Convert date-parsable into client locale formatted date string (YYYY, MM, D, H, MM)
 */
export const toClientDateString = (dateObj: string | number | Date): string => {
    return new Date(dateObj).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}
