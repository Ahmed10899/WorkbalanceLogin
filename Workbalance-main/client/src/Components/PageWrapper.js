import {UserContext} from "./UserContext";
import React from 'react';
import {HeaderAppBar} from "./HeaderAppBar";
import {NavigationBar} from "./NavigationBar";
import {Courses} from "./Courses/Courses";
import {Shop} from "./Shop/Shop";
import {Dashboard} from "./Dashboard/Dashboard";
import {GolfCourseOutlined, HomeOutlined, SettingsOutlined, ShopOutlined} from "@mui/icons-material";
import NavDrawer from "./NavDrawer";
import {Settings} from "./Settings/Settings";

export function PageWrapper() {
    const settings = React.useContext(UserContext)
    const [activeTab, setActiveTab] = React.useState(0)
    const [openDrawer, setOpenDrawer] = React.useState(false)
    const [pages] = React.useState([
        {
            title: "Dashboard",
            icon: <HomeOutlined/>,
            component: <Dashboard/>,
            quickNavBar: true
        },
        {
            title: "Courses",
            icon: <GolfCourseOutlined/>,
            component: <Courses/>,
            quickNavBar: true
        },
        {
            title: "Shop",
            icon: <ShopOutlined/>,
            component: <Shop/>,
            quickNavBar: true
        },
        {
            title: "Settings",
            icon: <SettingsOutlined/>,
            component: <Settings/>,
            quickNavBar: false
        }
    ])

    console.log(openDrawer)

    return (
        <div className="App">
            <HeaderAppBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
            <NavDrawer pages={pages} activeTab={activeTab} setActiveTab={setActiveTab}
                       openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
            {pages[activeTab].component}
            <NavigationBar pages={pages} activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
    )
}
