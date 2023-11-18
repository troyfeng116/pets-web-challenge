const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * Returns randomly generated UID of specified length.
 * @param len Length of UID. Defaults to 9.
 */
export const generateRandomUid = (len = 9): string => {
    let uid = ''
    for (let i = 0; i < len; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return uid
}
