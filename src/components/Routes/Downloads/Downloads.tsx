import React from 'react'
import { NavLink } from 'react-router-dom'
import DownloadsTable from 'components/DownloadsTable'
import { FlexContainer } from 'components/Styled/Flex'
import { Section } from 'components/Styled/Section'
import { STD_FONT_LARGE, StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'

export const Downloads: React.FC = () => {
    const { downloadedPets, deletePetDownload } = useDownloadsContext()

    return (
        <FlexContainer $isFlexCol={true} $marginTop={24}>
            <Section $padding="18px 30px">
                <FlexContainer $isFlexCol={true}>
                    <StyledText as="h2" $font={STD_FONT_LARGE} $marginBottom={18} $shouldCenter={true}>
                        My recent downloads ({downloadedPets.length})
                    </StyledText>
                    {downloadedPets.length === 0 ? (
                        <StyledText>
                            Download pet images <NavLink to="/">here</NavLink>
                        </StyledText>
                    ) : (
                        <DownloadsTable downloadedRecords={downloadedPets} deletePetDownload={deletePetDownload} />
                    )}
                </FlexContainer>
            </Section>
        </FlexContainer>
    )
}
