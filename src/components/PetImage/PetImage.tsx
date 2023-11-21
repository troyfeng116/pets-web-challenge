import React from 'react'
import { BaseStyledProps } from 'components/Styled'
import { STD_BORDER_MEDIUM_BLUE, STD_BORDER_R12 } from 'components/Styled/Border'
import { StdColors } from 'components/Styled/Colors'
import { STD_CURSOR_ZOOM } from 'components/Styled/Cursor'
import { ContainedImg } from 'components/Styled/Image'

interface PetImageProps extends BaseStyledProps {
    src: string
    alt: string
    width: number
    height: number

    onClick?: () => void
}

/**
 * Wrapper around standard styled ContainedImage
 */
export const PetImage: React.FC<PetImageProps> = (props) => {
    const { onClick } = props

    return (
        <ContainedImg
            {...props}
            $backgroundColor={StdColors.LIGHT_BLUE}
            $border={STD_BORDER_MEDIUM_BLUE}
            $borderRadius={STD_BORDER_R12}
            $cursor={onClick !== undefined ? STD_CURSOR_ZOOM : undefined}
        />
    )
}
