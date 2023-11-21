import styled from 'styled-components'

import { FaStar } from 'react-icons/fa'

import { StdColors } from './Colors'
import { BaseStyledProps, handleBaseStyledProps } from '.'

interface StyledStarProps extends BaseStyledProps {
    $isFavorite: boolean
}

export const StyledStar = styled(FaStar)<StyledStarProps>`
    ${handleBaseStyledProps}

    color: ${(props) => (props.$isFavorite ? StdColors.DARK_BLUE : StdColors.MEDIUM_GRAY)};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`
