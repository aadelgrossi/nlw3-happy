import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import AppProvider from '@/hooks'

import GlobalStyle from '../styles/global'
import 'leaflet/dist/leaflet.css'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </AppProvider>
  )
}

export default MyApp
