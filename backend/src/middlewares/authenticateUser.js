

import jwt from 'jsonwebtoken';
import { User } from '../models/Users.model.js';

export const authUser=async(req,res,next)=>{
    
    const Token=req?.headers?.authorization;
    // console.log(Token);

    if(!Token)
    {
        return res.status(401).json({message:'Empty Token'})
    }
try {
    
        const decoded = await jwt.verify(Token,process.env.JWT_SECRET)
        if(decoded)
        {
            const checkUser=await User.findOne({_id:decoded.id})
            if(checkUser){
                req.user=decoded._id;  
                next() 
            }else{
                return res.status(401).json({message:'User not found in database'})
            } 
        }
        else{
            return res.status(401).json({message:'Invalid Token'})
        }
} catch (error) {
    console.log("jwt auth error :",error); 
    return res.status(501).json({error})

}
  
}