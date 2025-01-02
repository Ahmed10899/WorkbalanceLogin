import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

export function NavigationBar(
    {pages, activeTab, setActiveTab},
) {


    return (
        <Paper elevation={3} sx={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
            <BottomNavigation
                showLabels
                value={activeTab}
                color="inherit"
                onChange={(event, newValue) => setActiveTab(() => newValue)}
            >
                {pages.filter(page => page?.quickNavBar).map((page, index) => (
                    <BottomNavigationAction key={index} label={page.title} icon={page.icon}/>
                ))}
            </BottomNavigation>
        </Paper>
    )
}
