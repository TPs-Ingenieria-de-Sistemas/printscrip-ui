import React from 'react';
import App from './App.tsx'
import './index.css'
import {createRoot} from "react-dom/client";
import {PaginationProvider} from "./contexts/paginationProvider.tsx";
import {SnackbarProvider} from "./contexts/snackbarProvider.tsx";
import { Auth0Provider } from '@auth0/auth0-react';
import {AUTH0_USERNAME, AUTH0_PASSWORD} from '../src/utils/constants.ts'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <PaginationProvider>
        <SnackbarProvider>
          <Auth0Provider
            domain={AUTH0_USERNAME}
            clientId={AUTH0_PASSWORD}
            authorizationParams={{
              redirect_uri: window.location.origin
            }}
          >
            <App/>
          </Auth0Provider>
        </SnackbarProvider>
      </PaginationProvider>
    </React.StrictMode>,
)
