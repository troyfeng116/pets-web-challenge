import { Pet } from 'models/Pet'

import { APIResponse__Base } from '.'

/**
 * Convert pet info title to pet image download file name.
 * Replaces spaces with dashes, and removes non-alphanumeric characters.
 */
const getImageFileName = (title: string): string => {
    return title
        .toLocaleLowerCase()
        .replaceAll(/[^(a-z)|(0-9)|\s]/g, '')
        .replaceAll(/\s+/g, '-')
}

interface APIResponse__DownloadPetImage extends APIResponse__Base {
    downloadedFileName?: string
}

/**
 * Download image corresponding to specified `Pet` object.
 */
export const downloadPetImage = async (petInfo: Pet): Promise<APIResponse__DownloadPetImage> => {
    const { url, title } = petInfo

    const imageRes = await fetch(url)
    if (imageRes.status !== 200) {
        // TODO: error handling
        return {
            success: false,
            error: imageRes.statusText,
        }
    }

    const imageBlob = await imageRes.blob()
    const imageURL = URL.createObjectURL(imageBlob)
    const fileName = getImageFileName(title)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = fileName

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return {
        success: true,
        downloadedFileName: fileName,
    }
}
