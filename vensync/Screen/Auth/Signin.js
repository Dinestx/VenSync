import React, { useState, useRef } from "react";
import { View, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { ScreenW, ScreenH, ArrowIcon } from '../Component/exportAsset';

const SignIn = () => {
    const navigation = useNavigation(); // Initialize navigation

    // Phone Validate
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showOtpField, setShowOtpField] = useState(false); // State to show/hide OTP field

    const validate = () => {
        const phoneRegex = /^\d{3}\d{4}\d{3}$/; // Regex for XXX-XXXX-XXX
        if (phoneRegex.test(phoneNumber)) {
            setErrorMessage('');
            setShowOtpField(true); // Show OTP field when phone number is valid
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

    const handleOtpSubmit = () => {
        const isOtpComplete = otp.every(value => value !== ''); // Check if all OTP fields are filled
        if (isOtpComplete) {
            navigation.navigate('SignUp');
        } else {
            alert('Please enter the complete OTP.');
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', width: ScreenW, flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <View style={{ width: ScreenW, flex: 1, paddingHorizontal: 20, paddingTop: ScreenH * 0.055 }}>
                {/* App Bar ============================================= */}
                <View style={{ paddingVertical: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: '500' }}>Enter your Mobile Number</Text>
                </View>

                {/* Input Field ========================================= */}
                <View style={{ flexDirection: 'row', height: ScreenH * 0.057, borderWidth: 1, borderRadius: 10, alignItems: 'center', paddingHorizontal: 10, borderColor: errorMessage ? 'red' : 'gray' }}>
                    <Text>+91</Text>
                    <TextInput placeholder="XXX-XXXX-XXX" keyboardType="numeric" style={{ color: 'blue', fontSize: ScreenW * 0.045, flex: 1, marginLeft: 10 }} placeholderTextColor='blue' value={phoneNumber} onChangeText={setPhoneNumber} maxLength={10} />
                </View>
                {errorMessage ? <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text> : null}

                {/* OTP Field ========================================= */}
                {showOtpField && (
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", marginTop: 20 }}>
                        {otp.map((value, index) => (
                            <TextInput
                                key={index}
                                style={{
                                    borderWidth: 1,
                                    width: 50,
                                    height: 50,
                                    textAlign: "center",
                                    fontSize: 20,
                                    borderRadius: 10,
                                }}
                                keyboardType="numeric"
                                maxLength={1}
                                value={value}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                ref={(input) => (inputs.current[index] = input)} // Assign ref for each input
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
                            backgroundColor: phoneNumber.length === 10 ?  'red' : 'grey',
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
