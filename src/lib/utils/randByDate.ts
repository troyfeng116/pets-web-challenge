const DAY_MS = 1000 * 60 * 60 * 24

/**
 * Generates index in `modulus` using remainder, with respect to current day.
 *
 * @param modulus Ideally, prime number with which to compute remainder. Defaults to `10007`.
 * @returns
 */
export const randByDate = (modulus = 10007): number => {
    const nowTs = new Date().getTime()
    const startOfDayTs = nowTs - (nowTs % DAY_MS)
    return startOfDayTs % modulus
}
