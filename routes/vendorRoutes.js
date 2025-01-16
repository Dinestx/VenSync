import express from 'express'
import { applyvendor,getComplaints,updateVendorProfile} from '../controllers/vendorControllers.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/applyvendor',protect,applyvendor)

router.get('/getcomplaint',protect,getComplaints)

router.post('/updatevendorprofile',protect,updateVendorProfile)





export default router;