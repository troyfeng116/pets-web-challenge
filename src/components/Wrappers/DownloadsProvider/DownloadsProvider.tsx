import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { downloadPetImage } from 'lib/api/downloadPetImage'
import { generateRandomUid } from 'lib/utils/randomUid'
import { Pet } from 'models/Pet'

const DOWNLOADS_COOKIE = 'DOWNLOADS_COOKIE'

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
            const cookieDownloadsList = cookieDownloadsValue as DownloadRecord[]
            setDownloads([...cookieDownloadsList])
        } else {
            setCookie(DOWNLOADS_COOKIE, JSON.stringify([]))
        }
    }, [])

    const downloadPetInfo = async (
        petInfoToDownload: Pet,
        onDownloadCompleteCallback?: (success: boolean, error?: string) => void,
    ) => {
        const newUid = generateRandomUid()
        const newRecord: DownloadRecord = {
            petInfo: petInfoToDownload,
            timestampMs: new Date().getTime(),
            downloadId: newUid,
        }

        const { success: downloadSuccess, error: downloadError } = await downloadPetImage(petInfoToDownload)

        setDownloads((prevDownloads) => {
            const updatedDownloads = [newRecord, ...prevDownloads]
            setCookie(DOWNLOADS_COOKIE, JSON.stringify(updatedDownloads))
            return updatedDownloads
        })
        if (onDownloadCompleteCallback !== undefined) {
            onDownloadCompleteCallback(downloadSuccess, downloadError)
        }
    }

    const deletePetDownload = (downloadIdToDelete: string) => {
        for (let i = 0; i < downloads.length; i++) {
            const { downloadId } = downloads[i]
            if (downloadId === downloadIdToDelete) {
                setDownloads((prevDownloads) => {
                    const updatedDownloads = [...prevDownloads].splice(i, 1)
                    setCookie(DOWNLOADS_COOKIE, JSON.stringify(updatedDownloads))
                    return updatedDownloads
                })
            }
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
