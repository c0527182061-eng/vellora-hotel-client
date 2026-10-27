import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import routes from './routes/routes.tsx'
import Userprovider from './context/userContext.tsx'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Userprovider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Userprovider>
  </StrictMode>,
) 
