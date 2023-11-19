import styled, { css, RuleSet } from 'styled-components'

import { StdColors } from './Colors'
import { BaseStyledProps, handleBaseStyledProps } from '.'

/**
 * Standard fonts
 */

export const STD_FONT_SMALL = css`
    font-size: 12px;
`

export const STD_FONT_MEDIUM = css`
    font-size: 16px;
`

export const STD_FONT_LARGE = css`
    font-size: 20px;
`

export const STD_FONT_H2 = css`
    font-weight: bold;
    font-size: 24px;
`

export const STD_FONT_H1 = css`
    font-weight: bold;
    font-size: 29px;
`

/**
 * Standard text alignment
 */

export const STD_TEXT_ALIGN_CENTER = css`
    text-align: center;
`

interface StyledTextProps extends BaseStyledProps {
    $font?: RuleSet<object>
    $color?: StdColors
    $shouldCenter?: boolean
}

export const StyledText = styled.p<StyledTextProps>`
    ${handleBaseStyledProps}

    ${(props) => props.$font || STD_FONT_MEDIUM}
    color: ${(props) => props.$color || StdColors.DARK_BLUE};
    ${(props) => props.$shouldCenter && STD_TEXT_ALIGN_CENTER}
`
