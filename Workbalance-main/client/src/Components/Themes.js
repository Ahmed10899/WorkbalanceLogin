import {createTheme} from "@mui/material";
import {green} from "@mui/material/colors";

const themes1 = {
    orange: createTheme({
        palette: {
            primary: {
                main: '#FF5733',
                // light: will be calculated from palette.primary.main,
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#47008F',
            },
        },
    }),
    green: createTheme({
        palette: {
            primary: green,
            secondary: green
        }
    })
};

export const themes = [
    createTheme({
        palette: {
            primary: {
                main: '#6aa358',
            },
            secondary: {
                main: '#b09666',
            }
        }
    }),
    createTheme({
        palette: {
            primary: {
                main: '#FF5733',
                // light: will be calculated from palette.primary.main,
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#47008F',
            },
        },
    }),
]
