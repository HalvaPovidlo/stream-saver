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
        // @ts-expect-error TS(2322): Type '{ mode: "dark"; white: string; }' is not ass... Remove this comment to see the full error message
        white: "white"
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "rgb(8,0,36)",
                    backgroundImage: `linear-gradient(90deg, rgba(8,0,36,1) 13%, rgba(70,70,133,1) 70%)`,
                    //backgroundImage: "linear-gradient(142deg, #302C49 14.75%, #302C49 14.76%, #292929 87.01%)"
                },
            },
        },
    },

});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <Context.Provider value={{
                user: new UserStore(),
                records: new RecordStore()
            }}>
                <CssBaseline/>
                <App/>
            </Context.Provider>
        </ThemeProvider>
    </React.StrictMode>,
)
