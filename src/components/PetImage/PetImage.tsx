import React from 'react'
import { BaseStyledProps } from 'components/Styled'
import { STD_BORDER_R12 } from 'components/Styled/Border'
import { StdColors } from 'components/Styled/Colors'
import { STD_CURSOR_ZOOM } from 'components/Styled/Cursor'
import { ContainedImg } from 'components/Styled/Image'

interface PetImageProps extends BaseStyledProps {
    url: string
    alt: string
    width: number
    height: number

    onClick?: () => void
}

/**
 * Wrapper around standard styled ContainedImage
 */
export const PetImage: React.FC<PetImageProps> = (props) => {
    const { url, alt, width, height, onClick } = props

    return (
        <ContainedImg
            {...props}
            $backgroundColor={StdColors.LIGHT_GRAY}
            $borderRadius={STD_BORDER_R12}
            $cursor={onClick !== undefined ? STD_CURSOR_ZOOM : undefined}
            height={height}
            width={width}
            src={url}
            alt={alt}
            onClick={onClick}
        />
    )
}
