import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { downloadPetImage } from 'lib/api/downloadPetImage'
import { generateRandomUid } from 'lib/utils/randomUid'
import { Pet } from 'models/Pet'

export interface DownloadRecord {
    petInfo: Pet
    timestampMs: number
    downloadId: string
}

interface DownloadsContextState {
    downloadedPets: DownloadRecord[]

    downloadPetInfo: (
        petInfoToDownload: Pet,
        onDownloadCompleteCallback: (success: boolean, error?: string) => void,
    ) => Promise<void>
    deletePetDownload: (downloadId: string) => void
}

const initialState: DownloadsContextState = {
    downloadedPets: [],
    downloadPetInfo: () => new Promise(() => null),
    deletePetDownload: () => null,
}

const DownloadsContext = React.createContext<DownloadsContextState>(initialState)

export const useDownloadsContext = () => useContext<DownloadsContextState>(DownloadsContext)

const DOWNLOADS_COOKIE = 'DOWNLOADS_COOKIE'

interface DownloadsProviderProps {
    children: React.ReactNode
}

/**
 * Provider for downloads, via browser cookies.
 * To prevent race conditions with cookie get/set, ensure no child components access the `downloads` cookie store.
 */
export const DownloadsProvider: React.FC<DownloadsProviderProps> = (props) => {
    const { children } = props

    const [cookies, setCookie] = useCookies()
    const [downloads, setDownloads] = useState<DownloadRecord[]>([])

    useEffect(() => {
        const cookieDownloadsValue = cookies[DOWNLOADS_COOKIE]
        if (cookieDownloadsValue !== undefined) {
            const cookieDownloadsDict = cookieDownloadsValue as { [id: string]: DownloadRecord }
            const downloadRecords: DownloadRecord[] = []
            for (const id in cookieDownloadsDict) {
                downloadRecords.push(cookieDownloadsDict[id])
            }
            setDownloads([...downloadRecords])
        } else {
            setCookie(DOWNLOADS_COOKIE, JSON.stringify({}))
        }
    }, [])

    const downloadPetInfo = async (
        petInfoToDownload: Pet,
        onDownloadCompleteCallback?: (success: boolean, error?: string) => void,
    ) => {
        const cookieDownloadsDict: { [id: string]: DownloadRecord } = cookies[DOWNLOADS_COOKIE] || {}
        const newUid = generateRandomUid()
        const newRecord: DownloadRecord = {
            petInfo: petInfoToDownload,
            timestampMs: new Date().getTime(),
            downloadId: newUid,
        }
        cookieDownloadsDict[newUid] = newRecord
        const downloadRecords: DownloadRecord[] = []
        for (const id in cookieDownloadsDict) {
            downloadRecords.push(cookieDownloadsDict[id])
        }
        setDownloads([...downloadRecords])
        setCookie(DOWNLOADS_COOKIE, JSON.stringify(cookieDownloadsDict))

        const { success: downloadSuccess, error: downloadError } = await downloadPetImage(petInfoToDownload)
        if (onDownloadCompleteCallback !== undefined) {
            onDownloadCompleteCallback(downloadSuccess, downloadError)
        }
    }

    const deletePetDownload = (downloadId: string) => {
        const cookieDownloadsDict: { [id: string]: DownloadRecord } = JSON.parse(cookies[DOWNLOADS_COOKIE]) || {}
        if (downloadId in cookieDownloadsDict) {
            delete cookieDownloadsDict[downloadId]
            const downloadRecords: DownloadRecord[] = []
            for (const id in cookieDownloadsDict) {
                downloadRecords.push(cookieDownloadsDict[id])
            }
            setDownloads([...downloadRecords])
            setCookie(DOWNLOADS_COOKIE, JSON.stringify(cookieDownloadsDict))
        }
    }

    return (
        <DownloadsContext.Provider
            value={{
                downloadedPets: downloads,
                downloadPetInfo: downloadPetInfo,
                deletePetDownload: deletePetDownload,
            }}
        >
            {children}
        </DownloadsContext.Provider>
    )
}
