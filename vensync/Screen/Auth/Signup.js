import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ScreenH, ScreenW, BackIcon } from '../Component/exportAsset';

export default function Signup({navigation}) {
    return (
        <View style={{ backgroundColor: 'blue', flex: 1, flexDirection: 'column', width: ScreenW }}>
            {/* App Bar */}
            <View style={{ paddingTop: ScreenH * 0.05, paddingHorizontal: 20,}}>
                <BackIcon style={{width:40, height:40, backgroundColor:'red',}} onPress={() => navigation.goBack()} />
            </View>

            {/* Text */}
            <View style={{ width: ScreenW * 0.87, paddingHorizontal: 30, paddingTop: ScreenH * 0.055 }}>
                <Text style={{ fontSize: 25, fontWeight: '600' }}>Enter Your Full Name</Text>
                <Text style={{ fontSize: 19 }}>Enter your information to start using the Gastos Provider App</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ width: ScreenW * 0.85, height: ScreenH * 0.057, borderWidth: 1, borderRadius: 10, borderColor: 'gray', }}>
                    <TextInput placeholder="Your Full Name" keyboardType="default" style={{ color: 'white', fontSize: ScreenW * 0.045, flex: 1, }} placeholderTextColor="blue" />
                </View>
            </View>
        </View>
    );
}
