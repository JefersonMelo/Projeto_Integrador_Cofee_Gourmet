import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Theme } from './Helpers/Theme';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react'
import { AppProvider } from './Contexts/AppContext';
import { AuthenticationProvider } from './Contexts/AuthenticationContext';
import { ProductProvider } from './Contexts/ProductContext';
import { UserProvider } from './Contexts/UserContext';
import { CarShopProvider } from './Contexts/CarShopContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={Theme}>
                <ThemeProvider theme={Theme}>
                    <AppProvider>
                        <ProductProvider>
                            <AuthenticationProvider>
                                <UserProvider>
                                    <CarShopProvider>
                                        <App />
                                    </CarShopProvider>
                                </UserProvider>
                            </AuthenticationProvider>
                        </ProductProvider>
                    </AppProvider>
                </ThemeProvider>
            </MuiThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
