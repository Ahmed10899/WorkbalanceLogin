import React from 'react';

export const UserContext = React.createContext({
    language: "de",
    setLanguage: (value) => {
    },
    name: "",
    email: "",
    activeTheme: 0,
    setActiveTheme: (value) => {
    },
    setUserLoggedIn: (value) => {
    },
    role: "user",
    points: 0,
});
