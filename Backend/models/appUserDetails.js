const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    name: {
      type: String,
      required: function () {
        return this.isNew; // Only required for new users
      },
    },
    additionalData: {
      email: { type: String, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
      address: { type: String },
      age: { type: Number, min: 0 },
      // Add other fields as needed
    },
    otp: {
      code: { type: String },
      expiresAt: { type: Date }, // Expiration time for the OTP
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
