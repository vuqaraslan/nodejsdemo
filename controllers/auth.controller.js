import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/generateTokens.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found for provided email !" });
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ success: false, message: "Invalid credentials !" });
  }

  // const accesstoken=jwt.sign({id:user_id,email:user.email}, ACCESS_TOKEN_SECRET, {expiresIn:'15m'});
  // const refreshToken=jwt.sign({id:user._id,email:user.email},REFRESH_TOKEN_SECRET, {expiresIn:'7d'});
  // res.cookie('accessToken',accesstoken,{
  //     maxAge:15*60*1000,
  //     httpOnly:true,
  //     secure:false,
  //     sameSite:'strict'
  // });
  // res.cookie('refreshToken',refreshToken,{
  //     maxAge:7*24*60*60*1000,
  //     httpOnly:true,
  //     secure:false,
  //     sameSite:'strict'
  // });
  console.log(user);
  // console.log(user._id.toString());

  const {accessToken,refreshToken} = generateTokens(user,res);

  res.json({success:true,message:"Login was successfully !", accessToken, refreshToken });
};

export const register = async (req, res) => {
  const { name, surname, email, password,role } = req.body;

  //user.model.js de var deye yoxlanis yeni constraint,komentdedir cunki user modelde unique constraint-i var
  // const existingUser=await User.find({email:email});
  // if(existingUser.length>0){
  //     return res.status(400).json({message:"Email already exists !"});
  // }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    name: name,
    surname: surname,
    email: email,
    password: hashedPassword,
    role:role//eger post request-i atilanda role gonderilmese default olaraq user.model-de qeyd edildiyi kimi
             //user-role-da olacaq
  });
  await newUser.save();

  // const accessToken=jwt.sign({id:newUser._id,email:newUser.email},ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
  // const refreshToken=jwt.sign({id:newUser._id,email:newUser.email},REFRESH_TOKEN_SECRET,{expiresIn:'7d'});

  // res.cookie('accessToken',accessToken,{
  //     maxAge:15*60*1000,//15 minutes
  //     httpOnly:true,
  //     secure:false,//SET to true in production (HTTPS)
  //     sameSite:'strict'
  // });

  // res.cookie('refreshToken',refreshToken,{
  //     maxAge:7*24*60*60*1000,//7 days
  //     httpOnly:true,
  //     secure:false,//SET to true in production (HTTPS)
  //     sameSite:'strict'
  // });

  // console.log(newUser);

  const {accessToken,refreshToken} = generateTokens(newUser,res);

  res.status(201).json({ success: true, message: "User registered successfully !" ,accessToken,refreshToken});
};


export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully !" });
};


export const refreshToken = async (req,res) => {
    const {refreshToken}=req.cookies;

    if(!refreshToken){
        return res.status(401).json({success:false,message:"No refresh token provided !"});
    }

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({success:false,message:"Invalid refresh token !"});
        }

        const newAccessToken=jwt.sign({id:user._id,email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
        res.cookie('accessToken',newAccessToken,{
            maxAge:15*60*1000,//15 minutes
            httpOnly:true,
            secure:false,//SET to true in production (HTTPS)
            sameSite:'strict'
        });
        res.json({accesstoken:newAccessToken});
    });
};
