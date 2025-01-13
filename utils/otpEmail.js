import nodemailer from 'nodemailer';

// Generate a random 6-digit OTP
export const newOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validate OTP (compare the stored OTP with the one provided)
export const validateOtp = (storedOtp, providedOtp, storedTimestamp) => {
  const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
  const currentTime = Date.now();

  if (currentTime - storedTimestamp > OTP_EXPIRY_MS) {
    return { valid: false, message: 'OTP has expired' };
  }

  return storedOtp === providedOtp
    ? { valid: true, message: 'OTP is valid' }
    : { valid: false, message: 'Invalid OTP' };
};

// Send OTP via Email
export const sendOtp = async (email, otp) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
    port: process.env.SMTP_PORT, // e.g., 587
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your email password or app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.SMTP_USER, // Sender address
    to: email, // Recipient address
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`, // Plain text body
    html: `<p>Your OTP is: <b>${otp}</b></p>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    return { success: false, message: 'Failed to send OTP', error };
  }
};
