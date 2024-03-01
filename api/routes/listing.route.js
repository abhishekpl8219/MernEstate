import express from "express";
import { createListing, deleteListing, getListing, updateListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { vToken } from "../controllers/auth.controller.js";


const router = express.Router();
router.post('/create',vToken,createListing);
router.delete('/delete/:id',vToken,deleteListing);
router.post('/update/:id',vToken,updateListing);
router.get('/get/:id',vToken,getListing);
export default router;