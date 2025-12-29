const jwt=require('jsonwebtoken')

const authMiddleware=async(req,res)=>{
    const header=req.headers.authorization

    if(!header || header.startsWith('Bearer'))
        return res.status(401).json({ message: "Not authorized" });

    try {
        const token=header.split(" ")[1]
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decode
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports=authMiddleware