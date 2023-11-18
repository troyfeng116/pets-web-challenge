import styled from 'styled-components'

import React from 'react'
import { FlexColCenterContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { Pet } from 'models/Pet'

interface PetCardProps {
    petInfo: Pet
}

const Card = styled(FlexColCenterContainer)`
    border: 1px solid #000000;
    border-radius: 6px;
    padding: 12px;
`

export const PetCard: React.FC<PetCardProps> = (props) => {
    const { petInfo } = props
    const { url, title, description, created } = petInfo

    return (
        <Card>
            <ContainedImg height={190} src={url} alt="title" />
            <p>{title}</p>
            <p>{description}</p>
            <p>{created}</p>
        </Card>
    )
}
