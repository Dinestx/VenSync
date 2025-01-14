import express from 'express'
import { completeprofile, createComplaint, getuserComplaints, updateComplaintStatus, updateUserProfile } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/complete-profile',protect,completeprofile)
router.post('/createcomplaint',protect,createComplaint)
router.get('/getcomplaint',protect,getuserComplaints)
router.post('/updatecomplaintstatus',protect,updateComplaintStatus)
router.post('/updateuserprofile',protect,updateUserProfile)





export default router;