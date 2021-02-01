/* eslint-disable react/react-in-jsx-scope */
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    font-family: 'Hachi Maru Pop';
    flex-direction: column;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = db.theme

// eslint-disable-next-line react/prop-types
export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
