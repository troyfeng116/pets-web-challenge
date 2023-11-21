import styled from 'styled-components'

import { STD_BORDER_MEDIUM_BLUE } from './Border'
import { BaseStyledProps, handleBaseStyledProps } from '.'

export const StyledTable = styled.table<BaseStyledProps>`
    ${handleBaseStyledProps}

    ${STD_BORDER_MEDIUM_BLUE}
    border-spacing: 0px;
    border-collapse: collapse;
`

export const StyledTd = styled.td<BaseStyledProps>`
    ${handleBaseStyledProps}

    ${STD_BORDER_MEDIUM_BLUE}
`
