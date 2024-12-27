import express from 'express'
import { completeprofile, createComplaint, getuserComplaints, updateComplaintStatus, updateUserProfile } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/complete-profile',protect,completeprofile)
router.post('/createcomplaint',createComplaint)
router.get('/getcomplaint',getuserComplaints)
router.post('/updatecomplaintstatus',updateComplaintStatus)
router.post('/updateuserprofile',updateUserProfile)





export default router;