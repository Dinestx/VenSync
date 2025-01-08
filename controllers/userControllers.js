import User from "../models/user.js";
import Complaint from "../models/complaints.js";



// Generate OTP function
export const completeprofile = async(req,res)=>{
    const { name, email, address } = req.body;
    const { baseId } = req.user;
  
    try {
      const user = new User({
        baseId,
        name,
        email,
        address,
      });
  
      await user.save();
      res.status(201).json({ message: 'Profile completed successfully' });
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
      res.status(201).json({ message: 'Complaint created successfully', complaint });
    } catch (err) {
      res.status(500).json({ message: 'Error creating complaint', error: err.message });
    }
  };
  
  // Get complaints (user-specific)
  export const getuserComplaints = async (req, res) => {
    const { role } = req.user; // role should be passed from middleware
    const userId = req.userId;
  
    try {
      let complaints;
      if (role === 'user') {
        complaints = await Complaint.find({ created_by: userId }).populate('assigned_to');
      } else {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
  
      res.status(200).json({ complaints });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching complaints', error: err.message });
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
    const { name, email, address } = req.body;
  
    try {
      // Find and update user profile
      const user = await User.findByIdAndUpdate(
        userId,
        { name, email, address },
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