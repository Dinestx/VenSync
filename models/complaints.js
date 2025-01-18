// models/Complaint.js
import mongoose from "mongoose";
import crypto from "crypto";
const complaintSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // URLs or file paths for uploaded images
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'progress', 'completed','rejected'],
    default: 'pending',
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  complaint_id: {
    type: String,
    unique: true,
    required: true,
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

complaintSchema.pre("save", async function (next) {
  if (!this.complaint_id) {
  
    this.complaint_id = crypto.randomBytes(5).toString("hex").slice(0, 9).toUpperCase();
  }
  next();
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint
