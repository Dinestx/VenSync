import React from "react";
import { useTheme } from '../Component/theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, View, Text, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { BackIcon, ScreenH, ScreenW, BarcodeScan, DashboardIcon, IssueIcon, NotificationIcon, Issue} from "../Component/exportAsset";

const Home = () => {
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
        <View style={{ flexDirection: 'column', width: ScreenW, height: ScreenH, zIndex: 1, position: 'relative', backgroundColor: theme.onBoard, flex: 1 }}>
            <StatusBar barStyle={theme.statusBarContent} backgroundColor="transparent" translucent={true} />
            <View style={{ width: ScreenW }}>
                <Image source={require('../../Assets/app/llustration1.png')} style={{ resizeMode: 'contain', objectFit: 'cover', height: ScreenH * 0.30 }} />
                <View style={{ position: 'absolute', backgroundColor: theme.SkipColor, zIndex: 2, width: 40, height: 40, borderRadius: 25, right: ScreenH * 0.023, top: ScreenH * 0.034, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <NotificationIcon width={ScreenW * 0.041} height={35} />
                </View>
            </View>

            <View style={{ backgroundColor: theme.bgColor, width: ScreenW, height: ScreenH * 0.78, bottom: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, zIndex: 2, position: 'absolute', paddingHorizontal: 20, paddingVertical: 20, gap: ScreenH * 0.035, flex: 1 }}>

                {/* Profile */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image
                        source={require('../../Assets/app/restro.jpg')}
                        style={{
                            height: ScreenH * 0.1,
                            width: ScreenW * 0.22,
                            resizeMode: 'cover',
                            // objectFit:'cover',
                            borderRadius: 22,
                        }} />

                    {/* Store Details */}
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: theme.primaryText, fontSize: ScreenW * 0.075, fontWeight: 'bold' }}>Cafe Bistro</Text>
                        <Text style={{ color: theme.primaryText, fontSize: ScreenW * 0.032 }}>M-31, Bhopal, Madhya Pradesh</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 5 }}>
                            <View style={{ width: 35, height: 24, backgroundColor: '#19C653', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                                <Text style={{ color: theme.secondaryText, fontWeight: '600', color: 'white' }}> 4.2</Text>
                            </View>
                            <Text style={{ color: theme.secondaryText, fontWeight: '500', color: 'white' }}>Rating (562)</Text>
                        </View>
                    </View>
                </View>


                {/* Member Ship */}

                <View style={{ flexDirection: 'column', width: ScreenW * 0.89, height: ScreenH * 0.15, backgroundColor: theme.memberCard, borderRadius: 18, overflow: 'hidden' }} >
                    <ImageBackground
                        source={require('../../Assets/app/logo4.png')}
                        style={{
                            flex: 1,
                            // justifyContent: '',
                            // backgroundColor:'red',
                            paddingHorizontal: 25,
                        }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image
                                source={require('../../Assets/app/logo4.png')}
                                style={{ width: 80, height: 70, resizeMode: 'contain' }}
                            />
                            <Text style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 }}>
                                Active
                            </Text>
                        </View>

                        <Text style={{ color: 'white', fontSize: 16 }}>
                            Active
                        </Text>
                    </ImageBackground>
                </View>

                {/* Complain */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: ScreenW, alignSelf: 'center', }}>
                    {/* Create Issue */}
                    <TouchableWithoutFeedback onPress={IssueHandle}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', gap: ScreenH * 0.008 }}>
                            <View style={{ backgroundColor: '#D7EDFF', width: ScreenW * 0.15, height: ScreenH * 0.068, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <BarcodeScan width={ScreenW * 0.075} height={35} />
                            </View>
                            <Text style={{ color: theme.primaryText, fontSize: ScreenW * 0.029 }}>Create Issue</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* My Issue */}
                    <TouchableWithoutFeedback onPress={myIssue}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', gap: ScreenH * 0.008 }}>
                            <View style={{ backgroundColor: '#E2FFF7', width: ScreenW * 0.15, height: ScreenH * 0.068, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <IssueIcon width={ScreenW * 0.075} height={35} />
                            </View>
                            <Text style={{ color: theme.primaryText, fontSize: ScreenW * 0.029 }}>My Issue</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Dashboard */}
                    <TouchableWithoutFeedback onPress={Dashboard}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', gap: ScreenH * 0.008 }}>
                            <View style={{ backgroundColor: '#FFEEEA', width: ScreenW * 0.15, height: ScreenH * 0.068, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <DashboardIcon width={ScreenW * 0.075} height={35} />
                            </View>
                            <Text style={{ color: theme.primaryText, fontSize: ScreenW * 0.029 }}>Dashboard</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>

        </View>
    )
}


export default Home;