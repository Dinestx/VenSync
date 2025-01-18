import React, { useState, useRef, useEffect } from "react";
import { View, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { ScreenW, ScreenH, ArrowIcon, EditIcon, CompleteProfile } from "../Component/exportAsset";
import { useTheme } from "../Component/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmailAuth = ({ navigation }) => {
    const theme = useTheme();
    // const navigation = useNavigation(); // Initialize navigation


    // Email Validation State
    const [email, setEmail] = useState("");
    const [isemailFocused, setEmailFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showOtpField, setShowOtpField] = useState(false); // State to show/hide OTP field
    const [otp, setOtp] = useState(Array(6).fill("")); // Initialize OTP array
    const inputs = useRef([]); // Create a ref for the input fields
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editText, setEditText] = useState(true);
    const [seconds, setSeconds] = useState(90); // 1 minute 30 seconds = 90 seconds
    const [resendOtpColor, setResendOtpColor] = useState('#66509d');
    const [isTimerActive, setIsTimerActive] = useState(false); // To manage button state
    const [intervalId, setIntervalId] = useState(null); // Store the interval ID


    // Validate Email
    const validateEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
        if (emailRegex.test(email)) {
            setErrorMessage("");
            setShowOtpField(true);
            setEditText(false);

            try {
                // Make a POST request to the API with the email in the request body
                const response = await axios.post("https://vensync-se39.onrender.com/api/base/generate-otp", {
                    email: email, // Wrap email in an object
                });

                if (response) {
                    // OTP generated successfully
                    console.log('OTP sent successfully:', response.data.message);
                    // setShowOtpField(true); // Show OTP field
                } else {
                    console.error('Error generating OTP:', response.data.message);
                    setErrorMessage(response.data.message || 'Failed to send OTP');
                }
            } catch (error) {
                console.error('Error generating OTP:', error.response?.data || error.message);
                setErrorMessage('Failed to send OTP. Please try again.');
                setEditText(true);
            }
            console.log("Resposde", response);




        } else {
            setErrorMessage("Invalid email address");
        }
    };

    const emailEdit = () => {
        setShowOtpField(false);
        setEditText(true);
        setSeconds(90); // Reset the timer to 90 seconds
    }

    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text; // Update the OTP at the current index
        setOtp(newOtp);

        // Move to the next input field if there is a value and it's not the last field
        if (text && index < otp.length - 1) {
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
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };


    const handleOtpSubmit = async () => {
        // const userData = { email };
        console.log(email);
        console.log(otp.join(''));


        try {
            const response = await axios.post("https://vensync-se39.onrender.com/api/base/verify-otp", {
                email: email, // Include email for verification
                otp: otp.join(''), // Combine OTP array into a single string
            });

            console.log("Response",response.data)


            if (response.status === 200) {
                // const token = response.data.token;
                // await AsyncStorage.setItem("token", token);
                // const profile = response.data.profileComplete
                // await AsyncStorage.setItem("profile",profile);
                // console.log(profile)
                try {
                    const { token, profileComplete, email } = response.data;
                    await AsyncStorage.multiSet([
                        ['token', token],
                        ['profile', JSON.stringify(profileComplete)],
                        ['email', email],
                    ]);
                    console.log("ProfileComplete Status",AsyncStorage.getItem('profile'))
                    if (profileComplete === false) {
                        navigation.navigate('Welcome');
                    } else {
                        setTimeout(()=>{
                            navigation.navigate('VenSync', { user: response.data});
                        }, 1200)
                        console.log(response.data)
                    }                    
                } catch (error) {
                    console.error('Error saving data to AsyncStorage:', error.message);
                }
            } else {
                console.error('OTP verification failed:', response.data.message);
                setErrorMessage(response.data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.response?.data || error.message);
            setErrorMessage('Failed to verify OTP. Please try again.');
        }
    };


    // Timer logic
    useEffect(() => {
        const newInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                clearInterval(newInterval);
                setResendOtpColor('blue');
            }
        }, 1000);

        setIntervalId(newInterval); // Store the interval ID

        return () => {
            clearInterval(newInterval);
        };
    }, [seconds]);

    // Clear the interval when needed (e.g., component unmount or other conditions)
    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);




    const resendOtp = () => {
        if (!isTimerActive) {
            setSeconds(90); // Reset the timer to 30 seconds
            setResendOtpColor("grey"); // Disable button
            setIsTimerActive(true); // Start the timer
            validateEmail(); // Call resend OTP logic
        }
    };




    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };



    return (
        <SafeAreaView style={{ backgroundColor: theme.bgColor, width: ScreenW, flex: 1 }}>
            <StatusBar
                barStyle={theme.statusBarContent}
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={{ width: ScreenW, flex: 1, paddingHorizontal: 25, paddingTop: ScreenH * 0.055 }}>
                {/* App Bar */}
                <View style={{ paddingVertical: ScreenH * 0.035, paddingHorizontal: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: "600", color: theme.primaryText }}>Enter Your Email</Text>
                    {!showOtpField ? (
                        <Text style={{ fontSize: 14, color: theme.primaryText }}>Welcome to VenSync Solution</Text>
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: theme.primaryText }}>{email}</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 16, color: '#66509d', fontWeight: '500' }} onPress={emailEdit}>Edit</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Input Field */}
                <View style={{ height: ScreenH * 0.057, borderRadius: 15, paddingHorizontal: 10, borderColor: errorMessage ? "red" : "gray", backgroundColor: theme.textInput }}>
                    <TextInput
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        style={{ color: theme.placeholder, fontSize: ScreenW * 0.045, flex: 1, marginLeft: 10, fontWeight: "bold" }}
                        placeholderTextColor={theme.placeholder}
                        value={email}
                        editable={editText}
                        onChangeText={(email) => {
                            setEmail(email);
                            console.log("Email input:", email);
                        }}
                    />
                </View>
                {errorMessage ? <Text style={{ color: "red", marginTop: 5, marginLeft: 10 }}>{errorMessage}</Text> : null}

                {/* OTP Field */}
                {showOtpField && (
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", marginTop: 20 }}>
                            {otp.map((value, index) => (
                                <TextInput
                                    key={index}
                                    placeholder="0"
                                    placeholderTextColor="#3d305e"
                                    style={{
                                        backgroundColor: theme.otpBG,
                                        width: 50,
                                        height: 50,
                                        textAlign: "center",
                                        fontSize: 20,
                                        borderRadius: 10,
                                        color: currentIndex === index ? theme.otpInput : theme.primaryText,
                                        fontWeight: "bold",
                                        borderWidth: 2,
                                        borderColor: currentIndex === index ? theme.otpBorderActive : theme.otpBorder,
                                    }}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={value}
                                    onChangeText={(text) => handleOtpChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    ref={(input) => (inputs.current[index] = input)} // Assign ref for each input
                                    onFocus={() => setCurrentIndex(index)}
                                />
                            ))}
                        </View>

                        {/* Resend Otp */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 40, justifyContent: 'center', gap: 10 }}>
                            <Text style={{ fontSize: 16, color: resendOtpColor, fontWeight: '500' }} onPress={resendOtp}>Resend OTP</Text>
                            <Text style={{ fontSize: 16, color: '#66509d', fontWeight: '500' }}>{formatTime(seconds)}</Text>
                        </View>
                    </View>
                )}

                {/* Continue Button */}
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 0 }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            width: ScreenW * 0.65,
                            backgroundColor: email.includes("@") ? theme.button : "grey",
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 18,
                        }}
                        onPress={showOtpField ? handleOtpSubmit : validateEmail}

                        disabled={!email.includes("@")}
                    >
                        <Text style={{ textAlign: "center", color: "white", fontWeight: "600" }}>Continue</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: ScreenH * 0.035 }}>
                    <Text style={{ textAlign: "center" }}>
                        By giving your information, you agree to our Terms & Conditions and Privacy Policy.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EmailAuth;
