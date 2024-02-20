import User from '../models/user.model.js';
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

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
      const validPasword =  bcryptjs.compareSync(password,validUser.password);
      if(!validUser) return next(errorHandler(401,'password is in correct found'));
      const token = jwt.sign({ id: validUser._id }, "xcv");
      res.cookie('access-token',token,{httpOnly:true}).status(200).json(validUser._doc);
      
    } catch (error) {
      next(error);
      
    }
};