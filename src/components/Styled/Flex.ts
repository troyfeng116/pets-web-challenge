import styled, { css, RuleSet } from 'styled-components'

import { BaseStyledProps, handleBaseStyledProps } from '.'

/**
 * Standard alignment
 */

export const STD_ALIGN_NORMAL = css`
    align-items: normal;
`

export const STD_ALIGN_END = css`
    align-items: flex-end;
`

export const STD_ALIGN_CENTER = css`
    align-items: center;
`

/**
 * Standard justify
 */

export const STD_JUSTIFY_CENTER = css`
    justify-content: center;
`

export const STD_JUSTIFY_BETWEEN = css`
    justify-content: space-between;
`

export const STD_JUSTIFY_END = css`
    justify-content: flex-end;
`

/**
 * Standard wrap
 */

export const STD_FLEX_WRAP = css`
    flex-wrap: wrap;
`

interface FlexProps extends BaseStyledProps {
    $isFlexCol?: boolean
    $alignItems?: RuleSet<object>
    $justifyContent?: RuleSet<object>
    $flexWrap?: RuleSet<object>
}

export const FlexContainer = styled.div<FlexProps>`
    ${handleBaseStyledProps}

    display: flex;
    flex-direction: ${(props) => (props.$isFlexCol ? 'column' : 'row')};
    ${(props) => props.$alignItems || STD_ALIGN_CENTER};
    ${(props) => props.$justifyContent};
    ${(props) => props.$flexWrap};
`

export const ResponsiveFlexContainer = styled(FlexContainer)`
    flex-direction: 'row';

    @media only screen and (max-width: ${(props) => props.$cutoff}) {
        flex-direction: column;
    }
`
