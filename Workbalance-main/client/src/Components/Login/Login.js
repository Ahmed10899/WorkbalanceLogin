import {Box, Button} from "@mui/material";
import {UserContext} from "../UserContext";
import React from 'react';

export function Login() {
    const settings = React.useContext(UserContext)
    return (
        <div className="Login">
            <Box sx={{flexGrow: 1}}
                 paddingTop={50}
            >
                <Button className="LoginButton" variant="contained" color="primary"
                        onClick={() => settings.setUserLoggedIn(true)}>
                    Login
                </Button>
            </Box>
        </div>
    );
}
