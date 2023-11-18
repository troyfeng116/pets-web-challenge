import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FlexColContainer, FlexRowContainer } from 'components/Styled/Flex'

import PetsProvider from '../PetsProvider'

export const LayoutWrapper: React.FC = () => {
    return (
        <PetsProvider>
            <FlexRowContainer as="nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </FlexRowContainer>
            <FlexColContainer as="main">
                <Outlet />
            </FlexColContainer>
        </PetsProvider>
    )
}
