import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const protectedRoute=async (req,res,next)=>{
    try {
        const {accessToken}=req.cookies;

        if(!accessToken){
            return res.status(401).json({success:false,message:"Unauthorized - No Token Provided !"});
        }

        const decoded =jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        console.log("__>>__>>____>>___>>__>>___")
        console.log(decoded);
        /*
        {
            id: '681e52f1e3415c6aeb3f4c67',
            email: 'leli@gmail.com',
            iat: 1746818093,
            exp: 1746818993
        }
         */
        // console.log("__________________________")
        if(!decoded){
            return res.status(401).json({succes:false,message:"Unauthorized - Invalid Token !"})
        }

        const user =await User.findById(decoded.id).select("-password");
        //  const user = await User.findOne({ email: email });

        if(!user){
            return res.status(404).json({succes:false,message:"User not found !"});
        }
        req.user=user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware : ",error.message);
        res.status(500).json({succes:false,message:"Internal server error !"});
    }
};