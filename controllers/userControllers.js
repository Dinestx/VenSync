import User from "../models/user.js";
import Complaint from "../models/complaints.js";
import Vendor from "../models/vendor.js";


// Generate OTP function
export const completeprofile = async(req,res)=>{
    const { name, phone, address } = req.body;
    const  baseId  = req.baseId;
  
    
    try {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(400).json({
          message: "Phone number already exists. Please use a different phone number.",
        });
      }

      const user = new User({
        baseId:baseId,
        name,
        phone,
        address,
      });
  
      await user.save();
      res.status(201).json({
        message: 'Profile completed successfully',
        profileComplete: true,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error completing profile', error: err.message });
    }

}


//createComplaint by user
export const createComplaint = async (req, res) => {
    const { title, description, images } = req.body;
    const userId = req.userId; // Extracted from session or token middleware
  
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
  
    try {
      const complaint = new Complaint({
        title,
        description,
        images,
        created_by: userId,
      });
  
      await complaint.save();
      await User.findByIdAndUpdate(
        userId,
        { $push: { complaints: complaint._id } },
        { new: true }
      );
  
      res.status(201).json({ message: 'Complaint created successfully', complaint });
    } catch (err) {
      res.status(500).json({ message: 'Error creating complaint', error: err.message });
    }
  };
  
  // Get complaints (user-specific)
  export const getuserComplaints = async (req, res) => {
    const  baseId  = req.baseId;
  
    if (!baseId) {
      return res.status(400).json({ message: "user not found" });
    }
  
    try {
      // Find user associated with the baseId
      const user = await User.findOne({ baseId }).populate("complaints");
      // const vendor = await Vendor.findOne({ baseId });
  
      // If the user exists, return their complaints
      if (user) {
        return res.status(200).json({
          message: "Complaints fetched successfully",
          role: "user",
          complaints: user.complaints,
        });
      }
  
      // If the vendor exists, fetch complaints assigned to them
      // if (vendor) {
      //   const vendorComplaints = await Complaint.find({ assigned_to: vendor._id });
      //   return res.status(200).json({
      //     message: "Complaints fetched successfully",
      //     role: "vendor",
      //     complaints: vendorComplaints,
      //   });
      // }
  
      // If neither user nor vendor is found
      return res.status(404).json({ message: "No complaints found for this baseId" });
    } catch (err) {
      console.error("Error fetching complaints:", err.message);
      res.status(500).json({ message: "Error fetching complaints", error: err.message });
    }
  };
  
  // Update complaint status
  export const updateComplaintStatus = async (req, res) => {
    const { complaintId } = req.params;
    const { status } = req.body;
  
    if (!['pending', 'progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    try {
      const complaint = await Complaint.findById(complaintId);
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      complaint.status = status;
      complaint.updated_at = new Date();
  
      await complaint.save();
      res.status(200).json({ message: 'Complaint status updated', complaint });
    } catch (err) {
      res.status(500).json({ message: 'Error updating complaint', error: err.message });
    }
  };
  
  // Delete a complaint
  export const deleteComplaint = async (req, res) => {
    const { complaintId } = req.params;
  
    try {
      const complaint = await Complaint.findById(complaintId);
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      await complaint.remove();
      res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting complaint', error: err.message });
    }
  };


  //update user profile
  export const updateUserProfile = async (req, res) => {
    const userId = req.userId; // Extracted from session or token middleware
    const { name, phone, address } = req.body;
  
    try {
      // Find and update user profile
      const user = await User.findByIdAndUpdate(
        userId,
        { name, phone, address },
        { new: true } // Return updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User profile updated successfully", user });
    } catch (err) {
      res.status(500).json({ message: "Error updating user profile", error: err.message });
    }
  };