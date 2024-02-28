import User from '../models/user.model.js';
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import { LocalStorage } from 'node-localstorage';

global.globaltoken = ""
export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
      await newUser.save();
      res.status(201).json('User created successfully!');

  } catch (error) {
    next(error);
  }
};
export const signin = async(req,res,next) => {

  const {email ,password} = req.body;
    try {
      const validUser = await User.findOne({email});
      if(!validUser) return next(errorHandler(404,'user not found'));
      const validPassword =  bcryptjs.compareSync(password,validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      if(!validUser) return next(errorHandler(401,'password is in correct found'));

      const token = jwt.sign({ id: validUser._id }, "xcv");
      validUser.accessToken=token;
      await validUser.save();
      global.globaltoken = token
      console.log("value of gloAVBAL TOKEN",globaltoken)
      res.cookie('access_token',token,{httpOnly:true,sameSite: 'none',expires: new Date(Date.now() + 3600000),maxAge: 3600000,path:'/',}).status(200).json(validUser._doc);
   
    } catch (error) {
      next(error);
      
    }
};
export const vToken = async(req,res,next) => {

  const token =  globaltoken
  console.log("value of token in vtoken",token)

  if(!token) return next(errorHandler(401,'Unauthorized'));
  jwt.verify(token,"xcv",(err,user) => {
  if(err) return next(errorHandler(403,'Forbidden vuj'))
  req.user=user;
  next();
  })

};
export const google = async(req,res,next) =>{
  try {
    const user = await User.findOne({email:req.body.email})
    if(user){
      const token = jwt.sign({ id: user._id }, "xcv");
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(user._doc);
      
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
      const newUser = new User({email:req.body.email,password:hashedPassword,avatar:req.body.photo,username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)})
      await newUser.save();
      const token = jwt.sign({ id: user._id }, "xcv");

      res.cookie('access_token',token,{httpOnly:true}).status(200).json(user._doc);
    }
    
  } catch (error) {
    next(error);
    
  }
}