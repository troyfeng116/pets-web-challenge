import styled, { css, RuleSet } from 'styled-components'

import { BaseStyledProps, handleBaseStyledProps } from '.'

export const STD_ALIGN_CENTER = css`
    align-items: center;
`

export const STD_JUSTIFY_CENTER = css`
    justify-content: center;
`

export const STD_JUSTIFY_BETWEEN = css`
    justify-content: space-between;
`

interface FlexProps extends BaseStyledProps {
    $isFlexCol?: boolean
    $alignItems?: RuleSet<object>
    $justifyContent?: RuleSet<object>
}

export const FlexContainer = styled.div<FlexProps>`
    ${handleBaseStyledProps}

    display: flex;
    flex-direction: ${(props) => (props.$isFlexCol ? 'column' : 'row')};
    ${(props) => props.$alignItems || STD_ALIGN_CENTER};
    ${(props) => props.$justifyContent};
`
