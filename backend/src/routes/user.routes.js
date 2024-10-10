import { Router } from "express";
import { loginUser, registerUser, allusers, singleUser ,sentOTP,changePassword,updateUser} from "../controllers/user.controllers.js";
import { authUser } from "../middlewares/authenticateUser.js";

const router=Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/api/users',authUser,allusers);
router.get('/api/user/:id',authUser,singleUser);
router.post('/sentOTP',sentOTP)
router.patch('/changePassword',changePassword)
router.patch('/updateUser/:id',updateUser)


export default router