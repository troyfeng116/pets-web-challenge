import styled, { RuleSet } from 'styled-components'

import { CARD_BORDER_BASE, STD_BORDER_R12 } from './Border'
import { FlexContainer } from './Flex'
import { BaseStyledProps, handleBaseStyledProps } from '.'

interface CardProps extends BaseStyledProps {
    $border?: RuleSet<object>
}

export const Card = styled(FlexContainer)<CardProps>`
    ${handleBaseStyledProps}
    padding: ${(props) => props.$padding || '6px'};

    ${STD_BORDER_R12}
    ${(props) => props.$border || CARD_BORDER_BASE};
    box-sizing: border-box;
`
