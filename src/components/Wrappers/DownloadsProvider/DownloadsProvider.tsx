import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { downloadPetImage } from 'lib/api/downloadPetImage'
import { petDownloadRecordsToCookie } from 'lib/utils/cookies/petDownloadRecordsToCookie'
import { generateRandomUid } from 'lib/utils/randomUid'
import { Pet } from 'models/Pet'
import { PetDownloadRecord } from 'models/PetDownloadRecord'

const DOWNLOADS_COOKIE = 'DOWNLOADS_COOKIE'

interface DownloadsContextState {
    downloadedPets: PetDownloadRecord[]

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
    const [downloads, setDownloads] = useState<PetDownloadRecord[]>([])

    useEffect(() => {
        const cookieDownloadsValue = cookies[DOWNLOADS_COOKIE]
        if (cookieDownloadsValue !== undefined) {
            const cookieDownloadsList = cookieDownloadsValue as PetDownloadRecord[]
            setDownloads([...cookieDownloadsList])
        } else {
            setCookie(DOWNLOADS_COOKIE, petDownloadRecordsToCookie([]))
        }
    }, [])

    const downloadPetInfo = async (
        petInfoToDownload: Pet,
        onDownloadCompleteCallback?: (success: boolean, error?: string) => void,
    ) => {
        const { success: downloadSuccess, error: downloadError } = await downloadPetImage(petInfoToDownload)

        if (downloadSuccess) {
            setDownloads((prevDownloads) => {
                const newUid = generateRandomUid()
                const newRecord: PetDownloadRecord = {
                    petInfo: petInfoToDownload,
                    timestampMs: new Date().getTime(),
                    downloadId: newUid,
                }
                const updatedDownloads = [newRecord, ...prevDownloads]
                setCookie(DOWNLOADS_COOKIE, petDownloadRecordsToCookie(updatedDownloads))
                return updatedDownloads
            })
        }

        if (onDownloadCompleteCallback !== undefined) {
            onDownloadCompleteCallback(downloadSuccess, downloadError)
        }
    }

    const deletePetDownload = (downloadIdToDelete: string) => {
        for (let i = 0; i < downloads.length; i++) {
            const { downloadId } = downloads[i]
            if (downloadId === downloadIdToDelete) {
                setDownloads((prevDownloads) => {
                    const updatedDownloads = [...prevDownloads]
                    updatedDownloads.splice(i, 1)
                    setCookie(DOWNLOADS_COOKIE, petDownloadRecordsToCookie(updatedDownloads))
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
