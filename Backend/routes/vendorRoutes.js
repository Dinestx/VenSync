import express from 'express'
import { applyvendor,getComplaints,updateVendorProfile} from '../controllers/vendorControllers.js';
const router = express.Router();

router.post('/applyvendor',applyvendor)

router.get('/getcomplaint',getComplaints)

router.post('/updatevendorprofile',updateVendorProfile)





export default router;