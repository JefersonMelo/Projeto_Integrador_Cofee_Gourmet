import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Theme } from './Helpers/Theme';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react'
import { AppProvider } from './Contexts/AppContext';
import { UserProvider } from './Contexts/UserContext';
import { ProductProvider } from './Contexts/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={Theme}>
                <ThemeProvider theme={Theme}>
                    <AppProvider>
                        <ProductProvider>
                            <UserProvider>
                                <App />
                            </UserProvider>
                        </ProductProvider>
                    </AppProvider>
                </ThemeProvider>
            </MuiThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
