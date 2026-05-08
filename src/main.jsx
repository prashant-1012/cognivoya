import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

import { store } from '@/app/store'
import AppRouter from '@/router/AppRouter'
import ThemeProvider from '@/features/theme/ThemeProvider'
import SearchModal from '@/features/search/SearchModal'
import '@/styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <AppRouter />
            <SearchModal />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--color-surface-raised)',
                  color: 'var(--color-foreground)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  fontSize: '14px',
                },
              }}
            />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </StrictMode>
)
