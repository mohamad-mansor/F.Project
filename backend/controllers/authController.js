import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; 

// Einschreibungsfunktion
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
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
    console.error("Error during signup:", error); // Log the error to the console
    res.status(500).json({ message: "Registration error", error: error.message });
  }
}


// User signin
export async function signin(req, res) {
  try {
    const { email, password } = req.body;

    //testen
    console.log("Anmeldedaten erhalten:", email, password);

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //testen
    console.log("Passwort korrekt?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Successful connection", token });
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
