import React from 'react'
import { PrimaryButton } from 'components/Styled/Button'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { StyledTd } from 'components/Styled/Table'
import { STD_FONT_LARGE, StyledText } from 'components/Styled/Text'
import { toClientDateString } from 'lib/utils/dateUtils'
import { PetDownloadRecord } from 'models/PetDownloadRecord'

interface DownloadRecordRowProps {
    downloadRecord: PetDownloadRecord

    deletePetDownload: (downloadId: string) => void
}

export const DownloadRecordRow: React.FC<DownloadRecordRowProps> = (props) => {
    const { downloadRecord, deletePetDownload } = props
    const { petInfo, timestampMs, downloadId } = downloadRecord
    const { title, description, url, created } = petInfo

    return (
        <tr>
            <StyledTd $padding="6px">
                <FlexContainer>
                    <ContainedImg src={url} alt={title} height={66} width={99} />
                </FlexContainer>
            </StyledTd>
            <StyledTd $padding="6px 18px">
                <div>
                    <FlexContainer $marginBottom={6}>
                        <StyledText $font={STD_FONT_LARGE} $marginRight={18}>
                            {title}
                        </StyledText>
                        <StyledText $color={StdColors.GRAY}>Created {toClientDateString(created)}</StyledText>
                    </FlexContainer>
                    <StyledText>{description}</StyledText>
                </div>
            </StyledTd>
            <StyledTd $padding="6px 12px">{toClientDateString(timestampMs)}</StyledTd>
            <StyledTd $padding="6px 12px">
                <PrimaryButton onClick={() => deletePetDownload(downloadId)}>Clear</PrimaryButton>
            </StyledTd>
        </tr>
    )
}
