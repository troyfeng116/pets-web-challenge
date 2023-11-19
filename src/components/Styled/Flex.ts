import styled, { css, RuleSet } from 'styled-components'

import { BaseStyledProps, handleBaseStyledProps } from '.'

export const STD_ALIGN_NORMAL = css`
    align-items: normal;
`

export const STD_ALIGN_START = css`
    align-items: flex-start;
`

export const STD_ALIGN_CENTER = css`
    align-items: center;
`

export const STD_JUSTIFY_CENTER = css`
    justify-content: center;
`

export const STD_JUSTIFY_BETWEEN = css`
    justify-content: space-between;
`

export const STD_JUSTIFY_END = css`
    justify-content: flex-end;
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
