
import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';
export const verifyToken = (req,res,next) => {
    const token =  req.cookies.access_token;
    token='65dd90322cb8bfaa1c2c37b5'
    console.log("value of  token ",token)
    if(!token) return next(errorHandler(401,'Unauthorized'));
    jwt.verify(token,"xcv",(err,user) => {
    if(err) return next(errorHandler(403,'Forbidden vuj'))
    req.user=user;
    next();
    })

}

