import Base from "../models/baseUser.js";
import User from "../models/user.js";
import Vendor from "../models/vendor.js";
import { newOtp,validateOtp,sendOtp } from "../utils/otpEmail.js";
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

// Generate JWT Token
const createSessionToken = (baseId) => {
  return jwt.sign({ baseId }, JWT_SECRET, { expiresIn: '7d' });
};



// Generate OTP function
export const generateOtp = async(req,res)=>{
    const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'email number is required' });
  }

  try {
    const otp = newOtp()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    // Check if user exists
    let user = await Base.findOne({ email });
    if (!user) {
      user = new Base({ email, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }

    await user.save();
    await sendOtp(email, otp); // Twilio to send OTP

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error generating OTP', error: err.message });
  }
}


// verify OTP function
export const verifyOtp = async (req, res) => {

  const { email, otp } = req.body;

  try {
    // Check if the account exists
    const base = await Base.findOne({ email });
    if (!base) return res.status(404).json({ message: 'Account not found' });

    // Validate OTP and expiration
    if (base.otp !== otp || base.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP after successful verification
    base.otp = null;
    base.otpExpiry = null;
    await base.save();

    // Check for user and vendor profiles
    const user = await User.findOne({ baseId: base._id });
    const vendor = await Vendor.findOne({ baseId: base._id });

    // Generate session token
    const token = createSessionToken(base._id);

    // Prepare response based on existence of user or vendor
    if (user || vendor) {
      res.status(200).json({
        message: 'Login successful',
        token,
        profileComplete: "true", // Indicates profile is already completed
        data: {
          user: user || null,
          vendor: vendor || null,
        },
      });
    } else {
      res.status(200).json({
        message: 'OTP verified',
        token,
        profileComplete: "false", // Indicates a new user who needs to complete their profile
      });
    }
  } catch (err) {
    console.error('Error verifying OTP:', err.message);
    res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
}