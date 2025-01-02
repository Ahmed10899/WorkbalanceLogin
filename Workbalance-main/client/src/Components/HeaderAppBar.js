import {alpha, AppBar, Box, IconButton, styled, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {UserContext} from "./UserContext";
import React from "react";
import {CurrencyExchangeOutlined, Logout} from "@mui/icons-material";

const PointDisplay = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '30%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const PointIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledDisplay = styled('div')(({theme}) => ({
    color: 'inherit',
    width: 'auto',
    padding: theme.spacing(1, 2, 1, 1),
}))

export function HeaderAppBar(
    {openDrawer, setOpenDrawer},
) {
    const settings = React.useContext(UserContext);

    function handleLogOut() {
        settings.setUserLoggedIn(false);
    }

    function handleDrawerOpen() {
        setOpenDrawer(true);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="sticky" sx={{paddingTop: 0.5, paddingBottom: 0.5}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="Menu"
                        onClick={handleDrawerOpen}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 6}}>
                        WorkBalance
                    </Typography>
                    <PointDisplay sx={{flexGrow: 1, paddingTop: 0, paddingBottom: 0}}>
                        <PointIconWrapper>
                            <CurrencyExchangeOutlined/>
                        </PointIconWrapper>
                        <StyledDisplay>
                            <Box sx={{flexGrow: 1, margin: 0}} justifyContent="center">
                                <Typography align="right"
                                >
                                    {settings.points}
                                </Typography>
                            </Box>
                        </StyledDisplay>
                    </PointDisplay>
                    <IconButton
                        size="large"
                        aria-label="Log-Out"
                        onClick={handleLogOut}
                        color="inherit"
                    >
                        <Logout/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
