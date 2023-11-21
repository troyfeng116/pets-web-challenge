import React from 'react'
import { StdColors } from 'components/Styled/Colors'
import { StyledTable, StyledTd } from 'components/Styled/Table'
import { PetDownloadRecord } from 'models/PetDownloadRecord'

import DownloadRecordRow from './DownloadRecordRow'

interface DownloadsTableProps {
    downloadedRecords: PetDownloadRecord[]

    deletePetDownload: (downloadId: string) => void
}

export const DownloadsTable: React.FC<DownloadsTableProps> = (props) => {
    const { downloadedRecords, deletePetDownload } = props

    return (
        <StyledTable $backgroundColor={StdColors.WHITE}>
            <thead>
                <tr>
                    <StyledTd as="th" $padding="6px"></StyledTd>
                    <StyledTd as="th" $padding="6px">
                        Title/description
                    </StyledTd>
                    <StyledTd as="th" $padding="6px">
                        Downloaded on
                    </StyledTd>
                    <StyledTd as="th" $padding="6px">
                        Actions
                    </StyledTd>
                </tr>
            </thead>
            <tbody>
                {downloadedRecords.map((downloadRecord, idx) => {
                    return (
                        <DownloadRecordRow
                            key={idx}
                            downloadRecord={downloadRecord}
                            deletePetDownload={deletePetDownload}
                        />
                    )
                })}
            </tbody>
        </StyledTable>
    )
}
