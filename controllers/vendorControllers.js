import Vendor from "../models/vendor.js";




// Generate OTP function
export const applyvendor= async(req,res)=>{
    const { name, email, skills, address, experience } = req.body;
  const { baseId } = req.user;

  try {
    const vendor = new Vendor({
      baseId,
      name,
      email,
      skills,
      address,
      experience,
    });

    await vendor.save();
    res.status(201).json({ message: 'Applied as vendor successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error applying as vendor', error: err.message });
  }

}

//get vendors tasks to do
export const getComplaints = async (req, res) => {
    const { role } = req.user; // role should be passed from middleware
    const userId = req.userId;
  
    try {
      let complaints;
      if (role === 'vendor') {
        complaints = await Complaint.find({ assigned_to: userId }).populate('created_by');
      } else {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
  
      res.status(200).json({ complaints });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching complaints', error: err.message });
    }
  };


  //update vendor profile
  export const updateVendorProfile = async (req, res) => {
    const vendorId = req.userId; // Extracted from session or token middleware
    const { name, email, skills, address, experience } = req.body;
  
    try {
      // Find and update vendor profile
      const vendor = await Vendor.findByIdAndUpdate(
        vendorId,
        { name, email, skills, address, experience },
        { new: true } // Return updated document
      );
  
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
  
      res.status(200).json({ message: "Vendor profile updated successfully", vendor });
    } catch (err) {
      res.status(500).json({ message: "Error updating vendor profile", error: err.message });
    }
  };