import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, getUserListings, updateUser } from '../controllers/user.controller.js';
import { vToken } from '../controllers/auth.controller.js';


const router = express.Router();
router.post('/update/:id',vToken,updateUser);
router.delete('/delete/:id',vToken,deleteUser);
router.get('/listings/:id',vToken,getUserListings);
export default router;