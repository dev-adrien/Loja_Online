import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#000', },
        secondary: { main: '#D20103', }
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root:{
                    minWidth: '250px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderRadius: 8,
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root:{
                    justifyContent: "right",
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#000'
                },
            },
        },
    },
});

export default theme;