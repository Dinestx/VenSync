import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScreenH, ScreenW, BackIcon } from '../Component/exportAsset';
import { useTheme } from '../Component/theme';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompleteProfile() {
    const theme = useTheme();
    const navigation = useNavigation();
    const [isNameFocused, setNameFocused] = useState(false);
    const [isDisFocused, setDisFocused] = useState(false);
    const [isAddFocused, setAddFocused] = useState(false);

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rawPhoneNumber, setRawPhoneNumber] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [isSelPrivacy, setSelPrivacy] = useState(false);
    const [isSelTerms, setSelTerms] = useState(false);

    const formatPhoneNumber = (text) => {
        const cleaned = text.replace(/\D+/g, '');
        const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{0,3})/, (_, p1, p2, p3) => {
            return `${p1}-${p2}-${p3}`.replace(/-$/, '');
        });

        setPhoneNumber(formatted);
        setRawPhoneNumber(cleaned);
    };

    const updateProfile = async () => {
        console.log("Update Profile button pressed");

        if (!fullName.trim() || !rawPhoneNumber.trim()) {
            Alert.alert('Required', 'Full name and phone number cannot be empty');
            return;
        }

        const token = await AsyncStorage.getItem("token");

        if (!token) {
            Alert.alert('Authorization Error', 'No token provided. Please log in again.');
            navigation.navigate('EmailAuth');
            return;
        }

        try {
            const user = {
                name: fullName,
                phone: rawPhoneNumber,
                address: homeAddress,
            };

            console.log("User data:", user);

            const response = await axios.post(
                'https://vensync-se39.onrender.com/api/user/complete-profile',
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Response Data:', response.data);
            navigation.navigate('VenSync')
            Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    return (
        <View style={{ backgroundColor: theme.bgColor, flex: 1, paddingHorizontal: 25 }}>
            {/* App Bar */}
            <View style={{ paddingTop: ScreenH * 0.055 }}>
                <BackIcon
                    style={{
                        paddingVertical: 18,
                        color: theme.primaryText,
                        backgroundColor: theme.SkipColor,
                        borderRadius: 18,
                    }}
                    onPress={() => navigation.goBack()}
                />
            </View>

            {/* Text */}
            <View style={{ paddingVertical: ScreenH * 0.025, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: ScreenW * 0.065, fontWeight: '600', color: theme.primaryText }}>
                    Complete your profile
                </Text>
                <Text style={{ fontSize: ScreenW * 0.035, color: theme.primaryText }}>
                    View promotions that are displayed in membership marketplace.
                </Text>
            </View>

            {/* Form */}
            <View style={{ gap: 15 }}>
                {/* Name Input */}
                <View
                    style={{
                        height: ScreenH * 0.057,
                        borderRadius: 12,
                        backgroundColor: theme.textInput,
                        borderWidth: 2,
                        borderColor: isNameFocused ? theme.nameActive : '#3d305e',
                    }}
                >
                    <TextInput
                        style={{
                            color: theme.placeholder,
                            fontSize: ScreenW * 0.04,
                            flex: 1,
                            marginLeft: 10,
                            fontWeight: 'bold',
                            letterSpacing: 1,
                        }}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Full Name"
                        placeholderTextColor={isNameFocused ? '#3d305e' : theme.nameActive}
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                    />
                </View>

                {/* Phone Number Input */}
                <View
                    style={{
                        flexDirection: 'row',
                        height: ScreenH * 0.057,
                        borderRadius: 15,
                        backgroundColor: theme.textInput,
                        borderWidth: 2,
                        borderColor: isDisFocused ? theme.nameActive : '#3d305e',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}
                >
                    <Text
                        style={{
                            color: !isDisFocused ? theme.nameActive : 'white',
                            fontSize: ScreenW * 0.045,
                            fontWeight: 'bold',
                        }}
                    >
                        +91
                    </Text>
                    <TextInput
                        style={{
                            color: theme.placeholder,
                            fontSize: ScreenW * 0.045,
                            flex: 1,
                            fontWeight: 'bold',
                            letterSpacing: 7,
                        }}
                        placeholder="xxx-xxx-xxxx"
                        placeholderTextColor={isDisFocused ? '#3d305e' : theme.nameActive}
                        value={phoneNumber}
                        onChangeText={formatPhoneNumber}
                        maxLength={12}
                        onFocus={() => setDisFocused(true)}
                        onBlur={() => setDisFocused(false)}
                        keyboardType="numeric"
                    />
                </View>

                {/* Home Address */}
                <View
                    style={{
                        height: ScreenH * 0.15,
                        borderRadius: 12,
                        backgroundColor: theme.textInput,
                        borderWidth: 2,
                        borderColor: isAddFocused ? theme.nameActive : '#3d305e',
                    }}
                >
                    <TextInput
                        style={{
                            color: theme.placeholder,
                            fontSize: ScreenW * 0.04,
                            flex: 1,
                            marginLeft: 10,
                            fontWeight: 'bold',
                            letterSpacing: 1,
                        }}
                        value={homeAddress}
                        onChangeText={setHomeAddress}
                        placeholder="Home Address"
                        placeholderTextColor={isAddFocused ? '#3d305e' : theme.nameActive}
                        onFocus={() => setAddFocused(true)}
                        onBlur={() => setAddFocused(false)}
                    />
                </View>

                {/* Privacy and Terms */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                    <CheckBox isChecked={isSelPrivacy} onClick={() => setSelPrivacy(!isSelPrivacy)} uncheckedCheckBoxColor='red' checkedCheckBoxColor='green' />
                    <Text style={{ fontSize: 16, color: theme.primaryText }}>
                        I read and agree to <Text style={{ fontWeight: 'bold', color: theme.nameActive }}>Privacy Policy</Text>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                    <CheckBox isChecked={isSelTerms} onClick={() => setSelTerms(!isSelTerms)} uncheckedCheckBoxColor='red' checkedCheckBoxColor='green' />
                    <Text style={{ fontSize: 16, color: theme.primaryText }}>
                        I read and agree to <Text style={{ fontWeight: 'bold', color: theme.nameActive }}>Terms and Conditions</Text>
                    </Text>
                </View>
            </View>

            {/* Submit Button */}
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: ScreenH * 0.055,
                    marginTop: ScreenH * 0.072,
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        width: ScreenW * 0.65,
                        backgroundColor: theme.button,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 18,
                    }}
                    onPress={updateProfile}
                >
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>
                        Complete Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
