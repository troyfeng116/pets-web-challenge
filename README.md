# Pets Web Challenge

[GitHub pages deployment](https://troyfeng116.github.io/pets-web-challenge/#/)

[About](https://troyfeng116.github.io/pets-web-challenge/#/about)



## Features

- Provider to manage data fetching from pets URL (`components/Wrappers/PetsProvider`)
- Providers to manage client cookies for persistent favorites/downloads storage in lieu of a full backend (`components/Wrappers/DownloadsProvider`, `components/Wrappers/FavoritesProvider`)
- Dynamic cookie stringification and truncation for browser support, implemented with binary search, for least-recently-used (LRU) eviction policy (`lib/utils/cookies`)
- Custom hook with reducer model to manage client-side state management (selection, filtering, etc.) (`components/hooks/useClientPetsManager`)
- Custom hook with reducer model to manage data fetching (`components/hooks/usePets`)
- Interactive search text highlighting, implemented with KMP pattern matching (`lib/utils/searchPets.ts`)
- Responsive design, with support for all screen widths using standard `styled-components`



## Home page

View, filter, sort, select favorites, individual/batch download.

<img src="https://github.com/troyfeng116/pets-web-challenge/blob/main/docs/images/home1.png?raw=true" alt="Home page 1" width="600"/>
<img src="https://github.com/troyfeng116/pets-web-challenge/blob/main/docs/images/home2.png?raw=true" alt="Home page 2" width="600"/>




## Downloads page

View recent downloaded pets (subject to browser cookie limitations, with download timestamp recency eviction policy).

<img src="https://github.com/troyfeng116/pets-web-challenge/blob/main/docs/images/downloads.png?raw=true" alt="Downloads page" width="600"/>




## Favorites page

View favorite pet images (subject to browser cookie limitations).

<img src="https://github.com/troyfeng116/pets-web-challenge/blob/main/docs/images/favorites.png?raw=true" alt="Favorites page" width="600"/>

