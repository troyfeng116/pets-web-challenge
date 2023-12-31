import React from 'react'
import { SearchString } from 'models/SearchString'

interface HighlightedSearchStringProps {
    className?: string
    searchString: SearchString
}

export const HighlightedSearchString: React.FC<HighlightedSearchStringProps> = (props) => {
    const {
        className = '',
        searchString: { tokens },
    } = props

    return (
        <p className={className}>
            {tokens.map(({ substr, isMatch }, idx) => {
                return (
                    <span style={{ backgroundColor: isMatch ? 'orange' : undefined }} key={idx}>
                        {substr}
                    </span>
                )
            })}
        </p>
    )
}
