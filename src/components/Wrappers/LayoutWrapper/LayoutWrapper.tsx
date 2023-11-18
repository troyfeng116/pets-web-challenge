import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from 'components/NavBar'
import { FlexColContainer } from 'components/Styled/Flex'

import PetsProvider from '../PetsProvider'

export const LayoutWrapper: React.FC = () => {
    return (
        <PetsProvider>
            <NavBar />
            <FlexColContainer as="main">
                <Outlet />
            </FlexColContainer>
        </PetsProvider>
    )
}
