import jwt from 'jsonwebtoken';
 import bcrypt from 'bcrypt'
import User from '../models/User.js';
const createToken = (user,secret,expiresIn)=> {
    return jwt.sign({id:user._id,role:user.role},secret,{expiresIn});

}
export const signup = async(req,res)=>{
    const { username,email,password,role}= req.body;
    const user = await User.create({username,email,password,role});
    res.status(201).json({message:'User Created'});
}

export const login = async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});

    if(!user || !(await bcrypt.compare(password,user.password)))
        return res.status(401).json({error:'Invalid Credentials'});
    const accessToken = createToken(user,process.env.JWT_SECRET,process.env.JWT_EXPIRES_IN);
    const refreshToken = createToken(user,process.env.REFRESH_SECRET,'7d');
    res.json({accessToken,refreshToken});
};