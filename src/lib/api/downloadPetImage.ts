import { Pet } from 'models/Pet'

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

/**
 * Download image corresponding to specified `Pet` object.
 */
export const downloadPetImage = async (petInfo: Pet) => {
    const { url, title } = petInfo

    const imageRes = await fetch(url)
    if (imageRes.status !== 200) {
        // TODO: error handling
        console.error(imageRes.statusText)
        return
    }

    const imageBlob = await imageRes.blob()
    const imageURL = URL.createObjectURL(imageBlob)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = getImageFileName(title)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
