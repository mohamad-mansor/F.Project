import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js"; 

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1h" } 
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: "7d" } 
  );
}

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new UserModel({
      username,
      email,
      password
    });
    await newUser.save();

    const token = generateToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      sameSite: 'Strict',  
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      refreshToken,
      user: newUser,
    });
  } catch (error) {
    console.error("Error during signup:", error); 
    res.status(500).json({ message: "Registration error", error: error.message });
  }
}

// User signin
export async function signin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    
    const token = generateToken(user); 

    res.status(200).json({ message: "Successful connection", token });
  } catch (error) {
    res.status(500).json({ message: "Signin error", error: error.message });
  }
}
export async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newToken = generateToken(user); 
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token", error: error.message });
  }
}

export function signout(req, res) {
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict' });

  // Andere Signout-bezogene Aktionen können hier ausgeführt werden

  res.status(200).json({ message: "Benutzer erfolgreich abgemeldet" });
}
