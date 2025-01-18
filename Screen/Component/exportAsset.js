import { Dimensions } from 'react-native';

import SplashScreen  from '../SplashScreen.js';
import OnboardingScreen  from '../Onboarding/Onboarding.js';
import NavBar from './NavBar.js';
import Home from '../Home/Home.js';
import Profile from '../Profile/Profile.js'
import SignIn from '../Auth/Signin.js'
import SignUp from '../Auth/Signup.js'
import Vendor from '../Vendor/Vendor.js'
import Contact from '../Contact/Contact.js';
import Issue, {Complain} from '../Home/Issue.js';
import MyIssue from '../Home/My_issue.js';
import EmailAuth from '../Auth/Email_Auth.js';
import Welcome from '../Auth/Welcome.js'
import Developer from '../Profile/Developer.js';
import CompleteProfile from '../Profile/completeProfile.js'
import ApplyVendor from '../Vendor/applyVendor.js'

// Icon Import
import HomeIcon from '../../Assets/Icon/home.svg'; 
import SearchIcon from '../../Assets/Icon/search.svg';
import UserIcon from '../../Assets/Icon/user.svg';
import BackIcon from '../../Assets/Icon/back.svg';
import ArrowIcon from '../../Assets/Icon/arrow.svg'
import BarcodeScan from '../../Assets/Icon/scan-barcode.svg'
import IssueIcon from '../../Assets/Icon/wallet.svg'
import DashboardIcon from '../../Assets/Icon/scan.svg'
import NotificationIcon from '../../Assets/Icon/notification.svg'
import FileIcon from '../../Assets/Icon/fileupload.svg'
import IndianFlag from '../../Assets/Icon/iFlag.svg'
import EditIcon from '../../Assets/Icon/edit.svg'
import AccountIcon from '../../Assets/Icon/Account.svg'
import SettingIcon from '../../Assets/Icon/Setting.svg'
import HelpIcon from '../../Assets/Icon/help.svg'
import ContactIcon from '../../Assets/Icon/contact.svg';
import DevIcon from '../../Assets/Icon/dev.svg';


// Illustartion
import VendorService from '../../Assets/app/vservice.svg'


// Lottie
import Stack from '../../Assets/stack.json'




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
    Vendor,
    Contact,
    Issue,
    Complain,
    MyIssue,

    EmailAuth,
    Welcome,
    Developer,
    CompleteProfile,
    ApplyVendor,

    // Icon Export
    HomeIcon,
    SearchIcon,
    UserIcon,
    BackIcon,
    ArrowIcon,
    BarcodeScan,
    IssueIcon,
    DashboardIcon,
    NotificationIcon,
    FileIcon,
    IndianFlag,
    EditIcon,
    AccountIcon,
    SettingIcon,
    HelpIcon,
    ContactIcon,
    DevIcon,


    // Illustration
    VendorService,


    // Lottie
    Stack,
}