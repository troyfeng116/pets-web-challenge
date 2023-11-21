import styled from 'styled-components'

import React from 'react'
import { NavLink } from 'react-router-dom'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer } from 'components/Styled/Flex'
import { TABLET } from 'components/Styled/Responsive'

const NavContainer = styled(FlexContainer)`
    border-bottom: 2px solid ${StdColors.GRAY};
    padding: 12px 36px;

    @media only screen and (max-width: ${TABLET}) {
        padding: 12px 18px;
    }
`

const StyledNavLink = styled(NavLink)`
    color: ${StdColors.GRAY};
    text-decoration: none;

    &:not(:last-child) {
        margin-right: 18px;
    }

    &:hover {
        color: ${StdColors.DARK_BLUE};
    }

    &.active {
        color: ${StdColors.DARK_BLUE};
        font-weight: bold;
    }

    @media only screen and (max-width: ${TABLET}) {
        &:not(:last-child) {
            margin-right: 12px;
        }
    }
`

export const NavBar: React.FC = () => {
    return (
        <NavContainer as="nav">
            <FlexContainer>
                <StyledNavLink to="/">Home</StyledNavLink>
                <StyledNavLink to="/about">About</StyledNavLink>
                <StyledNavLink to="/downloads">Downloads</StyledNavLink>
                <StyledNavLink to="/favorites">Favorites</StyledNavLink>
            </FlexContainer>
        </NavContainer>
    )
}
