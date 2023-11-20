import React from 'react'
import PetImage from 'components/PetImage'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer } from 'components/Styled/Flex'
import { toClientDateString } from 'lib/utils/dateUtils'
import { PetDownloadRecord } from 'models/PetDownloadRecord'

interface DownloadRecordRowProps {
    downloadRecord: PetDownloadRecord
}

export const DownloadRecordRow: React.FC<DownloadRecordRowProps> = (props) => {
    const { downloadRecord } = props
    const { petInfo, timestampMs } = downloadRecord
    const { title, description, url, created } = petInfo

    return (
        <FlexContainer $padding="6px" $backgroundColor={StdColors.WHITE}>
            <PetImage url={url} alt={title} height={50} width={90} />
            <div>
                <p>
                    {title} (Created on {toClientDateString(created)})
                </p>
                <p>{description}</p>
            </div>
            <div>Downloaded on {toClientDateString(timestampMs)}</div>
        </FlexContainer>
    )
}
