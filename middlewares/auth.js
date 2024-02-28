import { verifyToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (token) {
    const decodedToken = jwt.decode(token);
    req.user = decodedToken;
    console.log(decodedToken);
    next();
  } else {
    res.status(401).json("unauthorized");
  }
  // try{

  //     const token = req.cookie.token
  //     if(!token){
  //         return res.status(401).json({
  //             err: 'Unauthorized'
  //         })
  //     }

  //     const decodedToken = verifyToken(token) ;

  //     if(!decodedToken){
  //         return res.status(401).json({
  //             err: 'Invalid token'
  //         })
  //     }
  //     req.user = decodedToken ;
  //     console.log("usertoken",token)

  //     next()
  // }catch (err){
  //     res.status(500).json({
  //         error : err.message
  //     })
  // }
}; // middleware

export const authorizeUser = (roles) => {
  return (req, res, next) => {
    console.log("userrr0", req.user);
    try {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(500).send("Access denied. you don't have permission");
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  };
};

// export const authorizeUser = async (req, res, next) => {
//   console.log(req.user);
//   try {
//     if (req.user.role === "admin") {
//       next();
//     } else {
//       return res.status(500).send("Access denied. You don't have permission");
//     }
//   } catch (error) {
//     return res.status(404).json(error.message);
//   }
// };
