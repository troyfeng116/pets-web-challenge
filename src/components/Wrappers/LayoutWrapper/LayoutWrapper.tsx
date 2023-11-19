import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Outlet } from 'react-router-dom'
import NavBar from 'components/NavBar'
import { FlexColContainer } from 'components/Styled/Flex'
import { GlobalStyle } from 'components/Styled/Global'

import DownloadsProvider from '../DownloadsProvider'
import PetsProvider from '../PetsProvider'

export const LayoutWrapper: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <CookiesProvider>
                <DownloadsProvider>
                    <PetsProvider>
                        <NavBar />
                        <FlexColContainer as="main">
                            <Outlet />
                        </FlexColContainer>
                    </PetsProvider>
                </DownloadsProvider>
            </CookiesProvider>
        </>
    )
}
