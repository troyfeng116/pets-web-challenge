import React from 'react'
import { SearchString } from 'models/SearchString'

interface HighlightedSearchStringProps {
    searchString: SearchString
}

export const HighlightedSearchString: React.FC<HighlightedSearchStringProps> = (props) => {
    const {
        searchString: { tokens },
    } = props

    return (
        <p>
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
