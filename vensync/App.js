import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, OnboardingScreen, NavBar, Profile, Home, SignIn, SignUp } from './Screen/Component/exportAsset';
import Signin from './Screen/Auth/Signin';
import { StatusBar } from 'react-native';
// import axios from 'axios';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const VenSync = ({ }) => {


  // const [userData, setUserData] = useState('');
  // const [loginType, setLoginType] = useState('');
  // const [playlists, setPlaylists] = useState([]);
  // const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  // const [isLoggedIn, setIsLogged] = useState(false);

  // useEffect(() => {
  //   retrieveLoginStatus();
  //   fetchToken();
  //   getProfile();
  //   getRecentlyPlayedSongs();
  // }, []);

  // const retrieveLoginStatus = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('keepLoggedIn');
  //     setIsLogged(data ? true : false);
  //   } catch (error) {
  //     console.error('Error retrieving login status:', error);
  //   }
  // };

  // const fetchToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     axios
  //       .post('https://auxify-app.onrender.com/userdata', { token: token })
  //       .then((res) => {
  //         setUserData(res.data.data);
  //         setLoginType('MongoDB');
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching user data', error);
  //       });
  //   } catch (error) {
  //     console.error('Error fetching token', error);
  //   }
  // };

  // const getProfile = async () => {
  //   try {
  //     const accessToken = await AsyncStorage.getItem('token');
  //     const response = await fetch('https://api.spotify.com/v1/me', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setUserData(data);
  //     setLoginType('Spotify');
  //   } catch (error) {
  //     console.error('Error fetching profile:', error);
  //   }
  // };

  // const getRecentlyPlayedSongs = async () => {
  //   const accessToken = await AsyncStorage.getItem('token');
  //   try {
  //     const response = await axios({
  //       method: 'GET',
  //       url: 'https://api.spotify.com/v1/me/player/recently-played?limit=10',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const tracks = response.data.items;
  //     setRecentlyPlayed(tracks);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props}  />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Search" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} /> */}
      <Tab.Screen name="Profile" component={Profile}  options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default function App() {

  const [isLoggedIn, setIsLogged] = useState(false);
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }


  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="VenSync" component={VenSync} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}