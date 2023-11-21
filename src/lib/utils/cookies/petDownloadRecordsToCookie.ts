import { PetDownloadRecord } from 'models/PetDownloadRecord'

// max browser cookie size of 4KB, minus 500B
const MAX_COOKIE_BYTES = 4096 - 512

/**
 * Converts list of `PetDownloadRecord` to JSON string, to store as a cookie value.
 * Ensures size of string will fit in browser cookie memory, with space to spare.
 * Chooses largest index `i` such that `downloadRecords[:i]` fits comfortably in cookie.
 */
export const petDownloadRecordsToCookie = (downloadRecords: PetDownloadRecord[]): string => {
    downloadRecords = downloadRecords.sort(({ timestampMs: t1 }, { timestampMs: t2 }) => t2 - t1)
    const n = downloadRecords.length
    let l = 0,
        r = n
    while (l <= r) {
        const m = l + Math.floor((r - l) / 2)
        const mStr = JSON.stringify(downloadRecords.slice(0, m))
        if (2 * mStr.length > MAX_COOKIE_BYTES) {
            r = m - 1
        } else {
            if (m >= n || 2 * JSON.stringify(downloadRecords.slice(0, m + 1)).length > MAX_COOKIE_BYTES) {
                return mStr
            }
            l = m + 1
        }
    }

    return JSON.stringify([])
}
