// Imports
import './App.css';
import React from 'react';
import {PageWrapper} from "./Components/PageWrapper";
import {UserContext} from "./Components/UserContext";
import {Login} from "./Components/Login/Login";
import {ThemeProvider} from "@mui/material";
import {themes} from "./Components/Themes";


// Platzhalter-Funktion
function App() {
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    const [language, setLanguage] = React.useState("de");
    const [name] = React.useState("Nutzer");
    const [email] = React.useState("");
    const [activeTheme, setActiveTheme] = React.useState(0);
    const [role] = React.useState("user");
    const [points] = React.useState(1000);
    const currentUser = {
        language: language,
        setLanguage: setLanguage,
        name: name,
        email: email,
        activeTheme: activeTheme,
        setActiveTheme: setActiveTheme,
        setUserLoggedIn: setUserLoggedIn,
        role: role,
        points: points,
    };

    return (
        <ThemeProvider theme={themes[activeTheme]}>
            <div className="App">
                <UserContext.Provider value={currentUser}>
                    {!userLoggedIn ? <Login/> : <PageWrapper/>}
                </UserContext.Provider>
            </div>
        </ThemeProvider>
    );
}

export default App;
