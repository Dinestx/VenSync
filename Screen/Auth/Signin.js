import React, { useState, useRef } from "react";
import { View, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { ScreenW, ScreenH, ArrowIcon } from '../Component/exportAsset';
import { useTheme } from '../Component/theme'

import axios from 'axios';


const SignIn = () => {
    const theme = useTheme();

    const navigation = useNavigation(); // Initialize navigation

    // Phone Validate
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showOtpField, setShowOtpField] = useState(false); // State to show/hide OTP field
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPhoneEdit, setShowPhoneEdit] = useState(false); // State to show/hide OTP field

    const validate = () => {
        const phoneRegex = /^\d{3}\d{4}\d{3}$/; // Regex for XXX-XXXX-XXX
        if (phoneRegex.test(phoneNumber)) {
            setErrorMessage('');
            setShowOtpField(true); // Show OTP field when phone number is valid
            setShowPhoneEdit(true); //Show Phone Number edit after otp generation
        } else {
            setErrorMessage('Invalid phone number');
        }
    };

    // OTP
    const otpLength = 6; // Length of the OTP
    const [otp, setOtp] = useState(Array(otpLength).fill('')); // Initialize OTP array
    const inputs = useRef([]); // Create a ref for the input fields

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text; // Update the OTP at the current index
        setOtp(newOtp);

        // Move to the next input field if there is a value and it's not the last field
        if (text && index < otpLength - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace") {
            // If the current field is empty and not the first field, move to the previous field
            if (otp[index] === "" && index > 0) {
                inputs.current[index - 1].focus();
            } else {
                // Clear the current field
                const newOtp = [...otp]
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    const handleOtpSubmit = async () => {
        const userData = { phoneNumber };

        try {
            // Send POST request to login endpoint
            const response = await axios.post('http://0.0.0.0/0/login', userData);

            if (response.data.status === 'login') {
                console.log('Login successful:', response.data.user);
                console.log('Token:', response.data.token);

                // Navigate to Home screen
                navigation.navigate('Home', { user: response.data.user });
            } else if (response.data.status === 'register') {
                console.log('User registered successfully:', response.data.user);

                // Navigate to Registration screen
                navigation.navigate('SignUp', { user: response.data.user });
            }
        } catch (error) {
            console.error('Error in login:', error);
            navigation.navigate('SignUp')
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.bgColor, width: ScreenW, flex: 1 }}>
            <StatusBar
                barStyle={theme.statusBarContent}
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={{ width: ScreenW, flex: 1, paddingHorizontal: 25, paddingTop: ScreenH * 0.055 }}>
                {/* App Bar ============================================= */}
                <View style={{ paddingVertical: ScreenH * 0.035, paddingHorizontal: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: '600', color: theme.primaryText }}>Enter your Mobile Number</Text>
                    {!showOtpField ? (
                        <Text style={{ fontSize: 14, color: theme.primaryText }}> Hey, you're welcome to VenSync Solution </Text>
                    ) : (
                        <View style={{flexDirection:'row' ,alignItems:'center'}}> 
                            <Text style={{ fontSize: 14, color: theme.primaryText, gap:10}}>{phoneNumber}</Text>
                            <Text style={{ fontSize: 14, color: theme.otpInput, fontWeight:'bold' , paddingHorizontal:20, paddingVertical:5 }}>Resend OTP</Text>
                        </View>
                    )}

                </View>

                {/* Input Field ========================================= */}
                <View style={{ flexDirection: 'row', height: ScreenH * 0.057, borderRadius: 15, alignItems: 'center', paddingHorizontal: 10, borderColor: errorMessage ? 'red' : 'gray', backgroundColor: theme.textInput }}>
                    <Text style={{ color: theme.placeholder, fontSize: ScreenW * 0.045, fontWeight: 'bold', alignItems: 'center' }}>+91</Text>
                    <TextInput placeholder="xxx-xxxx-xxx" keyboardType="numeric" style={{ color: theme.placeholder, fontSize: ScreenW * 0.045, flex: 1, marginLeft: 10, fontWeight: 'bold', alignItems: 'center', letterSpacing: 7 }} placeholderTextColor={theme.placeholder} value={phoneNumber} onChangeText={setPhoneNumber} maxLength={10} />
                </View>
                {errorMessage ? <Text style={{ color: 'red', marginTop: 5, marginLeft: 10 }}>{errorMessage}</Text> : null}

                {/* OTP Field ========================================= */}
                {showOtpField && (
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", marginTop: 20 }}>
                        {otp.map((value, index) => (
                            <TextInput
                                key={index}
                                placeholder="0"
                                placeholderTextColor='#3d305e'
                                style={{
                                    backgroundColor: theme.otpBG,
                                    width: 50,
                                    height: 50,
                                    textAlign: "center",
                                    fontSize: 20,
                                    borderRadius: 10,
                                    color: currentIndex === index ? theme.otpInput : theme.primaryText,
                                    fontWeight: 'bold',
                                    borderWidth: 2,
                                    borderColor: currentIndex === index ? theme.otpBorderActive : theme.otpBorder,
                                }}
                                keyboardType="numeric"
                                maxLength={1}
                                value={value}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                ref={(input) => (inputs.current[index] = input)} // Assign ref for each input
                                onFocus={() => setCurrentIndex(index)}
                            />
                        ))}
                    </View>
                )}

                {/* Continue Button ===================================== */}
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 0 }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            width: ScreenW * 0.65,
                            backgroundColor: phoneNumber.length === 10 ? theme.button : 'grey',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 18,
                        }}
                        onPress={showOtpField ? handleOtpSubmit : validate}
                        disabled={!showOtpField && phoneNumber.length !== 10}
                    >
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Continue</Text>
                        <ArrowIcon color='black' style={{ transform: [{ rotate: '225deg' }] }} />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: ScreenH * 0.035 }}>
                    <Text style={{ textAlign: 'center' }}>
                        By giving your information, you agree to our Terms & Conditions and Privacy Policy.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;
