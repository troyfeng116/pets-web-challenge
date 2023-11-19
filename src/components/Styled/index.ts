import { css } from 'styled-components'

export interface BaseStyledProps {
    $padding?: string
    $margin?: string
    $clickable?: boolean
}

export const handleBaseStyledProps = css<BaseStyledProps>`
    padding: ${(props) => props.$padding || '0px'};
    margin: ${(props) => props.$margin || '0px'};
    cursor: ${(props) => props.$clickable && 'pointer'};
`
