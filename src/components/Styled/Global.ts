import { createGlobalStyle } from 'styled-components'

import { StdColors } from './Colors'

export const GlobalStyle = createGlobalStyle`
    body {
        color: ${StdColors.DARK_BLUE};
        font-family: 'Helvetica Neue', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
`
