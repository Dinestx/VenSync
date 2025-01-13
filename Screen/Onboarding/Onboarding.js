import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScreenW, ScreenH, VendorService } from '../Component/exportAsset';
import { useTheme } from '../Component/theme'

const slides = [
    {
        id: '1',
        image: require('../../Assets/app/llustration1.png'),
        title: 'Grrow your Business Exponentially',
        description: 'Pay less on each transaction you make with our App.',
    },
    {
        id: '2',
        image: require('../../Assets/app/Illustration2.png'),
        title: 'Grrow your Business Exponentially',
        description: 'Pay less on each transaction you make with our App.',
    },
    {
        id: '3',
        image: require('../../Assets/app/Illustration5.png'),
        title: 'Grrow your Business Exponentially',
        description: 'Pay less on each transaction you make with our App.',
    },
];

const OnboardingScreen = ({ navigation }) => {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleNext = async () => {
        if (currentIndex === slides.length - 1) {
            await AsyncStorage.setItem('isFirstTime', 'false');
            navigation.replace('EmailAuth'); // Replace with your next screen
        } else {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.onBoard, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            {/* Skip Button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 50,
                    right: 20,
                    backgroundColor: theme.SkipColor,
                    paddingHorizontal: 18,
                    paddingVertical: 8,
                    borderRadius: 18,
                    zIndex: 10,

                }}
                onPress={() => {
                    navigation.navigate('SignIn');
                }}

            >
                <Text style={{ color: '#fff', fontSize: 16 }}>Skip</Text>
            </TouchableOpacity>


            {/* Image Slider */}
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) =>
                    setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / ScreenW))
                }
                renderItem={({ item }) => (
                    <View style={{ width: ScreenW, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={item.image} style={{ width: ScreenW * 1.8, height: ScreenH * 0.4, resizeMode: 'contain' }} />
                    </View>
                )}
            />



            {/* Bottom Sheet */}
            <View style={{ backgroundColor: theme.bgColor, height: ScreenH * 0.38, width: ScreenW, alignItems: 'center', borderTopLeftRadius: 45, borderTopRightRadius: 45, flexDirection: 'column', paddingBottom:40, zIndex:2}}>

                {/* Pagination Dots */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: ScreenW, paddingVertical: ScreenH * 0.020, alignItems: 'center' }}>
                    {slides.map((_, index) => (
                        <View key={index} style={{ width: 8, height: currentIndex === index ? '18' : '8', borderRadius: 5, backgroundColor: currentIndex === index ? '#007BFF' : '#ccc', marginHorizontal: 5, alignContent: 'center' }} />
                    ))}
                </View>

                {/* Slide Text and Description  */}
                <View style={{ width: ScreenW * 0.87, width: ScreenW, alignItems: 'center', paddingHorizontal: 20, paddingVertical: ScreenH * 0.020 }}>
                    <Text style={{color:'#13085E' ,fontSize: ScreenW * 0.075, fontWeight: 'bold', textAlign: 'center' }}>
                        {slides[currentIndex].title}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#13085E', textAlign: 'center', marginTop: ScreenH * 0.020 }}>
                        {slides[currentIndex].description}
                    </Text>
                </View>

                {/* Next Button */}
                <View style={{ paddingTop:ScreenH*0.045}}>
                    <TouchableOpacity style={{ backgroundColor: '#007BFF', borderRadius: 20, alignItems: 'center', paddingVertical: ScreenH * 0.017,paddingHorizontal: ScreenW * 0.21 }} onPress={handleNext}>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
                            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                        </Text>
                    </TouchableOpacity>

                    </View>
                
                <View style={{ position: 'absolute', bottom: 20 }}>
                    {currentIndex === 2 && (
                        <Text style={{ fontSize: 14, color: theme.primaryText }}>All information gathered is secure.</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

export default OnboardingScreen;
