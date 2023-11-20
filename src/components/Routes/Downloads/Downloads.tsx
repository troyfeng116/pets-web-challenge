import React from 'react'
import DownloadRecordRow from 'components/DownloadRecordRow'
import { Section } from 'components/Styled/Section'
import { STD_FONT_H2, StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'

export const Downloads: React.FC = () => {
    const { downloadedPets } = useDownloadsContext()

    return (
        <Section $marginTop={24}>
            <StyledText as="h2" $font={STD_FONT_H2} $marginBottom={18}>
                My recent downloads ({downloadedPets.length})
            </StyledText>
            <div>
                {downloadedPets.map((downloadRecord, idx) => {
                    return <DownloadRecordRow key={idx} downloadRecord={downloadRecord} />
                })}
            </div>
        </Section>
    )
}
