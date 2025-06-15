import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createTheme, MantineProvider} from '@mantine/core'
import './index.css'
import App from './App.tsx'

const theme = createTheme ({

})

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='dark'>
    <App />
    </MantineProvider>

  </StrictMode>,
)
