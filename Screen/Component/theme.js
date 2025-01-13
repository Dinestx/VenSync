import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

const darkTheme = {

    bgColor: '#000009',   // Dark Blue Black
    pColor: '#13085E',
    sColor: '#13095E',
    tColor: '#2C14DD',


    statusBar: '#000009',
    statusBarContent: 'light-content',


    // Text Color
    primaryText: '#F5F7FF',
    secondaryText: '#000009',

    //Button
    button: '#2C14DD',

    // Onboarding
    onBoard: '#240F51',

    SkipColor: 'rgba(255, 255, 255, 0.15)', // 15% opacity


    // TextInput
    textInput: 'rgba(255, 255, 255, 0.15)',
    placeholder: '#F5F7FF',


    // OTP
    otpInput: '#66509d',
    otpBG: '#1f1f1f',
    otpBorderActive:'#66509d',
    otpBorder:'#353535',

    // User Name
    nameActive:'#66509d',
    name:'rgba(255, 255, 255, 0.15)',



    // MemberShip Card
    memberCard:'#2C14DD',


    // Complain Card 
    ComplainBoder: 'grey',
    CardColor:'#222222'

};

const lightTheme = {

    bgColor: '#F5F7FF',


    statusBar: '#F5F7FF',
    statusBarContent: 'dark-content', // For dark icons

    // Onboarding
    onBoard: '#4C36ED',

    // Text Color
    primaryText: '#292B2D',
    secondaryText: '#2C14DD',

    //Button
    button: '#2C14DD',

    SkipColor: 'rgba(255, 255, 255, 0.15)', // 15% opacity


    // TextInput
    textInput: 'white',
    placeholder: '#13085E',


    // OTP
    otpInput: '#66509d',
    otpBG: '#efedf5',
    otpBorderActive:'#66509d',
    otpBorder:'grey',


    // User Name
    nameActive:'#66509d',
    name:'#13085E',


    // MemberShip Card
    memberCard:'#2C14DD',


    // Complain Card 
    ComplainBoder: '#DCE2EF',
    CardColor:'#F5F7FF'


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