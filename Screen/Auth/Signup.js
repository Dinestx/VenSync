import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScreenH, ScreenW, BackIcon, ArrowIcon } from '../Component/exportAsset';
import { useTheme } from '../Component/theme'




export default function Signup({ navigation }) {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={{ backgroundColor: theme.bgColor, flex: 1, flexDirection: 'column', paddingHorizontal: 25, }}>
            {/* App Bar */}
            <View style={{ paddingTop: ScreenH * 0.05, }}>
                <BackIcon style={{ width: 40, height: 40, paddingVertical: 15, color: theme.primaryText }} onPress={() => navigation.goBack()} />
            </View>

            {/* Text */}
            {/* App Bar ============================================= */}
            <View style={{ paddingVertical: ScreenH * 0.035, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 24, fontWeight: '600', color: theme.primaryText }}>Enter your Full Name</Text>
                <Text style={{ fontSize: 14, color: theme.primaryText }}> Hey, you're welcome to VenSync Solution </Text>
            </View>


            {/* Full Name =========================================== */}
            <View style={{
                height: ScreenH * 0.057,
                borderRadius: 15,
                backgroundColor: theme.textInput,
                borderWidth: 2,
                borderColor: isFocused ? theme.nameActive : theme.textInput,
            }}
                onFocus={() => setIsFocused(true)} // Set focus state to true
                onBlur={() => setIsFocused(false)} // Set focus state to false
            >
                <TextInput
                    style={{
                        color: theme.placeholder,
                        fontSize: ScreenW * 0.045,
                        flex: 1,
                        marginLeft: 10,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        letterSpacing: 3,

                    }}
                    placeholder="Full Name"
                    keyboardType="default"
                    placeholderTextColor='#3d305e'

                />

            </View>

            {/* Continue Button ===================================== */}
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: ScreenH * 0.055 }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        width: ScreenW * 0.65,
                        backgroundColor: theme.button,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 18,
                        borderWidth: 2,
                    }}
                    onPress={()=>navigation.navigate('VenSync')}

                >
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', }}>Continue</Text>
                    <ArrowIcon color={theme.placeholder} style={{ transform: [{ rotate: '225deg' }] }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
