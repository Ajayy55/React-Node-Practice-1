import jwt from 'jsonwebtoken';
export const genToken=async(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:60*60})
    // return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})

}