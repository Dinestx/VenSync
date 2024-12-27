// models/BaseModel.js
import mongoose from "mongoose";


const baseSchema = new mongoose.Schema({
 
  phone: {
    type: String,
    required: true,
    unique: true,
  },
 
  role: {
    type: String,
    enum: ['user', 'vendor'],
    default: 'user',
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Base = mongoose.model('Base', baseSchema);

export default Base
