import React, { useState } from 'react'
import { useTheme } from '../Component/theme';
import { useNavigation } from '@react-navigation/native';
import { BackIcon, ScreenH, ScreenW, BarcodeScan, DashboardIcon, IssueIcon, NotificationIcon, Issue } from "../Component/exportAsset";

import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import Lottie from 'lottie-react-native';


const My_issue = () => {
    const theme = useTheme();
    const navigation = useNavigation();


    //Menu List==================================================
    const menuItems = [
        { id: 1, title: 'Ongoing' },
        { id: 2, title: 'Solved' },
        { id: 3, title: 'Rejected' },

    ];
    const [activeId, setActiveId] = useState(1);


    const onGoing = () => (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 5 }}>
            <View style={{ flexDirection: 'column', gap: 10, alignItems: 'center', paddingBottom: ScreenH * 0.035 }}>


                {/* Complain Card =========================================== */}
                <View style={{ height: ScreenH * 0.35, width: ScreenW * 0.87, borderWidth: 1, borderColor: theme.ComplainBoder, borderRadius: 16, flex: 1, overflow: 'hidden' }}>
                    <View style={{ flex: 2 / 2, backgroundColor: theme.bgColor }}>
                        <Image source={require('../../Assets/app/restro.jpg')} style={{ height: '100%', width: '100%', resizeMode: 'cover' }} />
                    </View>

                    <View style={{ width: ScreenW, height: 1, backgroundColor: theme.ComplainBoder }} />

                    <View style={{ flex: 1, backgroundColor: theme.CardColor, paddingVertical: 15 }}>
                        <View style={{ flexDirection: 'row', paddingLeft:20}}>
                            <View style={{ flexDirection: 'column', width:'90%'}}>
                                <Text style={{ fontSize: ScreenW * 0.055, fontWeight: 'bold', color:theme.primaryText }}>WhatsApp Advertisement</Text>
                                <Text style={{ fontSize: ScreenW * 0.035,color:theme.primaryText }}>Select promotions that are to be displayed in membership marketplace.</Text>
                            </View>
                            
                            <Lottie source={require('../../Assets/Ongoing.json')} style={{ width:'30', height: '50%',}} autoPlay loop={true} />
                        </View>

                        <View style={{ paddingVertical: ScreenH * 0.035, paddingHorizontal:20 }}>
                            <Text style={{ color: 'grey', fontWeight: 500 }}>Assigned</Text>
                            <Text style={{ color: '#66509d', fontWeight: 600, fontSize: ScreenW * 0.04 }}>Vishnu Prakash</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );



    const solved = () => (
        <ScrollView>

        </ScrollView>
    );




    const rejected = () => (
        <ScrollView>

        </ScrollView>
    );


    return (
        <View style={{ backgroundColor: theme.bgColor, flex: 1, flexDirection: 'column', paddingHorizontal: 25, }}>
            {/* App Bar */}
            <View style={{ paddingTop: ScreenH * 0.055, }}>
                <BackIcon style={{ paddingVertical: 18, color: theme.primaryText, backgroundColor: theme.SkipColor, borderRadius: 18 }} onPress={() => navigation.goBack()} />
            </View>

            {/* Text ============================================= */}
            <View style={{ paddingVertical: ScreenH * 0.019, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: ScreenW * 0.065, fontWeight: '600', color: theme.primaryText }}>My Issues</Text>
                <Text style={{ fontSize: ScreenW * 0.035, color: theme.primaryText }}>Select promotions that are to be displayed in membership marketplace.</Text>
            </View>







            {/* Menu================================================= */}
            <View style={{ marginVertical: 10, flexDirection: 'row', alignSelf: 'flex-start', gap: 15 }}>
                {menuItems.map(item => (
                    <Pressable key={item.id} style={{ backgroundColor: activeId === item.id ? '#66509d' : '#282828', borderRadius: 30, paddingHorizontal: 18, paddingVertical: 7, }} onPress={() => setActiveId(item.id)}>
                        <Text style={{ color: '#fff', fontSize: ScreenW * 0.033, fontWeight: '500' }}>{item.title}</Text>
                    </Pressable>
                ))}
            </View>



            {/* Filtring =============================================  */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {activeId === 1 && onGoing()}
                {activeId === 2 && solved()}
                {activeId === 3 && rejected()}
            </ScrollView>
        </View>
    )
}

export default My_issue