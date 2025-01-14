import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const userData = async () => {
    try {
        const response = await axios.post("https://vensync-se39.onrender.com/api/base/generate-otp", {
            email: email,
        });

    } catch (error) {
        console.log(error)
    }

}