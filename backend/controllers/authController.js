import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

// Secrets for JWT and refresh tokens
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = '15m';  // User token expires in 15 minutes
const JWT_REFRESH_EXPIRES_IN = '7d';  // Refresh token expires in 7 days

// Function to generate JWT with user role
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role }, // Include role in the token
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Function to generate refresh token
function generateRefreshToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

// User signup
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    // Set refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
      sameSite: 'Strict',  // Only send the cookie for same-site requests
    });


    res.status(201).json({
      message: "User registered successfully",
      token,
      refreshToken,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration error", error: error.message });
  }
}

// User signin
export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
      sameSite: 'Strict',  // Only send the cookie for same-site requests
    });

    res.status(200).json({
      message: "User signed in successfully",
      token,
      refreshToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Signin error", error: error.message });
  }
}

// Function to refresh JWT token using refresh token
export async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newToken = generateToken(user);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token", error: error.message });
  }
}

// User signout
export function signout(req, res) {
  // Invalidate refresh token logic can be added here if needed
  res.status(200).json({ message: "User signed out successfully" });
}

