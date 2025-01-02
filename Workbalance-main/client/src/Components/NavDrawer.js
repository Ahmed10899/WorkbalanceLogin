import React from 'react'
import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";

export default function NavDrawer(
    {pages, activeTab, setActiveTab, openDrawer, setOpenDrawer}
) {
    const handleDrawerToggle = (newValue) => () => {
        setOpenDrawer(newValue)
    }

    const handleListClick = (index) => () => {
        setActiveTab(index)
    }

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={handleDrawerToggle(false)}>
            <List>
                {pages.map((page, index) => (
                    <ListItem key={index}
                              onClick={handleListClick(index)}
                              selected={activeTab === index}>
                        <ListItemButton>
                            <ListItemIcon>
                                {page.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {page.title}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={openDrawer}
                    onClose={handleDrawerToggle(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}
