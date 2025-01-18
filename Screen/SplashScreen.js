import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkNavigationFlow = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        const token = await AsyncStorage.getItem('token');

        if (isFirstTime === null) {
          // First-time user
          await AsyncStorage.setItem('isFirstTime', 'false');
          setTimeout(() => {
            navigation.navigate('Onboarding'); // navigation.navigate('Onboarding');
          }, 1200)
        } else if (token) {

          try {
            const profile = await AsyncStorage.getItem('profile')
            if (profile == false) {
              setTimeout(()=>{
                navigation.navigate('EmailAuth');
              }, 1000)
              
            } else {
              setTimeout(()=>{
                navigation.navigate('VenSync');
              }, 1000)
            }
          } catch (error) {
            console.log(error)
          }

        } else {
          setTimeout(() => {
            navigation.replace('Onboarding');  // Returning user without token   EmailAuth
          }, 800);

          // navigation.replace('EmailAuth');
        }
      } catch (error) {
        console.error("Error in SplashScreen navigation logic:", error);
        navigation.replace('SignUp'); // Fallback route
      }
    };

    checkNavigationFlow();
  }, [navigation]);
   



  return (

    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <Lottie
        source={require('../Assets/Animation-1727781523173.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
