import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { Container } from 'components/Styled'
import { STD_BORDER_R6 } from 'components/Styled/Border'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer, STD_JUSTIFY_CENTER } from 'components/Styled/Flex'
import { StyledText } from 'components/Styled/Text'

interface CheckboxProps {
    label?: React.ReactNode
    isChecked: boolean
    id?: string

    onChecked: () => void
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { label, isChecked, id, onChecked } = props

    return (
        <FlexContainer $clickable={true} onClick={onChecked}>
            <label>
                <input id={id} type="checkbox" checked={isChecked} onChange={onChecked} style={{ display: 'none' }} />
                <FlexContainer
                    $justifyContent={STD_JUSTIFY_CENTER}
                    $width={18}
                    $height={18}
                    $borderRadius={STD_BORDER_R6}
                    $backgroundColor={isChecked ? StdColors.DARK_BLUE : StdColors.GRAY}
                    $clickable={true}
                >
                    {isChecked && (
                        <StyledText $color={StdColors.WHITE}>
                            <FaCheck size={12} />
                        </StyledText>
                    )}
                </FlexContainer>
            </label>
            {label !== undefined && (
                <Container
                    $clickable={true}
                    $color={isChecked ? StdColors.DARK_BLUE : StdColors.GRAY}
                    as="label"
                    htmlFor={id}
                    $marginLeft={6}
                >
                    {label}
                </Container>
            )}
        </FlexContainer>
    )
}
