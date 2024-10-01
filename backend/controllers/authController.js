import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js"; 

// Einschreibungsfunktion
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User exists already" });
    }
    const newUser = new UserModel({
      username,
      email,
      password
    });
    await newUser.save();
    res.status(201).json({ message: "Successful registration", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error); 
    res.status(500).json({ message: "Registration error", error: error.message });
  }
}



// Anmeldungsfunktion
export async function signin(req, res) {
  try {
    const { email, password } = req.body;

    //testen
    console.log("Anmeldedaten erhalten:", email, password);

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    //testen
    console.log("Benutzer gefunden:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    //testen
    console.log("Passwort korrekt?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    
    //testen
    console.log("JWT Secret:", process.env.JWT_SECRET);


    //testen
    console.log("JWT-Token generiert:", token);

    res.status(200).json({ message: "Successful connection", token });
  } catch (error) {
    res.status(500).json({ message: "Connection error", error });
  }
}

// Abmeldungsfunktion
export function signout(req, res) {
  try {
    res.status(200).json({ message: "Successful disconnection" });
  } catch (error) {
    res.status(500).json({ message: "Disconnection error", error });
  }
}

