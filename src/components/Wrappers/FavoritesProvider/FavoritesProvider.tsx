import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { truncateListToCookieSize } from 'lib/utils/cookies/truncateListToCookieSize'

const FAVORITES_COOKIE = 'FAVORITES_COOKIE'

interface FavoritesContextState {
    isFavorite: (petUrl: string) => boolean
    areAllFavorites: (petUrls: string[]) => boolean
    toggleFavorites: (petUrls: string[]) => void
}

const initialState: FavoritesContextState = {
    isFavorite: () => false,
    areAllFavorites: () => false,
    toggleFavorites: () => null,
}

const FavoritesContext = React.createContext<FavoritesContextState>(initialState)

export const useFavoritesContext = () => useContext(FavoritesContext)

interface FavoritesProviderProps {
    children: React.ReactNode
}

/**
 * Provider for favorites, via browser cookies.
 * To prevent race conditions with cookie get/set, ensure no child components access the `favorites` cookie store.
 */
export const FavoritesProvider: React.FC<FavoritesProviderProps> = (props) => {
    const { children } = props

    const [cookies, setCookie] = useCookies()
    const [favoriteSet, setFavoriteSet] = useState<Set<string>>(new Set())

    useEffect(() => {
        const cookieFavoritesValue = cookies[FAVORITES_COOKIE]
        if (cookieFavoritesValue !== undefined) {
            const cookieDownloadsList = cookieFavoritesValue as string[]
            setFavoriteSet(new Set(cookieDownloadsList))
        } else {
            setCookie(FAVORITES_COOKIE, truncateListToCookieSize([]))
        }
    }, [])

    const isFavorite = useCallback(
        (petUrl: string): boolean => {
            return favoriteSet.has(petUrl)
        },
        [favoriteSet],
    )

    const areAllFavorites = useCallback(
        (petUrls: string[]): boolean => {
            return petUrls.length > 0 && petUrls.every((petUrl) => favoriteSet.has(petUrl))
        },
        [favoriteSet],
    )

    const toggleFavorites = useCallback(
        (petUrls: string[]) => {
            setFavoriteSet((prevFavoriteSet) => {
                const updatedFavoriteSet = new Set<string>(prevFavoriteSet)
                if (areAllFavorites(petUrls)) {
                    petUrls.forEach((petUrl) => updatedFavoriteSet.delete(petUrl))
                } else {
                    petUrls.forEach((petUrl) => updatedFavoriteSet.add(petUrl))
                }
                setCookie(FAVORITES_COOKIE, truncateListToCookieSize(Array.from(updatedFavoriteSet)))
                return updatedFavoriteSet
            })
        },
        [favoriteSet],
    )

    return (
        <FavoritesContext.Provider
            value={{
                isFavorite: isFavorite,
                areAllFavorites: areAllFavorites,
                toggleFavorites: toggleFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}
