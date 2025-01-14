import Vendor from "../models/vendor";


export const approveVendor = async (req, res) => {
    const { vendorId } = req.params; // Assuming vendor ID is passed as a parameter
  
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      // Update the approved status
      vendor.approved = true;
      await vendor.save();
  
      res.status(200).json({ message: 'Vendor approved successfully', vendor });
    } catch (err) {
      console.error('Error approving vendor:', err.message);
      res.status(500).json({ message: 'Error approving vendor', error: err.message });
    }
  };