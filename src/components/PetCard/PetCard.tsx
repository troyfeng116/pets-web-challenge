import React, { useState } from 'react'
import { IoMdDownload } from 'react-icons/io'
import Checkbox from 'components/Checkbox'
import HighlightedSearchString from 'components/HighlightedSearchString'
import { Container } from 'components/Styled'
import { CARD_BORDER_ACTIVE, CARD_BORDER_BASE, STD_BORDER_R12 } from 'components/Styled/Border'
import { Button } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer, STD_JUSTIFY_BETWEEN } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { STD_FONT_LARGE, STD_FONT_SMALL, StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { toClientDateString } from 'lib/utils/dateUtils'
import { ClientPet } from 'models/Pet'

interface PetCardProps {
    petInfo: ClientPet
    isSelected: boolean
    className?: string

    onSelectPetByUrl: (petUrl: string) => void
}

export const PetCard: React.FC<PetCardProps> = (props) => {
    const { petInfo, isSelected, className = '', onSelectPetByUrl } = props
    const { url, created, searchedTitle, searchedDescription } = petInfo

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
            $padding="12px 18px"
            $backgroundColor={StdColors.WHITE}
            $border={isSelected ? CARD_BORDER_ACTIVE : CARD_BORDER_BASE}
            $isFlexCol={true}
        >
            <StyledText $font={STD_FONT_LARGE} $shouldCenter={true} $marginBottom={6}>
                <HighlightedSearchString searchString={searchedTitle} />
            </StyledText>
            <StyledText $font={STD_FONT_SMALL} $shouldCenter={true} $color={StdColors.GRAY} $marginBottom={6}>
                Created {toClientDateString(created)}
            </StyledText>
            <ContainedImg
                $backgroundColor={StdColors.LIGHT_GRAY}
                $borderRadius={STD_BORDER_R12}
                $marginBottom={12}
                height={190}
                width={285}
                src={url}
                alt="title"
            />
            <StyledText $shouldCenter={true} $marginBottom={24}>
                <HighlightedSearchString searchString={searchedDescription} />
            </StyledText>

            <FlexContainer $justifyContent={STD_JUSTIFY_BETWEEN} $width="100%">
                <Button disabled={isDownloading} onClick={onDownloadClick}>
                    <FlexContainer>
                        <IoMdDownload />
                        <Container $marginLeft={3}>Download image</Container>
                    </FlexContainer>
                </Button>
                <Checkbox label="Select" isChecked={isSelected} onChecked={() => onSelectPetByUrl(url)} />
            </FlexContainer>
        </Card>
    )
}
