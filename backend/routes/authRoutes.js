import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Signup
router.post("/signup", async(req,res)=>{
  try {
    const {name,email,password} = req.body;
    
    // Check if user already exists
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hashed});

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});

    res.json({
      token,
      user:{
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", async(req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({message:"User not found"});

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({message:"Wrong password"});

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});

  res.json({
    token,
    user:{
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    }
  });
});

// Google Login
router.post("/google", async(req,res)=>{
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken:token,
    audience:process.env.GOOGLE_CLIENT_ID
  });
  const {name,email} = ticket.getPayload();

  let user = await User.findOne({email});
  if(!user){
    user = await User.create({name,email,password:"google"});
  }

  const jwtToken = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});

  res.json({
    token:jwtToken,
    user:{
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    }
  });
});

export default router;