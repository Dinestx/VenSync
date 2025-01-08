import twilio from 'twilio'

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Generate a random 6-digit OTP
export const newOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// Validate OTP (e.g., compare the stored OTP with the one provided)
export const validateOtp = (storedOtp, providedOtp) => {
  return storedOtp === providedOtp;
};



// Mock function to send OTP (replace this with a real service like Twilio)
export const sendOtp = async (phone, otp) => {
  console.log(`Sending OTP ${otp} to phone ${phone}`);
  try {
   

    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILO_NUM, // Replace with your Twilio number
      to: phone,
    });

    console.log(`OTP sent to ${phone}`);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    return { success: false, message: 'Failed to send OTP', error };
  }

 
};

