import { Pet } from 'models/Pet'

export const PETS_LOADING = 'PETS_LOADING'
export const PETS_SUCCESS = 'PETS_SUCCESS'
export const PETS_ERROR = 'PETS_ERROR'

interface UsePetsActionLoading {
    type: typeof PETS_LOADING
}

interface UsePetsActionSuccess {
    type: typeof PETS_SUCCESS
    pets: Pet[]
}

interface UsePetsActionError {
    type: typeof PETS_ERROR
    error?: string
}

export type UsePetsAction = UsePetsActionLoading | UsePetsActionSuccess | UsePetsActionError
