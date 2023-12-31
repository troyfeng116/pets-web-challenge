import React, { useState } from 'react'
import { IoMdDownload } from 'react-icons/io'
import Checkbox from 'components/Checkbox'
import HighlightedSearchString from 'components/HighlightedSearchString'
import PetImage from 'components/PetImage'
import { Container } from 'components/Styled'
import { CARD_BORDER_ACTIVE, CARD_BORDER_BASE } from 'components/Styled/Border'
import { PrimaryButton } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { StyledStar } from 'components/Styled/FavoriteStar'
import { FlexContainer, STD_JUSTIFY_BETWEEN } from 'components/Styled/Flex'
import { STD_POSITION_ABSOLUTE, STD_POSITION_RELATIVE } from 'components/Styled/Position'
import { STD_FONT_LARGE, STD_FONT_SMALL, StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { toClientDateString } from 'lib/utils/dateUtils'
import { ClientPet, Pet } from 'models/Pet'

interface PetCardProps {
    petInfo: ClientPet
    isSelected: boolean
    isFavorite: boolean
    className?: string

    onSelectPetByUrl: (petUrl: string) => void
    onClickForModal: (petInfo: Pet) => void
    onFavoritePetByUrl: (petUrl: string) => void
}

export const PetCard: React.FC<PetCardProps> = (props) => {
    const {
        petInfo,
        isSelected,
        isFavorite,
        className = '',
        onSelectPetByUrl,
        onClickForModal,
        onFavoritePetByUrl,
    } = props
    const { url, created, title, searchedTitle, searchedDescription } = petInfo

    const { downloadPetInfo } = useDownloadsContext()

    const [isDownloading, setIsDownloading] = useState<boolean>(false)

    const onDownloadCompleteCallback = (success: boolean, error?: string) => {
        setIsDownloading(false)
        if (!success) {
            console.error(error)
        }
    }

    const onDownloadClick = () => downloadPetInfo(petInfo, onDownloadCompleteCallback)

    return (
        <Card
            className={className}
            $padding="18px 18px 12px 18px"
            $backgroundColor={StdColors.WHITE}
            $border={isSelected ? CARD_BORDER_ACTIVE : CARD_BORDER_BASE}
            $isFlexCol={true}
            $justifyContent={STD_JUSTIFY_BETWEEN}
            $position={STD_POSITION_RELATIVE}
        >
            <Container $position={STD_POSITION_ABSOLUTE} $top={6} $right={6}>
                <StyledStar $isFavorite={isFavorite} onClick={() => onFavoritePetByUrl(url)} size={24} />
            </Container>
            <FlexContainer $isFlexCol={true} $marginBottom={24}>
                <StyledText as="div" $font={STD_FONT_LARGE} $shouldCenter={true} $marginBottom={6}>
                    <HighlightedSearchString searchString={searchedTitle} />
                </StyledText>
                <StyledText $font={STD_FONT_SMALL} $shouldCenter={true} $color={StdColors.GRAY} $marginBottom={6}>
                    Created {toClientDateString(created)}
                </StyledText>
                <PetImage
                    src={url}
                    alt={title}
                    $marginBottom={12}
                    height={190}
                    width={285}
                    onClick={() => onClickForModal(petInfo)}
                />
                <StyledText as="div" $shouldCenter={true}>
                    <HighlightedSearchString searchString={searchedDescription} />
                </StyledText>
            </FlexContainer>

            <FlexContainer $justifyContent={STD_JUSTIFY_BETWEEN} $width="100%">
                <PrimaryButton disabled={isDownloading} onClick={onDownloadClick}>
                    <FlexContainer>
                        <IoMdDownload />
                        <Container $marginLeft={3}>Download image</Container>
                    </FlexContainer>
                </PrimaryButton>
                <Checkbox label="Select" isChecked={isSelected} onChecked={() => onSelectPetByUrl(url)} />
            </FlexContainer>
        </Card>
    )
}
