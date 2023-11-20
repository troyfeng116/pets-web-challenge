import styled, { css, RuleSet } from 'styled-components'

import { StdColors } from './Colors'

export interface BaseStyledProps {
    $padding?: string
    $paddingTop?: number
    $paddingRight?: number
    $paddingBottom?: number
    $paddingLeft?: number

    $margin?: string
    $marginTop?: number
    $marginRight?: number
    $marginBottom?: number
    $marginLeft?: number

    $clickable?: boolean
    $cursor?: RuleSet<object>

    $color?: StdColors
    $backgroundColor?: StdColors

    $width?: number | string
    $maxWidth?: number | string
    $height?: number | string

    $borderRadius?: RuleSet<object>

    $cutoff?: string
    $cutoffRules?: RuleSet<object>
}

export const handleBaseStyledProps = css<BaseStyledProps>`
    padding: ${(props) => props.$padding || '0px'};
    padding-top: ${(props) => props.$paddingTop + 'px'};
    padding-right: ${(props) => props.$paddingRight + 'px'};
    padding-bottom: ${(props) => props.$paddingBottom + 'px'};
    padding-left: ${(props) => props.$paddingLeft + 'px'};

    margin: ${(props) => props.$margin || '0px'};
    margin-top: ${(props) => props.$marginTop + 'px'};
    margin-right: ${(props) => props.$marginRight + 'px'};
    margin-bottom: ${(props) => props.$marginBottom + 'px'};
    margin-left: ${(props) => props.$marginLeft + 'px'};

    cursor: ${(props) => props.$clickable && 'pointer'};
    ${(props) => props.$cursor}

    color: ${(props) => props.$color};
    background-color: ${(props) => props.$backgroundColor};

    width: ${(props) => props.$width + (typeof props.$width === 'number' ? 'px' : '')};
    max-width: ${(props) => props.$maxWidth + (typeof props.$maxWidth === 'number' ? 'px' : '')};
    height: ${(props) => props.$height + (typeof props.$height === 'number' ? 'px' : '')};

    ${(props) => props.$borderRadius}

    @media only screen and (max-width: ${(props) => props.$cutoff}) {
        ${(props) => props.$cutoffRules}
    }
`

export const Container = styled.div<BaseStyledProps>`
    ${handleBaseStyledProps}
`
