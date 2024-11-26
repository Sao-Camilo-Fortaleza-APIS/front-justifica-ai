import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import { Toaster } from 'sonner'
import { AuthContextProvider } from './contexts/auth-provider'
import './global.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' richColors />
      <AuthContextProvider>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
