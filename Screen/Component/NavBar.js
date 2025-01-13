import React, { useRef, useEffect } from "react";
import { BlurView } from "@react-native-community/blur";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native';

import { HomeIcon, UserIcon, SearchIcon, ScreenH, ScreenW } from './exportAsset';

const NavBar = ({ navigation, state }) => {

    // const indicatorPosition = useRef(new Animated.Value(0)).current;

    // const iconWidth = ScreenW * 0.86 / 4;
    // const offset = (iconWidth - 35) / 2;

    // const animateIndicator = (index) => {
    //     if (index >= 0 && index <= 3) {
    //         Animated.timing(indicatorPosition, {
    //             toValue: index * iconWidth,
    //             duration: 300,
    //             useNativeDriver: false
    //         }).start();
    //     }
    // };

    // // Trigger the animation when the tab index changes
    // useEffect(() => {
    //     animateIndicator(state.index);
    // }, [state.index]);

    return (
        <View style={{
            width: ScreenW * 0.55,
            backgroundColor: 'rgba(52,52,52,0.3)',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 30,
            elevation: 5,
            position: 'absolute',
            bottom: 40,
        }}>
            {/* <Animated.View style={{
                position: 'absolute',
                top: 0,
                justifyContent:'space-evenly',
                alignItems: 'center',
                width: 35,
                height: 5,
                backgroundColor: '#42C83C',
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                zIndex: 0,
                left: indicatorPosition,
                marginLeft: offset // add this line
            }} /> */}

            {/* Home Icon */}
            <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate('Home')}
            >
                <HomeIcon width={45} height={27} color={state.index === 0 ? "#42C83C" : "gray"} fill={state.index === 0 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity>

            {/* Search Icon */}
            <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate('Vendor')}
            >
                <SearchIcon width={45} height={27} color={state.index === 1 ? "#42C83C" : "gray"} fill={state.index === 1 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity>

            {/* Library Icon */}
            {/* <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate('Profile')}
            >
                <SearchIcon width={45} height={27} color={state.index === 2 ? "#42C83C" : "gray"} fill={state.index === 2 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity> */}

            {/* User Icon */}
            <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate('Profile')}
            >
                <UserIcon width={45} height={27} color={state.index === 3 ? "#42C83C" : "gray"} fill={state.index === 3 ? "#42C83C" : 'transparent'} />
            </TouchableOpacity>
        </View>
    );
};

export default NavBar;
