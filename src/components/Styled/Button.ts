import styled from 'styled-components'

import { STD_BORDER_R6 } from './Border'
import { StdColors } from './Colors'
import { STD_FONT_MEDIUM } from './Text'
import { BaseStyledProps } from '.'

type ButtonProps = BaseStyledProps

export const Button = styled.button<ButtonProps>`
    margin: ${(props) => props.$margin || '0px'};
    padding: ${(props) => props.$padding || '6px 18px'};

    ${STD_FONT_MEDIUM}
    ${STD_BORDER_R6}
    background-color: ${StdColors.DARK_BLUE};
    color: ${StdColors.WHITE};
    cursor: pointer;
    border: none;
    outline: none;

    &:hover {
        background-color: ${StdColors.MEDIUM_BLUE};
    }

    &:active {
        background-color: ${StdColors.LIGHT_BLUE};
    }
`
