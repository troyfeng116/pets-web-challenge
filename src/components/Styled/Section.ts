import styled from 'styled-components'

import { STD_BORDER_R12 } from './Border'
import { StdColors } from './Colors'
import { BaseStyledProps, handleBaseStyledProps } from '.'

export const Section = styled.section<BaseStyledProps>`
    ${handleBaseStyledProps}

    padding: 18px;
    background-color: ${StdColors.LIGHT_GRAY};
    ${STD_BORDER_R12}
`
