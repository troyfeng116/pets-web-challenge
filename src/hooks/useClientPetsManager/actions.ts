import { OrderBy } from 'models/OrderBy'
import { Pet } from 'models/Pet'

export const CLIENT_PETS_MANAGER_RESET = 'CLIENT_PETS_MANAGER_RESET'
export const CLIENT_PETS_MANAGER_SORT_BY_NAME = 'CLIENT_PETS_MANAGER_SORT_BY_NAME'
export const CLIENT_PETS_MANAGER_SEARCH = 'CLIENT_PETS_MANAGER_SEARCH'
export const CLIENT_PETS_MANAGER_SERVER_UPDATE = 'CLIENT_PETS_MANAGER_SERVER_UPDATE'

interface ClientPetsManagerReset {
    type: typeof CLIENT_PETS_MANAGER_RESET
    serverPets: Pet[]
}

interface ClientPetsManagerSortByName {
    type: typeof CLIENT_PETS_MANAGER_SORT_BY_NAME
    serverPets: Pet[]
    orderBy: OrderBy
}

interface ClientPetsManagerSearch {
    type: typeof CLIENT_PETS_MANAGER_SEARCH
    serverPets: Pet[]
    searchText: string
}

interface ClientPetsManagerServerUpdate {
    type: typeof CLIENT_PETS_MANAGER_SERVER_UPDATE
    updatedServerPets: Pet[]
}

export type ClientPetsManagerAction =
    | ClientPetsManagerReset
    | ClientPetsManagerSortByName
    | ClientPetsManagerSearch
    | ClientPetsManagerServerUpdate
