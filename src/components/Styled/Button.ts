import styled from 'styled-components'

import { STD_BORDER_R6 } from './Border'
import { StdColors } from './Colors'
import { STD_FONT_MEDIUM } from './Text'
import { BaseStyledProps, handleBaseStyledProps } from '.'

type ButtonProps = BaseStyledProps

export const Button = styled.button<ButtonProps>`
    ${handleBaseStyledProps}

    padding: ${(props) => props.$padding || '6px 18px'};
    ${STD_FONT_MEDIUM}
    ${STD_BORDER_R6}
    background-color: ${StdColors.WHITE};
    color: ${StdColors.DARK_BLUE};
    border: 1px solid ${StdColors.DARK_BLUE};
    cursor: pointer;

    &:hover:not([disabled]) {
        background-color: ${StdColors.DARK_BLUE};
        color: ${StdColors.WHITE};
    }

    &:active:not([disabled]) {
        background-color: ${StdColors.LIGHT_BLUE};
        border: 1px solid ${StdColors.LIGHT_BLUE};
        color: ${StdColors.WHITE};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
`

export const SecondaryButton = styled.button<ButtonProps>`
    ${handleBaseStyledProps}

    padding: ${(props) => props.$padding || '6px 12px'};
    ${STD_FONT_MEDIUM}
    ${STD_BORDER_R6}
    background-color: ${StdColors.WHITE};
    color: ${StdColors.MEDIUM_BLUE};
    border: 1px solid ${StdColors.MEDIUM_BLUE};
    cursor: pointer;
    outline: none;
    box-sizing: border-box;

    &:hover:not([disabled]) {
        background-color: ${StdColors.MEDIUM_BLUE};
        color: ${StdColors.WHITE};
    }

    &:active:not([disabled]) {
        background-color: ${StdColors.LIGHT_BLUE};
        border: 1px solid ${StdColors.LIGHT_BLUE};
        color: ${StdColors.WHITE};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
`

export const TernaryButton = styled.button<ButtonProps>`
    ${handleBaseStyledProps}

    padding: ${(props) => props.$padding || '3px 6px'};
    ${STD_FONT_MEDIUM}
    ${STD_BORDER_R6}
    background-color: ${StdColors.WHITE};
    color: ${StdColors.GRAY};
    border: 1px solid ${StdColors.GRAY};
    cursor: pointer;
    outline: none;

    &:hover:not([disabled]) {
        background-color: ${StdColors.GRAY};
        color: ${StdColors.WHITE};
    }

    &:active:not([disabled]) {
        background-color: ${StdColors.DARK_GRAY};
        border: 1px solid ${StdColors.DARK_GRAY};
        color: ${StdColors.WHITE};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
`
