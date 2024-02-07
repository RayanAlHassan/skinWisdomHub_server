import { verifyToken } from '../utils/jwt.js'; 

export const authenticateUser = (req , res , next) =>{

    try{

        const token = req.cookies.token 
        if(!token){
            return res.status(401).json({
                err: 'Unauthorized'
            })
        }

        
        const decodedToken = verifyToken(token) ;
        
        if(!decodedToken){
            return res.status(401).json({
                err: 'Invalid token'
            })
        }
        req.user = decodedToken ; 
        console.log("usertoken",token)

        next()
    }catch (err){
        res.status(500).json({
            error : err
        })
    }
} // middleware 

export const authorizeUser = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
 
      next();
    };
  }; 

