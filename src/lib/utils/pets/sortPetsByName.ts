import { OrderBy } from 'models/OrderBy'
import { Pet } from 'models/Pet'

/**
 * Sorts list of pets by name in specified order.
 * Creates shallow copy of list.
 */
export const sortPetsByName = (pets: Pet[], orderBy: OrderBy): Pet[] => {
    return [...pets].sort(({ title: t1 }, { title: t2 }) => t1.localeCompare(t2) * (orderBy === OrderBy.ASC ? 1 : -1))
}
