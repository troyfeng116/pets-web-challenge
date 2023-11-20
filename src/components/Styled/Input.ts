import styled, { RuleSet } from 'styled-components'

import { STD_BORDER_R6 } from './Border'
import { StdColors } from './Colors'
import { STD_FONT_MEDIUM } from './Text'
import { BaseStyledProps, handleBaseStyledProps } from '.'

interface StyledInputProps extends BaseStyledProps {
    $font?: RuleSet<object>
    $color?: StdColors
}

export const StyledInput = styled.input<StyledInputProps>`
    ${handleBaseStyledProps}

    padding: 6px 12px;
    ${STD_BORDER_R6}
    border: none;
    outline: 1px solid ${StdColors.MEDIUM_BLUE};
    ${(props) => props.$font || STD_FONT_MEDIUM}
    color: ${(props) => props.$color || StdColors.DARK_BLUE};

    &:focus {
        outline: 2px solid ${StdColors.MEDIUM_BLUE};
    }
`
