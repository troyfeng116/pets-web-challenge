import React from 'react'
import { NavLink } from 'react-router-dom'
import { FlexContainer } from 'components/Styled/Flex'

export const NavBar: React.FC = () => {
    return (
        <FlexContainer as="nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/downloads">Downloads</NavLink>
        </FlexContainer>
    )
}
