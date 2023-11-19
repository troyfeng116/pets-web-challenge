import styled from 'styled-components'

import { BaseStyledProps, handleBaseStyledProps } from '.'

export const ContainedImg = styled.img<BaseStyledProps>`
    ${handleBaseStyledProps}
    object-fit: contain;
`
