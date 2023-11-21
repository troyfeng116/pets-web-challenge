import { PetDownloadRecord } from 'models/PetDownloadRecord'

import { truncateListToCookieSize } from './truncateListToCookieSize'

/**
 * Converts list of `PetDownloadRecord` to JSON string, to store as a cookie value.
 * Ensures size of string will fit in browser cookie memory, with space to spare.
 * Chooses largest index `i` such that `downloadRecords[:i]` fits comfortably in cookie.
 */
export const petDownloadRecordsToCookie = (downloadRecords: PetDownloadRecord[]): string => {
    downloadRecords = downloadRecords.sort(({ timestampMs: t1 }, { timestampMs: t2 }) => t2 - t1)
    return truncateListToCookieSize(downloadRecords)
}
