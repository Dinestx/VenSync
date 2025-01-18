import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ScreenH, ScreenW, BackIcon } from '../Component/exportAsset';
import { useTheme } from '../Component/theme';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ApplyVendor() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isNameFocused, setNameFocused] = useState(false);
  const [isDisFocused, setDisFocused] = useState(false);
  const [isAddFocused, setAddFocused] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rawPhoneNumber, setRawPhoneNumber] = useState('');
  const [isAadhar, setAadhar] = useState('');
  const [isSelected, setSelected] = useState({
    Name: false,
    Phone: false,
    Aadhar: false
  })
  const [isSelPrivacy, setSelPrivacy] = useState(false);
  const [isSelTerms, setSelTerms] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const inputs = useRef([]);

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D+/g, '');
    const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{0,3})/, (_, p1, p2, p3) => {
      return `${p1}-${p2}-${p3}`.replace(/-$/, '');
    });

    setPhoneNumber(formatted);
    setRawPhoneNumber(cleaned);
  };

  const handleOtpChange = (text, index) => {
    if (!/^\d?$/.test(text)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input if available
    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const updateProfile = async () => {
    if (!fullName.trim() || !rawPhoneNumber.trim()) {
      Alert.alert('Required', 'Full name and phone number cannot be empty');
      return;
    }

    if (!isSelPrivacy || !isSelTerms) {
      Alert.alert('Agreement Required', 'Please agree to the Privacy Policy and Terms and Conditions.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Authorization Error', 'No token found. Please log in again.');
        navigation.navigate('EmailAuth');
        return;
      }

      const user = {
        name: fullName,
        phone: rawPhoneNumber,
        address: homeAddress,
      };

      const response = await axios.post(
        'https://vensync-se39.onrender.com/api/vendor/applyvendor',
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Success', 'Your profile has been updated successfully!');
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.bgColor, paddingHorizontal: 25 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
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
            View promotions that are displayed in the membership marketplace.
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
            alignItems: 'center',
            marginTop: ScreenH * 0.05,
          }}
        >
          <TouchableOpacity
            style={{
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
