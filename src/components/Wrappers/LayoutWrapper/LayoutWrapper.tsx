import styled from 'styled-components'

import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Outlet } from 'react-router-dom'
import NavBar from 'components/NavBar'
import { FlexContainer, STD_ALIGN_NORMAL } from 'components/Styled/Flex'
import { GlobalStyle } from 'components/Styled/Global'
import { LAPTOP, MOBILE, TABLET } from 'components/Styled/Responsive'

import DownloadsProvider from '../DownloadsProvider'
import PetsProvider from '../PetsProvider'

const MainWrapper = styled(FlexContainer)`
    padding: 12px 36px 36px 36px;

    @media only screen and (max-width: ${LAPTOP}) {
        padding: 12px 24px 24px 24px;
    }

    @media only screen and (max-width: ${TABLET}) {
        padding: 12px 18px 18px 18px;
    }

    @media only screen and (max-width: ${MOBILE}) {
        padding: 12px 12px 12px 12px;
    }
`

export const LayoutWrapper: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <CookiesProvider>
                <DownloadsProvider>
                    <PetsProvider>
                        <NavBar />
                        <MainWrapper $isFlexCol={true} $alignItems={STD_ALIGN_NORMAL} as="main">
                            <Outlet />
                        </MainWrapper>
                    </PetsProvider>
                </DownloadsProvider>
            </CookiesProvider>
        </>
    )
}
