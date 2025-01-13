import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { ScreenH, ScreenW, BackIcon, ArrowIcon, FileIcon, BarcodeScan } from '../Component/exportAsset';
import { useTheme } from '../Component/theme'
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import Lottie from 'lottie-react-native';



export default function Issue() {

    const theme = useTheme();
    const navigation = useNavigation();
    const [isTitleFocused, setTitleFocused] = useState(false);
    const [isDisFocused, setDisFocused] = useState(false);
    const [isUploadFocused, setUploadFocused] = useState(false);
    const [isopenMedia, setOpenMedia] = useState(false);

    const [complaintTitle, setComplaintTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const options = {
        title: 'Select Image or Video\n(mixed)',
        type: 'library',
        options: {
            selectionLimit: 1,
            mediaType: 'mixed',
        },
    }


    const openCamera = async () => {
        const camera = await launchCamera(options)
    }

    const openMedia = async () => {
        const media = await launchImageLibrary(options)

    }


    const openMediaSheet = () => {
        setOpenMedia(!isopenMedia);
    }

    return (
        <View style={{ backgroundColor: theme.bgColor, flex: 1, flexDirection: 'column', paddingHorizontal: 25, }}>
            {/* App Bar */}
            <View style={{ paddingTop: ScreenH * 0.055, }}>
                <BackIcon style={{ paddingVertical: 18, color: theme.primaryText, backgroundColor: theme.SkipColor, borderRadius: 18 }} onPress={() => navigation.goBack()} />
            </View>

            {/* Text ============================================= */}
            <View style={{ paddingVertical: ScreenH * 0.025, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: ScreenW*0.065, fontWeight: '600', color: theme.primaryText }}>Raise your Issue</Text>
                <Text style={{ fontSize: ScreenW*0.035, color: theme.primaryText }}>View promotions that are displayed in membership marketplace.</Text>
            </View>


            <View style={{ gap: 15 }}>
                {/* Title =========================================== */}
                <View style={{
                    height: ScreenH * 0.057,
                    borderRadius: 12,
                    backgroundColor: theme.textInput,
                    borderWidth: 2,
                    borderColor: isTitleFocused ? theme.nameActive : '#3d305e',
                }}
                    onFocus={() => setTitleFocused(true)} // Set focus state to true
                    onBlur={() => setTitleFocused(false)} // Set focus state to false
                >
                    <TextInput
                        style={{
                            color: theme.placeholder,
                            fontSize: ScreenW * 0.04,
                            flex: 1,
                            marginLeft: 10,
                            fontWeight: 'bold',
                            alignItems: 'center',
                            letterSpacing: 1,
                        }}
                        value={complaintTitle}
                        onChange={setComplaintTitle}
                        placeholder="Title"
                        keyboardType="default"
                        placeholderTextColor='#3d305e'
                    />
                </View>



                {/* Description =========================================== */}
                <View style={{
                    height: ScreenH * 0.15,
                    borderRadius: 15,
                    backgroundColor: theme.textInput,
                    borderWidth: 2,
                    borderColor: isDisFocused ? theme.nameActive : '#3d305e',
                }}
                    onFocus={() => setDisFocused(true)}
                    onBlur={() => setDisFocused(false)}
                >
                    <TextInput
                        style={{
                            color: theme.placeholder,
                            fontSize: ScreenW * 0.045,
                            // flex: 1,
                            paddingHorizontal: 10,
                            fontSize: ScreenW * 0.04,
                            flexWrap: 1,
                        }}
                        value={description}
                        onChange={setDescription}
                        placeholder="Description"
                        keyboardType="default"
                        letterSpacing={1}
                        placeholderTextColor={isDisFocused ? theme.nameActive : '#3d305e'}
                        multiline={true}
                    />
                </View>





                {/* Upload Image =========================================== */}
                <TouchableWithoutFeedback onPress={() => {
                    setOpenMedia(true);
                }}>
                    <View style={{
                        height: ScreenH * 0.15,
                        borderRadius: 15,
                        backgroundColor: theme.textInput,
                        borderWidth: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: isUploadFocused ? theme.nameActive : '#3d305e',
                        gap: 5
                    }}
                        // onFocus={() => setUploadFocused(true)} // Set focus state to true
                        // onBlur={() => setUploadFocused(false)} // Set focus state to false
                        value={image}
                        onChange={setImage}
                    >
                        <FileIcon color="#66509d" width={ScreenW * 0.075} height={35} />
                        <Text style={{ color: '#66509d' }}>File Upload</Text>
                    </View>
                </TouchableWithoutFeedback>

                <Modal isVisible={isopenMedia} onTouchEndCapture={() => {
                    setOpenMedia(false);
                }}>
                    <View style={{ position: 'absolute', backgroundColor: theme.pColor, width: '100%', left: 0, right: 0, height: ScreenH * 0.15, bottom: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-evenly' }}>

                        {/* Camera================================================ */}
                        <TouchableWithoutFeedback onPress={openCamera}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: ScreenH * 0.008 }}>
                                <View style={{ backgroundColor: '#D7EDFF', width: ScreenW * 0.15, height: ScreenH * 0.068, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <BarcodeScan width={ScreenW * 0.075} height={35} />
                                </View>
                                <Text style={{ color: theme.primaryText, fontSize: ScreenW * 0.029 }}>Camera</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {/* Gallery */}
                        <TouchableWithoutFeedback onPress={openMedia}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: ScreenH * 0.008 }}>
                                <View style={{ backgroundColor: '#D7EDFF', width: ScreenW * 0.15, height: ScreenH * 0.068, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <BarcodeScan width={ScreenW * 0.075} height={35} />
                                </View>
                                <Text style={{ color: theme.primaryText, fontSize: ScreenW * 0.029 }}>Gallery</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>

            {/* Continue Button ===================================== */}
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: ScreenH * 0.055, marginTop: ScreenH * 0.072 }}>
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
                    onPress={() => navigation.navigate('SubmitComplain')}

                >
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Raise Complaint</Text>
                    {/* <ArrowIcon color={theme.placeholder} width={15} style={{ transform: [{ rotate: '225deg' }] }} /> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const SubmitComplain = ({ navigation }) => {
    const theme = useTheme();
    const ComplainReference = "FRI893686";

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 1200);

        return () => clearTimeout(timer);
    }, [navigation]);




    return (
        // <View style={{ backgroundColor:theme.bgColor, flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        //     {/* Text ============================================= */}
        //     <View style={{ paddingVertical: ScreenH * 0.035, paddingHorizontal: 5, justifyContent: 'center', alignItems:'center' }}>
        //         <Lottie
        //             source={require('../../Assets/Done.json')}
        //             autoPlay
        //             loop={true}
        //             style={{width: '80%',  
        //                 height: '80%', }}
        //         />
        //         <Text style={{ fontSize: 18, fontWeight: '600', color: theme.primaryText, }}>Track Your Complain</Text>
        //         <Text style={{ fontSize: 14, color: theme.primaryText }}>Reference No. {ComplainReference}</Text>
        //     </View>
        // </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:theme.bgColor}}>
            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                <Lottie source={require('../../Assets/Done.json')} style={{ width: '100%', height: '14%', position:'absolute' }}
                    autoPlay
                    loop={true}
                />
            </View>
            <View style={{height:ScreenH*0.09, alignItems:'center'}}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: theme.primaryText, }}>Track Your Complain</Text>
                <Text style={{ fontSize: 14, color: theme.primaryText, }}>Reference No. {ComplainReference}</Text>
            </View>
        </View>


    )
}

export { SubmitComplain };