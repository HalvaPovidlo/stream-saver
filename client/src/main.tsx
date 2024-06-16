import React from 'react'
import ReactDOM from 'react-dom/client'


import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Context from "./Context"
import 'normalize.css'


import App from "./App"
import UserStore from "./store/UserStore";
import RecordStore from "./store/RecordStore";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "rgb(8,0,36)",
                    backgroundImage: `linear-gradient(90deg, rgba(8,0,36,1) 13%, rgba(70,70,133,1) 70%)`,
                },
            },
        },
    },

});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <Context.Provider value={{
                userStore: new UserStore,
                recordStore: new RecordStore
            }}>
                <CssBaseline/>
                <App/>
            </Context.Provider>
        </ThemeProvider>
    </React.StrictMode>,
)
