import { OrderBy } from 'models/OrderBy'
import { Pet } from 'models/Pet'

export const CLIENT_PETS_MANAGER_RESET_ORDER_AND_FILTERS = 'CLIENT_PETS_MANAGER_RESET_ORDER_AND_FILTERS'
export const CLIENT_PETS_MANAGER_SORT_BY_NAME = 'CLIENT_PETS_MANAGER_SORT_BY_NAME'
export const CLIENT_PETS_MANAGER_SEARCH = 'CLIENT_PETS_MANAGER_SEARCH'
export const CLIENT_PETS_MANAGER_SERVER_UPDATE = 'CLIENT_PETS_MANAGER_SERVER_UPDATE'

export const CLIENT_PETS_MANAGER_ON_SELECT_PET_URL = 'CLIENT_PETS_MANAGER_ON_SELECT_PET_URL'
export const CLIENT_PETS_MANAGER_SELECT_ALL_CLIENT = 'CLIENT_PETS_MANAGER_SELECT_ALL_CLIENT'
export const CLIENT_PETS_MANAGER_CLEAR_ALL_SELECTED = 'CLIENT_PETS_MANAGER_CLEAR_ALL_SELECTED'

interface ClientPetsManagerReset {
    type: typeof CLIENT_PETS_MANAGER_RESET_ORDER_AND_FILTERS
}

interface ClientPetsManagerSortByName {
    type: typeof CLIENT_PETS_MANAGER_SORT_BY_NAME
    orderBy: OrderBy
}

interface ClientPetsManagerSearch {
    type: typeof CLIENT_PETS_MANAGER_SEARCH
    searchText: string
}

interface ClientPetsManagerServerUpdate {
    type: typeof CLIENT_PETS_MANAGER_SERVER_UPDATE
    updatedServerPets: Pet[]
}

interface ClientPetsManagerOnSelectPetUrl {
    type: typeof CLIENT_PETS_MANAGER_ON_SELECT_PET_URL
    selectedUrl: string
}

interface ClientPetsManagerSelectAllClient {
    type: typeof CLIENT_PETS_MANAGER_SELECT_ALL_CLIENT
}

interface ClientPetsManagerClearAllSelected {
    type: typeof CLIENT_PETS_MANAGER_CLEAR_ALL_SELECTED
}

export type ClientPetsManagerAction =
    | ClientPetsManagerReset
    | ClientPetsManagerSortByName
    | ClientPetsManagerSearch
    | ClientPetsManagerServerUpdate
    | ClientPetsManagerOnSelectPetUrl
    | ClientPetsManagerSelectAllClient
    | ClientPetsManagerClearAllSelected
