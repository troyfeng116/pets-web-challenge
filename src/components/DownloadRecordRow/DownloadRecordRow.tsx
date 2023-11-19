import styled from 'styled-components'

import React from 'react'
import { FlexContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { DownloadRecord } from 'components/Wrappers/DownloadsProvider'
import { toClientDateString } from 'lib/utils/dateUtils'

const RowWithBorder = styled(FlexContainer)`
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
                    {title} (Created on {toClientDateString(created)})
                </p>
                <p>{description}</p>
            </div>
            <div>Downloaded at {toClientDateString(timestampMs)}</div>
        </RowWithBorder>
    )
}
