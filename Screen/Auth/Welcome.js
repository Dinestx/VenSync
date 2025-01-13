import React from "react";
import { useTheme } from '../Component/theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, View, Text, Image, ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BackIcon, ScreenH, ScreenW, BarcodeScan, DashboardIcon, IssueIcon, NotificationIcon, Issue, IndianFlag, Stack } from "../Component/exportAsset";
import Lottie from 'lottie-react-native';

const Welcome = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const IssueHandle = () => {
        navigation.navigate('Issue')
    };

    const myIssue = () => {
        navigation.navigate('MyIssue')
    };
    const Dashboard = () => {
        navigation.navigate()
    };


    return (
        <View style={{ width: ScreenW, height: ScreenH, zIndex: 1, position: 'relative', backgroundColor: theme.onBoard, flex: 1 }}>
            <StatusBar barStyle={theme.statusBarContent} backgroundColor="transparent" translucent={true} />
            <View style={{ width: ScreenW }}>

                <View style={{ position: 'absolute', backgroundColor: theme.SkipColor, zIndex: 2, width: 40, height: 40, borderRadius: 25, right: ScreenH * 0.023, top: ScreenH * 0.034, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <NotificationIcon width={ScreenW * 0.041} height={35} />
                </View>
            </View>



            <View style={{ backgroundColor: theme.bgColor, width: ScreenW, height: ScreenH * 0.84, bottom: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, zIndex: 2, position: 'absolute', paddingHorizontal: 20, paddingVertical: ScreenH * 0.085, gap: ScreenH * 0.035, flex: 1, alignItems: 'center' }}>



                {/* Profile Update=================================================== */}
                <View style={{ backgroundColor: theme.CardColor, borderWidth: 1, borderColor: theme.ComplainBoder, width: ScreenW * 0.87, height: ScreenH * 0.18, borderRadius: 16, overflow: 'hidden', paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-around' }}>
                    <View style={{ gap: 4 }}>
                        <Text style={{ fontSize: ScreenW * 0.048, color: theme.primaryText, fontWeight: 'bold' }}>Complete your profile!</Text>
                        <Text style={{ fontSize: ScreenW * 0.033, color: theme.primaryText }}>Complete your Profile to start using the App.</Text>
                    </View>

                    <TouchableOpacity style={{ backgroundColor: 'rgba(30, 96, 195, 1)', height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => console.log('Button Pressed')}>
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Complete Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Vendor ========================================================= */}
                <View style={{ backgroundColor: theme.CardColor, borderWidth: 1, borderColor: theme.ComplainBoder, width: ScreenW * 0.87, height: ScreenH * 0.20, borderRadius: 16, overflow: 'hidden', paddingHorizontal: 20, paddingVertical: 15, justifyContent: 'space-around' }}>
                    <View style={{ gap: 4 }}>
                        <Text style={{ fontSize: ScreenW * 0.048, color: theme.primaryText, fontWeight: 'bold' }}>Become a vendor</Text>
                        <Text style={{ fontSize: ScreenW * 0.033, color: theme.primaryText }}>Become a  Gastos member to get featured on Gastos Marketplace.</Text>
                    </View>

                    <TouchableOpacity style={{ borderColor: 'rgba(30, 96, 195, 1)', borderWidth: 1, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => console.log('Button Pressed')}>
                        <Text style={{ color: 'rgba(30, 96, 195, 1)', fontSize: 16, fontWeight: 'bold' }}>Complete Profile</Text>
                    </TouchableOpacity>
                </View>


                {/* Offer ========================================================= */}
                <View style={{ backgroundColor: theme.CardColor, borderWidth: 1, borderColor: theme.ComplainBoder, width: ScreenW * 0.87, height: ScreenH * 0.16, borderRadius: 16, overflow: 'hidden', justifyContent: 'space-around' }}>
                    <View style={{ gap: 4, paddingVertical: 18, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: ScreenW * 0.048, color: theme.primaryText, fontWeight: 'bold' }}>Double Dhamaka Offer!</Text>
                        <Text style={{ fontSize: ScreenW * 0.033, color: theme.primaryText, width: ScreenW * 0.67 }}>Accept payment on Google Pay for Business QR to win weekly cashbacks!</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ height: 45, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 }} onPress={() => console.log('Button Pressed')}>
                            <Text style={{ color: 'rgba(30, 96, 195, 1)', fontSize: 16, fontWeight: 'bold' }}>Check Out!</Text>
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', bottom: -5, right: -10 }}>
                            <IndianFlag width={ScreenW * 0.35} height={65} />
                        </View>
                    </View>
                </View>



                {/* Developer Community */}
                <View style={{position:'absolute', bottom:10, justifyContent:'flex-end'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', bottom:0 }}>
                        <Lottie
                            source={Stack}
                            autoPlay
                            loop={true}
                            style={{ width: 30, height: 30, opacity:0.5}} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: 'white', opacity:0.5 }}>DINESTX</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default Welcome;