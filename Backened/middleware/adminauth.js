import jwt from 'jsonwebtoken';

const adminauth = async (req,res,next)=>{
    try {
        const {token} = req.headers;

        if(!token){
            return res.json({success:false,message:"not authorized login again in admin auth"})
        }

        const decode_token = jwt.verify(token,process.env.JWT_SECRET);

        if(decode_token!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"not authorized login again in admin auth"})
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default adminauth;