import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Outlet } from 'react-router-dom'
import NavBar from 'components/NavBar'
import { FlexContainer } from 'components/Styled/Flex'
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
                        <FlexContainer $isFlexCol={true} as="main">
                            <Outlet />
                        </FlexContainer>
                    </PetsProvider>
                </DownloadsProvider>
            </CookiesProvider>
        </>
    )
}
