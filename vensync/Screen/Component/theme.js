import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

const darkTheme = {
    // background: "#121212",
    darkGray: "#1F1F1F",
    charcoal: "#262626",
    darkBrown: "#402723",
    redOrange: "#f58220",
    white: "#FFFFFF",

    // App BackGround
    background: "#121212",

    // Text
    fontSize_p:20,
    TextColor_Primary:"#FFFFFF",
    TextColor_Secondary:'#8B8B8B',
    fontFamily:'Product Sans Regular',


    // SideBar Style
    sidebarMenu:'#FFFFFF',
    sidebarColor:'#e4e4e4',


    // AppBar Style
    appBarbg:'#262626',
    schedule_bg:'#121212',
    schedule_Secondarybg:'#f58220',

    //  Icon
    bgIcon:'#f58220',
    MIcon:'#f58220',

    // Component BG
    CBgColor:'#1F1F1F',
};

const lightTheme = {
    gray: "#8B8B8B",
    lightGray: "#E4E4E4",
    // background: "#EDEDED",
    lightPinkish: "#E5C5C0",
    redOrange: "#f58220",
    charcoal: "#262626",

    // App BackGround
    background: "#EDEDED",

    // Text
    TextColor_Primary:"#262626",
    TextColor_Secondary:"#706f6f",
    fontFamily:'Product Sans Regular',


    // SideBar Style
    sidebarMenu:'#262626',
    sidebarColor:'red',

    // AppBar Style
    appBarbg:'#E4E4E4',

    schedule_bg:'#EDEDED',
    schedule_Secondarybg:'#f58220',



    // Message Icon
    bgIcon:'#E5C5C0',
    MIcon:'#f58220',

    // Component BG
    CBgColor:'#E4E4E4'

};


// Create a Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme);

    useEffect(() => {
        const subscription = Appearance.addChangeListener((scheme) => {
            setTheme(scheme.colorScheme === 'dark' ? darkTheme : lightTheme);
        });

        return () => subscription.remove(); 
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);