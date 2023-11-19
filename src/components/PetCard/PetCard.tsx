import styled from 'styled-components'

import React, { useState } from 'react'
import { IoMdDownload } from 'react-icons/io'
import HighlightedSearchString from 'components/HighlightedSearchString'
import { Container } from 'components/Styled'
import { CARD_BORDER_ACTIVE, CARD_BORDER_BASE, STD_BORDER_R12 } from 'components/Styled/Border'
import { Button } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { STD_FONT_LARGE, STD_FONT_SMALL, STD_TEXT_ALIGN_CENTER, StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { toClientDateString } from 'lib/utils/dateUtils'
import { ClientPet } from 'models/Pet'

const StyledTitle = styled(HighlightedSearchString)`
    ${STD_FONT_LARGE}
    ${STD_TEXT_ALIGN_CENTER}
    margin-bottom: 6px;
`

const StyledDescription = styled(HighlightedSearchString)`
    ${STD_TEXT_ALIGN_CENTER}
    margin: 12px 0px;
`

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
            $padding="12px 24px"
            $border={isSelected ? CARD_BORDER_ACTIVE : CARD_BORDER_BASE}
            $isFlexCol={true}
        >
            <input type="checkbox" checked={isSelected} onChange={() => onSelectPetByUrl(url)} />
            <StyledTitle searchString={searchedTitle} />
            <StyledText $font={STD_FONT_SMALL} $shouldCenter={true} $color={StdColors.GRAY} $marginBottom={6}>
                Created {toClientDateString(created)}
            </StyledText>
            <ContainedImg
                $backgroundColor={StdColors.LIGHT_GRAY}
                $borderRadius={STD_BORDER_R12}
                height={190}
                width={285}
                src={url}
                alt="title"
            />
            <StyledDescription searchString={searchedDescription} />
            <Button disabled={isDownloading} onClick={onDownloadClick}>
                <FlexContainer>
                    <IoMdDownload />
                    <Container $marginLeft={3}>Download image</Container>
                </FlexContainer>
            </Button>
        </Card>
    )
}
