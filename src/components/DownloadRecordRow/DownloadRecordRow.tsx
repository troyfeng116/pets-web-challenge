import styled from 'styled-components'

import React from 'react'
import { FlexRowContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { DownloadRecord } from 'components/Wrappers/DownloadsProvider'

const RowWithBorder = styled(FlexRowContainer)`
    border: 1px solid #000000;
    padding: 6px;
`

interface DownloadRecordRowProps {
    downloadRecord: DownloadRecord
}

export const DownloadRecordRow: React.FC<DownloadRecordRowProps> = (props) => {
    const { downloadRecord } = props
    const { petInfo, timestampMs } = downloadRecord
    const { title, description, url, created } = petInfo

    return (
        <RowWithBorder>
            <ContainedImg src={url} height={50} width={90} />
            <div>
                <p>
                    {title} (Created on {new Date(created).toLocaleDateString()})
                </p>
                <p>{description}</p>
            </div>
            <div>Downloaded at {new Date(timestampMs).toLocaleTimeString()}</div>
        </RowWithBorder>
    )
}
