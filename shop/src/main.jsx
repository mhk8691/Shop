import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { alpha, createTheme, getContrastRatio, ThemeProvider } from '@mui/material'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import store from './store.js'

const queryClient = new QueryClient()
const indigo = alpha('#511396', 0.7)
const brightPink = alpha('#EF476F', 0.7)
const sungLow = alpha('#FFD166', 0.7)
const emerald = alpha('#06D6A0', 0.7)
const white = alpha('#FFFCF9', 0.7)


const theme = createTheme({
  palette: {
    primary: {
      light: alpha(indigo, .5),
      main: indigo,
      dark: alpha(indigo, .9),
      contrastText: getContrastRatio(indigo, '#fff') > 4.5 ? '#fff' : '#111'
    },
    secondary: {

      light: alpha(brightPink, .5),
      main: brightPink,
      dark: alpha(brightPink, .9),
      contrastText: getContrastRatio(brightPink, '#fff') > 4.5 ? '#fff' : '#111'
    },
    sungLow: {
      light: alpha(sungLow, .5),
      main: sungLow,
      dark: alpha(sungLow, .9),
      contrastText: getContrastRatio(sungLow, '#fff') > 4.5 ? '#fff' : '#111'
    },
    emerald: {
      light: alpha(emerald, .5),
      main: emerald,
      dark: alpha(emerald, .9),
      contrastText: getContrastRatio(emerald, '#fff') > 4.5 ? '#fff' : '#111'
    },
    white: {
      light: alpha(white, .5),
      main: white,
      dark: alpha(white, .9),
      contrastText: getContrastRatio(white, '#fff') > 4.5 ? '#fff' : '#111'
    }
  }
})




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)