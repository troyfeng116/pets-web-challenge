import React from 'react'
import DownloadRecordRow from 'components/DownloadRecordRow'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'

export const Downloads: React.FC = () => {
    const { downloadedPets } = useDownloadsContext()

    return (
        <div>
            <h2>My downloads</h2>
            <div>
                {downloadedPets.map((downloadRecord, idx) => {
                    return <DownloadRecordRow key={idx} downloadRecord={downloadRecord} />
                })}
            </div>
        </div>
    )
}
