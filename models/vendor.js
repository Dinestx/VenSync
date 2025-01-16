// models/Vendor.js
import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  baseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Base',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  aadhar: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },

  applied_at: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  assigned_work: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
    },
  ],
  earnings: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
});

const Vendor= mongoose.model('Vendor', vendorSchema);
export default Vendor
