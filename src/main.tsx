import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './infra/routes/routes.tsx'
import { setupInterceptors } from './infra/api/interceptor.ts'
import { initializeAuth } from './infra/security/auth.init.ts'

setupInterceptors();

const bootstrap = async () => {
  await initializeAuth();

  createRoot(document.getElementById("root")!)
    .render(
      <React.StrictMode>
        <RouterProvider router={routes} />
      </React.StrictMode>
    );
};

bootstrap();
