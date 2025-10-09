import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signUp = async (req , res)=>{
    try{
        const {name , email , password} = req.body;

        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message:"email already exist"});
        }

        if(password.length < 8){
            return res.status(400).json({message:"password must be of 8 characters"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name , password:hashedPassword,email
        });
       
        const token = await genToken(user._id);

        //parsing our cookie

        res.cookie("token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000,
            sameSite : "strict",
            secure : false
        });

        return res.status(201).json(user);

    }catch(err){
        return res.status(500).json({message : `Sign up error ${err}`});
    }
};

export const Login = async (req , res)=>{
    try{
        const {email , password} = res.body;

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"email dose not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
             return res.status(400).json({message:"incorrect password"});
        }

      
       
        const token = await genToken(user._id);

        //parsing our cookie

        res.cookie("token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000,
            sameSite : "strict",
            secure : false
        });

        return res.status(200).json(user);

    }catch(err){
        return res.status(500).json({message : `login error ${err}`});
    }
};




export const logOut = async (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"logout successfully"})

    }catch(err){
         return res.status(500).json({message : `logout error ${err}`});
    }
}