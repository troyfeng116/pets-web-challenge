import { Pet } from './Pet'

export interface PetDownloadRecord {
    petInfo: Pet
    timestampMs: number
    downloadId: string
}
