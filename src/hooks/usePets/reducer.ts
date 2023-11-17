import { PETS_ERROR, PETS_LOADING, PETS_SUCCESS, UsePetsAction } from './actions'
import { UsePetsState } from '.'

export const reducer = (state: UsePetsState, action: UsePetsAction): UsePetsState => {
    switch (action.type) {
        case PETS_LOADING:
            return { ...state, isLoading: true, error: undefined }
        case PETS_SUCCESS:
            return { isLoading: false, error: undefined, pets: action.pets, lastUpdated: new Date() }
        case PETS_ERROR:
            return { isLoading: false, error: action.error, pets: undefined, lastUpdated: new Date() }
    }
}
