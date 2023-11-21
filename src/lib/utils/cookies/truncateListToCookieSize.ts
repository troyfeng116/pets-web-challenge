// max browser cookie size of 4KB, minus 500B
const MAX_COOKIE_BYTES = 4096 - 512

/**
 * Determine largest slice `arr[:i]` such that JSON string representation of slice can fit in cookie value.
 * Cookie size limit set to 3.5KB. Implemented with binary search.
 *
 * @param arr Generic array to stringify for cookie store.
 * @returns Stringified maximal slice of array.
 */
export const truncateListToCookieSize = <T>(arr: T[]): string => {
    const n = arr.length
    let l = 0,
        r = n
    while (l <= r) {
        const m = l + Math.floor((r - l) / 2)
        const mStr = JSON.stringify(arr.slice(0, m))
        if (2 * mStr.length > MAX_COOKIE_BYTES) {
            r = m - 1
        } else {
            if (m >= n || 2 * JSON.stringify(arr.slice(0, m + 1)).length > MAX_COOKIE_BYTES) {
                return mStr
            }
            l = m + 1
        }
    }

    return JSON.stringify([])
}
