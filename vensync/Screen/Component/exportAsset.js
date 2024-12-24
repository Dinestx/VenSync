import { Dimensions } from 'react-native';

import SplashScreen  from '../SplashScreen.js';
import OnboardingScreen  from '../Onboarding/Onboarding.js';
import  NavBar  from '../Component/NavBar.js';
import  Home  from '../Home/Home.js';
import Profile from '../Profile/Profile.js'
import SignIn from '../Auth/Signin.js'
import SignUp from '../Auth/Signup.js'

// Icon Import
import HomeIcon from '../../Assets/Icon/home.svg'; 
import SearchIcon from '../../Assets/Icon/search.svg';
import UserIcon from '../../Assets/Icon/user.svg';
import BackIcon from '../../Assets/Icon/back.svg';
import ArrowIcon from '../../Assets/Icon/arrow.svg'




const { height:ScreenH, width:ScreenW } = Dimensions.get('window');


export{
    ScreenH,
    ScreenW,


    SplashScreen,
    OnboardingScreen,
    NavBar,
    Home,
    Profile,
    SignIn,
    SignUp,


    // Icon Export
    HomeIcon,
    SearchIcon,
    UserIcon,
    BackIcon,
    ArrowIcon,
}