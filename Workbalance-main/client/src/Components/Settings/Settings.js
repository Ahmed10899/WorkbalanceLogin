import React from 'react'
import {UserContext} from "../UserContext";
import {Box, MenuItem, Paper, Stack, styled, TextField, Typography} from "@mui/material";


export function Settings() {
    const settings = React.useContext(UserContext);


    const handleThemeChange = (event) => {
        settings.setActiveTheme(event.target.value);
    }

    const OptionPaper = styled(Paper)(({theme}) => ({
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
    }));

    return (
        <OptionPaper elevation={3} square={false}>
            <Box width="90%" justifySelf={"center"} padding={1}>
                <Stack direction="row" spacing={2}>
                    <Typography variant="p" component="div" sx={{flexGrow: 2, textAlign: "center"}} paddingTop={1}>
                        Color-Theme
                    </Typography>
                    <TextField select size="small" value={settings.activeTheme} sx={{flexGrow: 1.5}}
                               onChange={handleThemeChange} variant="outlined">
                        <MenuItem value={0}>Green</MenuItem>
                        <MenuItem value={1}>Orange</MenuItem>
                    </TextField>
                </Stack>
            </Box>
        </OptionPaper>
    )
}
