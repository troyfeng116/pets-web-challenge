import styled from 'styled-components'

export const FlexRowContainer = styled.div`
    display: flex;
    align-items: center;
`

export const FlexColContainer = styled(FlexRowContainer)`
    flex-direction: column;
`

export const FlexRowCenterContainer = styled(FlexRowContainer)`
    justify-content: center;
`

export const FlexColCenterContainer = styled(FlexColContainer)`
    justify-content: center;
`
