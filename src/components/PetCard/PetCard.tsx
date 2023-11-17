import React from 'react'
import { Pet } from 'models/Pet'

interface PetCardProps {
    petInfo: Pet
}

export const PetCard: React.FC<PetCardProps> = (props) => {
    const { petInfo } = props
    const { url, title, description, created } = petInfo

    return (
        <div>
            <img width={290} src={url} alt="title" />
            <p>{title}</p>
            <p>{description}</p>
            <p>{created}</p>
        </div>
    )
}
