import jwt from "jsonwebtoken";

export const generateTokens=(user,res)=>{

    //user._id.toString() burda toString() etdimki, yoxsa user._id object formasindadir ve id datasi yazilmir
       const accessToken=jwt.sign({id:user._id.toString(),email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
        const refreshToken=jwt.sign({id:user._id.toString(),email:user.email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});
    
        res.cookie('accessToken',accessToken,{
            maxAge:15*60*1000,//15 minutes
            httpOnly:true,
            secure:false,//SET to true in production (HTTPS)
            sameSite:'strict'
        });
        res.cookie('refreshToken',refreshToken,{
            maxAge:7*24*60*60*1000,//7 days
            httpOnly:true,
            secure:false,//SET to true in production (HTTPS)
            sameSite:'strict'
        });

        return {refreshToken,accessToken};
};