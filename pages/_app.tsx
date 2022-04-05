import '../styles/globals.css'
import { EntriesProvider } from '../context/entries';
import { SnackbarProvider } from 'notistack';
import { UIProvider } from '../context/ui/UIProvider';
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from '../themes'




function MyApp({ Component, pageProps }: AppProps) {
  return (

    <SnackbarProvider maxSnack={ 3 }>
      <EntriesProvider>
        <UIProvider>
            <ThemeProvider theme={ darkTheme }>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
      
  )
}

export default MyApp
