import { PETS_FETCH_ERROR, PETS_FETCH_LOADING, PETS_FETCH_SUCCESS, PetsFetchAction } from './actions'
import { PetsFetchState } from '.'

export const reducer = (state: PetsFetchState, action: PetsFetchAction): PetsFetchState => {
    switch (action.type) {
        case PETS_FETCH_LOADING:
            return { ...state, isLoading: true, error: undefined }
        case PETS_FETCH_SUCCESS:
            return { isLoading: false, error: undefined, pets: action.pets, lastUpdated: new Date() }
        case PETS_FETCH_ERROR:
            return { isLoading: false, error: action.error, pets: undefined, lastUpdated: new Date() }
    }
}
