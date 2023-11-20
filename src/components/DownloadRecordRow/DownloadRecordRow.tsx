import React from 'react'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { DownloadRecord } from 'components/Wrappers/DownloadsProvider'
import { toClientDateString } from 'lib/utils/dateUtils'

interface DownloadRecordRowProps {
    downloadRecord: DownloadRecord
}

export const DownloadRecordRow: React.FC<DownloadRecordRowProps> = (props) => {
    const { downloadRecord } = props
    const { petInfo, timestampMs } = downloadRecord
    const { title, description, url, created } = petInfo

    return (
        <FlexContainer $padding="6px" $backgroundColor={StdColors.WHITE}>
            <ContainedImg src={url} height={50} width={90} />
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
