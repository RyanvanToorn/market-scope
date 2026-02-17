import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@screens/routes'
import './index.css'
import './app.css'
import { ThemeProvider } from '@mui/material'
import { theme } from '@theme/theme'
import { AppSettingsProvider } from '@context/AppSettingsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <AppSettingsProvider>
          <RouterProvider router={router}/> 
        </AppSettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
