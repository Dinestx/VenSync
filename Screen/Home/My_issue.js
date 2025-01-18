import React, { useState, useEffect } from 'react'
import { useTheme } from '../Component/theme';
import { useNavigation } from '@react-navigation/native';
import { BackIcon, ScreenH, ScreenW, BarcodeScan, DashboardIcon, IssueIcon, NotificationIcon, Issue } from "../Component/exportAsset";

import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';


const My_issue = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [activeId, setActiveId] = useState(1);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading
    const [filteredComplaints, setFilteredComplaints] = useState([]);

    //Menu List==================================================
    const menuItems = [
        { id: 1, title: 'Ongoing' },
        { id: 2, title: 'Solved' },
        { id: 3, title: 'Rejected' },

    ];


    // Fetch Complaint Data from database
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = await AsyncStorage.getItem("token");

                if (!token) {
                    console.warn("No token found");
                    return;
                }

                const response = await axios.get(
                    'https://vensync-se39.onrender.com/api/user/getcomplaint',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log("Complaint Data:", response.data);
                const userComplaint = response.data;
                setComplaints(userComplaint); // Store data in state
            } catch (error) {
                console.error(
                    "Error fetching complaints:",
                    error.response?.data?.message || error.message || "Unknown Error"
                );
            }
        };

        fetchComplaints();
    }, []); // Empty dependency array to run only once


    const onGoing = () => {
        // Filter complaints based on status
        const filteredComplaints = complaints.complaints?.filter((complaint) => complaint.status === "pending" || complaint.status === "ongoing");
        console.log("FilteredComplaints", filteredComplaints);

        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5 }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        gap: 10,
                        alignItems: 'center',
                        paddingBottom: ScreenH * 0.035,
                    }}
                >
                    {/* Render only filtered complaints */}
                    {filteredComplaints && filteredComplaints.length > 0 ? (
                        filteredComplaints.map((complaint, index) => (
                            <View
                                key={index.toString()}
                                style={{
                                    height: ScreenH * 0.35,
                                    width: ScreenW * 0.87,
                                    borderWidth: 1,
                                    borderColor: theme.ComplainBoder,
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Image Section */}
                                <View style={{ flex: 2 / 2, backgroundColor: theme.bgColor }}>
                                    {/* Use the first image from the array if available */}
                                    <Image
                                        source={
                                            complaint.images && complaint.images.length > 0
                                                ? { uri: complaint.images[0] }
                                                : require('../../Assets/app/restro.jpg') // Fallback image
                                        }
                                        style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                                    />
                                </View>

                                <View
                                    style={{
                                        width: ScreenW,
                                        height: 1,
                                        backgroundColor: theme.ComplainBoder,
                                    }}
                                />

                                {/* Complaint Details */}
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: theme.CardColor,
                                        paddingVertical: 15,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                                        <View style={{ flexDirection: 'column', width: '90%' }}>
                                            <Text
                                                style={{
                                                    fontSize: ScreenW * 0.055,
                                                    fontWeight: 'bold',
                                                    color: theme.primaryText,
                                                }}
                                            >
                                                {complaint.title} {/* Dynamically display the title */}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: ScreenW * 0.035,
                                                    color: theme.primaryText,
                                                }}
                                            >
                                                {complaint.description} {/* Dynamically display the description */}
                                            </Text>
                                        </View>
                                        <Lottie
                                            source={
                                                complaint.status === "pending"
                                                    ? require('../../Assets/Pending.json')
                                                    : require('../../Assets/Ongoing.json')
                                            }
                                            style={{ width: 30, height: '50%' }}
                                            autoPlay
                                            loop
                                        />
                                    </View>

                                    <View
                                        style={{
                                            paddingVertical: ScreenH * 0.035,
                                            paddingHorizontal: 20,
                                        }}
                                    >
                                        <Text style={{ color: 'grey', fontWeight: '500' }}>Assigned</Text>
                                        <Text
                                            style={{
                                                color: '#66509d',
                                                fontWeight: '600',
                                                fontSize: ScreenW * 0.04,
                                            }}
                                        >
                                            {complaint.created_by?.name || 'Unknown'}{' '}
                                            {/* Dynamically display the assigned person's name */}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>No complaints found.</Text>
                    )}
                </View>
            </ScrollView>
        );

    };

    // const onGoing = () => {
    //     useEffect(() => {
    //         // Simulate an API call
    //         setTimeout(() => {
    //           const fetchedComplaints = complaints.complaints?.filter((complaint) => complaint.status === "pending");
    //           setFilteredComplaints(fetchedComplaints);
    //           setLoading(false); // Set loading to false after data is fetched
    //         }, 2000); // Simulate 2 seconds of loading time
    //       }, []);

    //       return (
    //         <ScrollView
    //           showsHorizontalScrollIndicator={false}
    //           contentContainerStyle={{ paddingVertical: 5 }}
    //         >
    //           <View style={{ flexDirection: 'column', gap: 10, alignItems: 'center', paddingBottom: ScreenH * 0.035 }}>
    //             {loading ? (
    //               // Shimmer placeholders while loading
    //               Array(3)
    //                 .fill(0)
    //                 .map((_, index) => (
    //                   <View
    //                     key={index.toString()}
    //                     style={{
    //                       height: ScreenH * 0.35,
    //                       width: ScreenW * 0.87,
    //                       borderRadius: 16,
    //                       marginBottom: 10,
    //                       overflow: 'hidden',
    //                     }}
    //                   >
    //                     <ShimmerPlaceholder
    //                       LinearGradient={LinearGradient}
    //                       style={{ height: '60%', width: '100%', borderRadius: 10 }}
    //                     />
    //                     <ShimmerPlaceholder
    //                       LinearGradient={LinearGradient}
    //                       style={{
    //                         height: 20,
    //                         width: '60%',
    //                         marginTop: 10,
    //                         alignSelf: 'center',
    //                       }}
    //                     />
    //                     <ShimmerPlaceholder
    //                       LinearGradient={LinearGradient}
    //                       style={{
    //                         height: 14,
    //                         width: '80%',
    //                         marginTop: 6,
    //                         alignSelf: 'center',
    //                       }}
    //                     />
    //                     <ShimmerPlaceholder
    //                       LinearGradient={LinearGradient}
    //                       style={{
    //                         height: 14,
    //                         width: '40%',
    //                         marginTop: 20,
    //                         alignSelf: 'center',
    //                       }}
    //                     />
    //                   </View>
    //                 ))
    //             ) : filteredComplaints && filteredComplaints.length > 0 ? (
    //               filteredComplaints.map((complaint, index) => (
    //                 <View
    //                   key={index.toString()}
    //                   style={{
    //                     height: ScreenH * 0.35,
    //                     width: ScreenW * 0.87,
    //                     borderWidth: 1,
    //                     borderColor: theme.ComplainBoder,
    //                     borderRadius: 16,
    //                     overflow: 'hidden',
    //                   }}
    //                 >
    //                   {/* Image Section */}
    //                   <View style={{ flex: 2 / 2, backgroundColor: theme.bgColor }}>
    //                     <Image
    //                       source={require('../../Assets/app/restro.jpg')}
    //                       style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
    //                     />
    //                   </View>

    //                   <View style={{ width: ScreenW, height: 1, backgroundColor: theme.ComplainBoder }} />

    //                   {/* Complaint Details */}
    //                   <View style={{ flex: 1, backgroundColor: theme.CardColor, paddingVertical: 15 }}>
    //                     <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
    //                       <View style={{ flexDirection: 'column', width: '90%' }}>
    //                         <Text
    //                           style={{
    //                             fontSize: ScreenW * 0.055,
    //                             fontWeight: 'bold',
    //                             color: theme.primaryText,
    //                           }}
    //                         >
    //                           {complaint.title}
    //                         </Text>
    //                         <Text
    //                           style={{
    //                             fontSize: ScreenW * 0.035,
    //                             color: theme.primaryText,
    //                           }}
    //                         >
    //                           {complaint.description}
    //                         </Text>
    //                       </View>
    //                       <Lottie
    //                         source={require('../../Assets/Ongoing.json')}
    //                         style={{ width: 30, height: '50%' }}
    //                         autoPlay
    //                         loop
    //                       />
    //                     </View>

    //                     <View style={{ paddingVertical: ScreenH * 0.035, paddingHorizontal: 20 }}>
    //                       <Text style={{ color: 'grey', fontWeight: '500' }}>Assigned</Text>
    //                       <Text
    //                         style={{
    //                           color: '#66509d',
    //                           fontWeight: '600',
    //                           fontSize: ScreenW * 0.04,
    //                         }}
    //                       >
    //                         {complaint.created_by}
    //                       </Text>
    //                     </View>
    //                   </View>
    //                 </View>
    //               ))
    //             ) : (
    //               <Text>No complaints found.</Text>
    //             )}
    //           </View>
    //         </ScrollView>
    //       );
    // }

    const solved = () => {
        const filteredComplaints = complaints.complaints?.filter((complaint) => complaint.status === "solved");
        console.log("FilteredComplaints", filteredComplaints);

        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5 }}
            >
                {/* Render only filtered complaints */}
                {filteredComplaints && filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint, index) => (
                        <View
                            style={{
                                flexDirection: 'column',
                                gap: 10,
                                alignItems: 'center',
                                paddingBottom: ScreenH * 0.035,
                            }}
                        >

                            <View
                                key={index.toString()}
                                style={{
                                    height: ScreenH * 0.35,
                                    width: ScreenW * 0.87,
                                    borderWidth: 1,
                                    borderColor: theme.ComplainBoder,
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Image Section */}
                                <View style={{ flex: 2 / 2, backgroundColor: theme.bgColor }}>
                                    {/* Use the first image from the array if available */}
                                    <Image
                                        source={
                                            complaint.images && complaint.images.length > 0
                                                ? { uri: complaint.images[0] }
                                                : require('../../Assets/app/restro.jpg') // Fallback image
                                        }
                                        style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                                    />
                                </View>

                                <View
                                    style={{
                                        width: ScreenW,
                                        height: 1,
                                        backgroundColor: theme.ComplainBoder,
                                    }}
                                />

                                {/* Complaint Details */}
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: theme.CardColor,
                                        paddingVertical: 15,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                                        <View style={{ flexDirection: 'column', width: '90%' }}>
                                            <Text
                                                style={{
                                                    fontSize: ScreenW * 0.055,
                                                    fontWeight: 'bold',
                                                    color: theme.primaryText,
                                                }}
                                            >
                                                {complaint.title} {/* Dynamically display the title */}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: ScreenW * 0.035,
                                                    color: theme.primaryText,
                                                }}
                                            >
                                                {complaint.description} {/* Dynamically display the description */}
                                            </Text>
                                        </View>
                                        <Lottie
                                            source={require('../../Assets/Ongoing.json')}
                                            style={{ width: 30, height: '50%' }}
                                            autoPlay
                                            loop
                                        />
                                    </View>

                                    <View
                                        style={{
                                            paddingVertical: ScreenH * 0.035,
                                            paddingHorizontal: 20,
                                        }}
                                    >
                                        <Text style={{ color: 'grey', fontWeight: '500' }}>Assigned</Text>
                                        <Text
                                            style={{
                                                color: '#66509d',
                                                fontWeight: '600',
                                                fontSize: ScreenW * 0.04,
                                            }}
                                        >
                                            {complaint.created_by?.name || 'Unknown'}{' '}
                                            {/* Dynamically display the assigned person's name */}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    ))
                ) : (
                    <View style={{flex:1, height: ScreenH/2, justifyContent:'center', alignContent:'center'}}>
                        <Text style={{color: theme.primaryText, textAlign:'center'}}>No complaints found.</Text>
                    </View>
                )}
            </ScrollView>
        );
    };




    const rejected = () => {
        const filteredComplaints = complaints.complaints?.filter((complaint) => complaint.status === "rejected");
        console.log("FilteredComplaints", filteredComplaints);

        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5 }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        gap: 10,
                        alignItems: 'center',
                        paddingBottom: ScreenH * 0.035,
                    }}
                >
                    {/* Render only filtered complaints */}
                    {filteredComplaints && filteredComplaints.length > 0 ? (
                        filteredComplaints.map((complaint, index) => (
                            <View
                                key={index.toString()}
                                style={{
                                    height: ScreenH * 0.35,
                                    width: ScreenW * 0.87,
                                    borderWidth: 1,
                                    borderColor: theme.ComplainBoder,
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Image Section */}
                                <View style={{ flex: 2 / 2, backgroundColor: theme.bgColor }}>
                                    {/* Use the first image from the array if available */}
                                    <Image
                                        source={
                                            complaint.images && complaint.images.length > 0
                                                ? { uri: complaint.images[0] }
                                                : require('../../Assets/app/restro.jpg') // Fallback image
                                        }
                                        style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                                    />
                                </View>

                                <View
                                    style={{
                                        width: ScreenW,
                                        height: 1,
                                        backgroundColor: theme.ComplainBoder,
                                    }}
                                />

                                {/* Complaint Details */}
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: theme.CardColor,
                                        paddingVertical: 15,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                                        <View style={{ flexDirection: 'column', width: '90%' }}>
                                            <Text
                                                style={{
                                                    fontSize: ScreenW * 0.055,
                                                    fontWeight: 'bold',
                                                    color: theme.primaryText,
                                                }}
                                            >
                                                {complaint.title} {/* Dynamically display the title */}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: ScreenW * 0.035,
                                                    color: theme.primaryText,
                                                }}
                                            >
                                                {complaint.description} {/* Dynamically display the description */}
                                            </Text>
                                        </View>
                                        <Lottie
                                            source={require('../../Assets/Ongoing.json')}
                                            style={{ width: 30, height: '50%' }}
                                            autoPlay
                                            loop
                                        />
                                    </View>

                                    <View
                                        style={{
                                            paddingVertical: ScreenH * 0.035,
                                            paddingHorizontal: 20,
                                        }}
                                    >
                                        <Text style={{ color: 'grey', fontWeight: '500' }}>Assigned</Text>
                                        <Text
                                            style={{
                                                color: '#66509d',
                                                fontWeight: '600',
                                                fontSize: ScreenW * 0.04,
                                            }}
                                        >
                                            {complaint.created_by?.name || 'Unknown'}{' '}
                                            {/* Dynamically display the assigned person's name */}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>No complaints found.</Text>
                    )}
                </View>
            </ScrollView>
        );
    };


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