import styled, { RuleSet } from 'styled-components'

import { CARD_BORDER_BASE, STD_BORDER_R12 } from './Border'
import { FlexColCenterContainer } from './Flex'
import { BaseStyledProps } from '.'

interface CardProps extends BaseStyledProps {
    $border?: RuleSet<object>
}

export const Card = styled(FlexColCenterContainer)<CardProps>`
    ${STD_BORDER_R12}
    ${(props) => props.$border || CARD_BORDER_BASE};
    padding: ${(props) => props.$padding || '6px'};
    box-sizing: border-box;
`
