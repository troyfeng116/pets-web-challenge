import React from 'react'
import { IoMdClose } from 'react-icons/io'
import PetImage from 'components/PetImage'
import { SecondaryButton } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer, STD_ALIGN_END, STD_FLEX_WRAP } from 'components/Styled/Flex'
import { useFavoritesContext } from 'components/Wrappers/FavoritesProvider/FavoritesProvider'

export const FavoritesGrid: React.FC = () => {
    const { favoriteSet, toggleFavorites } = useFavoritesContext()

    return (
        <FlexContainer $flexWrap={STD_FLEX_WRAP}>
            {Array.from(favoriteSet).map((url, idx) => {
                return (
                    <Card key={idx} $padding="12px" $backgroundColor={StdColors.WHITE} $margin="12px">
                        <FlexContainer $isFlexCol={true} $alignItems={STD_ALIGN_END}>
                            <SecondaryButton $padding="2px" $marginBottom={12} onClick={() => toggleFavorites([url])}>
                                <FlexContainer>
                                    <IoMdClose />
                                </FlexContainer>
                            </SecondaryButton>
                            <PetImage src={url} alt={`Favorite pet ${idx}`} width={300} height={200} />
                        </FlexContainer>
                    </Card>
                )
            })}
        </FlexContainer>
    )
}
