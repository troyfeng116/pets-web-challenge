import styled from 'styled-components'

import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { Container } from 'components/Styled'
import { SecondaryButton } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer } from 'components/Styled/Flex'

const ModalBackdrop = styled(Container)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);

    body {
        overflow: hidden;
        position: fixed;
    }
`

const ModalCardContainer = styled(Card)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ModalCloseButton = styled(SecondaryButton)`
    position: absolute;
    top: 6px;
    right: 6px;
`

interface ModalProps {
    children: React.ReactNode
    onClose: () => void
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { children, onClose } = props

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalCardContainer
                $padding="24px 18px 18px 18px"
                $backgroundColor={StdColors.WHITE}
                onClick={(e) => e.stopPropagation()}
            >
                <ModalCloseButton $padding="3px" onClick={onClose}>
                    <FlexContainer>
                        <IoMdClose />
                    </FlexContainer>
                </ModalCloseButton>
                {children}
            </ModalCardContainer>
        </ModalBackdrop>
    )
}
