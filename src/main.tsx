import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/index.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import { queryClient } from './services/query.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
