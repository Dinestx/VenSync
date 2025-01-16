// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 
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
    sparse:true,
  },
  address: {
    type: String,
  },
  complaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
    },
  ],
});

const User = mongoose.model('User', userSchema);

export default User
