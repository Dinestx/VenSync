import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';
import Lottie from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';



const Dev = () => {

    // Generic function to open a URL
    const openLinkedIn = (url) => {
        Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
    };


    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View style={{ backgroundColor: '#1C1B1B', height: ScreenH, flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column', paddingVertical: ScreenH * 0.07, paddingHorizontal: 20 }}>

                    {/* Header */}
                    <Text style={{ fontSize: ScreenW * 0.048, color: '#42C83C' }}>
                        About
                    </Text>
                    <Text style={{ fontSize: ScreenW * 0.07, fontWeight: 'bold', color: '#42C83C' }}>
                        Developer
                    </Text>


                    {/* Profile */}
                    <TouchableOpacity style={{ paddingTop: 30 }} onPress={() => openLinkedIn('https://www.linkedin.com/in/vishnupraksh')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../Assets/user/Vishnu.jpg')} style={{ width: 52, height: 52, borderRadius: 25 }} />
                            <View style={{ flexDirection: 'column', paddingHorizontal: 15 }}>
                                <Text style={{ color: 'white', fontSize: 22, fontWeight: '600' }}>Vishnu Prakash</Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>Connect me on LinkedIn</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingTop: 15}} onPress={() => openLinkedIn('https://www.linkedin.com/in/vishnupraksh')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../Assets/user/Vishnu.jpg')} style={{ width: 52, height: 52, borderRadius: 25 }} />
                            <View style={{ flexDirection: 'column', paddingHorizontal: 15 }}>
                                <Text style={{ color: 'white', fontSize: 22, fontWeight: '600' }}>Vishnu Prakash</Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>Connect me on LinkedIn</Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                    {/* Version  */}
                    <View style={{ backgroundColor: '#1C1B1B' }}>
                        <View style={{
                            width: ScreenW,
                            position: 'absolute',
                            top: ScreenH * 0.2,
                            left: ScreenW * 0.36,
                            transform: [{ rotate: '-90deg' }],
                        }}>
                            <Text style={{
                                fontSize: 145,
                                opacity: 0.05,
                                color: '#42C83C',
                                textAlign: 'right',
                                fontFamily: 'MuseoModerno-ExtraBold',
                            }}>v{DeviceInfo.getVersion()}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: ScreenH * 0.69 }}>
                        {/* <Lottie
                            source={Stack}
                            autoPlay
                            loop={true}
                            style={{
                                width: 50,
                                height: 50,
                            }} /> */}
                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'white' }}>NexGen Lab</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


export default Dev;

const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

