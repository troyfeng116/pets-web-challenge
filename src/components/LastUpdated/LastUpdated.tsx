import React, { useEffect, useState } from 'react'
import { toClientDateString } from 'lib/utils/dateUtils'

interface LastUpdatedProps {
    lastUpdate: Date
    className?: string
}

export const LastUpdated: React.FC<LastUpdatedProps> = (props) => {
    const { lastUpdate, className = '' } = props

    const [lastUpdatedMessage, setLastUpdatedMessage] = useState<string>('')
    const [triggerRefresh, setTriggerRefresh] = useState<boolean>(true)

    const getMessage = (updateTime: Date): string => {
        const nowTime = new Date()
        const diffS = Math.round((nowTime.getTime() - updateTime.getTime()) / 1000)
        let sinceStr = ''
        if (diffS < 60) {
            sinceStr = `${diffS}s ago`
        } else if (diffS < 60 * 60) {
            const minutes = Math.floor(diffS / 60)
            sinceStr = `${minutes} min${minutes > 1 ? 's' : ''} ago`
        } else {
            sinceStr = toClientDateString(updateTime)
        }

        return `last updated: ${sinceStr}`
    }

    useEffect(() => {
        setLastUpdatedMessage(getMessage(lastUpdate))
        const timeout = setTimeout(() => {
            setTriggerRefresh((prevTriggerRefresh) => !prevTriggerRefresh)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [lastUpdate, triggerRefresh])

    return <p className={className}>{lastUpdatedMessage}</p>
}
