import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from './Screen/Component/theme';
import {
  SplashScreen,
  OnboardingScreen,
  NavBar,
  Profile,
  Home,
  SignIn,
  SignUp,
  Vendor,
  Contact,
  Issue,
  SubmitComplain,
  MyIssue,
  Welcome,
  Developer,
  CompleteProfile,
} from './Screen/Component/exportAsset';
import EmailAuth from './Screen/Auth/Email_Auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const VenSync = () => {
  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Vendor" component={Vendor} options={{ headerShown: false }} />
      <Tab.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="EmailAuth" component={EmailAuth} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="NavBar" component={NavBar} />
          <Stack.Screen name="VenSync" component={VenSync} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Issue" component={Issue} />
          <Stack.Screen name="MyIssue" component={MyIssue} />
          <Stack.Screen name="SubmitComplain" component={SubmitComplain} />
          <Stack.Screen name="Vendor" component={Vendor} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
          <Stack.Screen name="Developer" component={Developer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
