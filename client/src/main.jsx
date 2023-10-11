import React from 'react'
import ReactDOM from 'react-dom/client'


import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Context from "./Context.jsx"
import 'normalize.css'


import App from "./App.jsx"
import UserStore from "./store/UserStore.jsx";
import RecordStore from "./store/RecordStore.jsx";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
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
    }
});


ReactDOM.createRoot(document.getElementById('root')).render(
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
