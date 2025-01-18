import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '../Component/theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { BackIcon, ScreenH, ScreenW, AccountIcon, SettingIcon, HelpIcon, ContactIcon, DevIcon } from "../Component/exportAsset";
import { all } from "axios";

const Profile = ({ navigation }) => {
    const theme = useTheme();
    // const navigation = useNavigation();

    const deleteToken = async () => {
        // await AsyncStorage.removeItem("token");
        await AsyncStorage.clear()
        setTimeout(() => {
            navigation.navigate('EmailAuth');
        }, 1200);
    }


    function calculateRegistrationDuration(startDate, endDate) {
        const difference = new Date(endDate) - new Date(startDate); // Difference in milliseconds
        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (hours < 1) {
            return `${minutes} minutes`;
        } else if (days < 1) {
            return `${hours} hours`;
        } else if (days < 30) {
            return `${days} days`;
        } else {
            const start = new Date(startDate);
            const end = new Date(endDate);

            let yearsDifference = end.getFullYear() - start.getFullYear();
            let monthsDifference = end.getMonth() - start.getMonth();

            if (monthsDifference < 0) {
                yearsDifference--;
                monthsDifference += 12;
            }

            const totalMonths = yearsDifference * 12 + monthsDifference;

            if (yearsDifference === 0) {
                return `${totalMonths} months`;
            } else if (yearsDifference === 1 && monthsDifference === 0) {
                return '1 year';
            } else if (yearsDifference > 1 && monthsDifference === 0) {
                return `${yearsDifference} years`;
            } else if (yearsDifference === 1 && monthsDifference > 0) {
                return `1 year ${monthsDifference} months`;
            } else if (yearsDifference > 1 && monthsDifference > 0) {
                return `${yearsDifference} years ${monthsDifference} months`;
            } else {
                return 'Unknown duration';
            }
        }
    }

    // Example usage
    console.log(calculateRegistrationDuration("2024-01-01", "2025-06-01")); // Output: 1 year 5 months


    const Dev = () => {
        navigation.navigate('Developer')
    }

    return (
        <View style={{ flexDirection: 'column', width: ScreenW, height: ScreenH, zIndex: 1, position: 'relative', backgroundColor: theme.onBoard, flex: 1, paddingVertical: ScreenH * 0.04, paddingHorizontal: ScreenW * 0.055 }}>
            <StatusBar barStyle={theme.statusBarContent} backgroundColor="transparent" translucent={true} />

            <View style={{ width: ScreenW * 0.87, flexDirection: 'column' }}>
                {/* AppBar============================================================= */}
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: ScreenW * 0.038, color: theme.primaryText, paddingHorizontal: 5 }}>Profile</Text>
                    <View style={{ paddingHorizontal: 10, backgroundColor: theme.SkipColor, paddingVertical: 8, borderRadius: 20 }}>
                        <Text style={{ fontSize: ScreenW * 0.03, color: theme.primaryText, }} onPress={deleteToken}>Log Out</Text>
                    </View>
                </View>

                {/* Profile, Name, Email */}
                <View style={{ flexDirection: 'row', paddingVertical: ScreenH * 0.045, alignItems: 'center', gap: 20 }}>
                    <View style={{ width: 65, height: 65, borderRadius: 65 / 2, overflow: 'hidden' }}>
                        <Image source={require('../../Assets/user/Boy.jpg')} style={{ flex: 1, width: undefined, height: undefined }}></Image>
                    </View>

                    {/* Name Email */}
                    <View style={{ flexDirection: 'column', gap: 1 }}>
                        <Text style={{ fontSize: ScreenW * 0.044, color: theme.primaryText, fontWeight: '600' }}>Vishnu Prakash</Text>
                        <Text style={{ fontSize: ScreenW * 0.034, color: theme.primaryText, fontStyle: 'italic' }}>Vishnuprakash572@gmail.com</Text>

                    </View>

                </View>
            </View>


            {/* Body ================================================================ */}
            <View style={{ backgroundColor: theme.bgColor, width: ScreenW, height: ScreenH * 0.76, bottom: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, zIndex: 2, position: 'absolute', paddingHorizontal: 20, paddingVertical: ScreenH * 0.065, gap: ScreenH * 0.035, flex: 1 }}>

                {/* Setting ===================================================== */}
                <View style={{ flexDirection: 'column', backgroundColor: 'rgba(90, 97, 228, 0.18)', borderRadius: 40 }}>

                    <View style={{ paddingVertical: ScreenH * 0.025, paddingHorizontal: 25, gap: 25 }}>
                        {/* Edit Profile */}
                        <TouchableWithoutFeedback onPress={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Icon */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <View style={{ backgroundColor: '#E9E9FF', width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                                        <AccountIcon width={25} height={35} color="#66509d" />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        {/* Title */}
                                        <Text style={{ fontSize: ScreenW * 0.036, color: theme.primaryText, }}>My Account</Text>
                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                            <Text style={{ fontSize: ScreenW * 0.025, color: theme.primaryText, fontStyle: 'italic' }}>Email,</Text>
                                            <Text style={{ fontSize: ScreenW * 0.025, color: theme.primaryText, fontStyle: 'italic' }}>Address,</Text>
                                            <Text style={{ fontSize: ScreenW * 0.025, color: theme.primaryText, fontStyle: 'italic' }}>Phone,</Text>
                                            <Text style={{ fontSize: ScreenW * 0.025, color: theme.primaryText, fontStyle: 'italic' }}>Vendor</Text>
                                        </View>
                                    </View>
                                </View>

                                <BackIcon width={25} height={30} color="#66509d" style={{ transform: [{ rotate: '180deg' }], alignItems: 'flex-end', flex: 1 }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Icon */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <View style={{ backgroundColor: '#E9E9FF', width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                                        <SettingIcon width={25} height={35} color="#66509d" />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        {/* Title */}
                                        <Text style={{ fontSize: ScreenW * 0.036, color: theme.primaryText, }}>Setting</Text>

                                    </View>
                                </View>

                                <BackIcon width={25} height={30} color="#66509d" style={{ transform: [{ rotate: '180deg' }], alignItems: 'flex-end', flex: 1 }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Icon */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <View style={{ backgroundColor: '#E9E9FF', width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                                        <HelpIcon width={25} height={35} color="#66509d" />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        {/* Title */}
                                        <Text style={{ fontSize: ScreenW * 0.036, color: theme.primaryText, }}>Help Center</Text>

                                    </View>
                                </View>

                                <BackIcon width={25} height={30} color="#66509d" style={{ transform: [{ rotate: '180deg' }], alignItems: 'flex-end', flex: 1 }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Icon */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <View style={{ backgroundColor: '#E9E9FF', width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                                        <ContactIcon width={22} height={35} color="#66509d" />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        {/* Title */}
                                        <Text style={{ fontSize: ScreenW * 0.036, color: theme.primaryText, }}>Contact</Text>
                                    </View>
                                </View>

                                <BackIcon width={25} height={30} color="#66509d" style={{ transform: [{ rotate: '180deg' }], alignItems: 'flex-end', flex: 1 }} />
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={Dev}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Icon */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <View style={{ backgroundColor: '#E9E9FF', width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                                        <DevIcon width={25} height={35} color="#66509d" />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        {/* Title */}
                                        <Text style={{ fontSize: ScreenW * 0.036, color: theme.primaryText, }}>Developer</Text>
                                    </View>
                                </View>

                                <BackIcon width={25} height={30} color="#66509d" style={{ transform: [{ rotate: '180deg' }], alignItems: 'flex-end', flex: 1 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                {/* Time */}
                <View style={{}}>
                    <Text style={{ fontSize: ScreenW * 0.032, color: theme.primaryText, alignSelf: 'center', textAlign: 'center' }}>You joined Brees on September 2021. It’s been 1 month since then and our mission is still the same, help you better manage your finance like a brees.</Text>
                </View>
            </View>
        </View>
    )
}


export default Profile;