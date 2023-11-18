import { Pet } from 'models/Pet'

export const PETS_FETCH_LOADING = 'PETS_FETCH_LOADING'
export const PETS_FETCH_SUCCESS = 'PETS_FETCH_SUCCESS'
export const PETS_FETCH_ERROR = 'PETS_FETCH_ERROR'

interface PetsFetchActionLoading {
    type: typeof PETS_FETCH_LOADING
}

interface PetsFetchActionSuccess {
    type: typeof PETS_FETCH_SUCCESS
    pets: Pet[]
}

interface PetsFetchActionError {
    type: typeof PETS_FETCH_ERROR
    error?: string
}

export type PetsFetchAction = PetsFetchActionLoading | PetsFetchActionSuccess | PetsFetchActionError
