import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; 

// Einschreibungsfunktion
export async function signup(req, res) {
  try {
            // testen
    console.log("Anmeldedaten:", req.body);

    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User exists already" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Successful registration", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error); 
    res.status(500).json({ message: "Registration error", error: error.message });
  }
}
// testen
const password = "12345678"; // Das Klartextpasswort
const hashedFromDB = "$2b$12$Gj7x4JGz5r/T8k2N3ASk6eJlA0Ufl7s2w5tJmpo30kbVs5/krKO9q"; // Das gehashte Passwort aus der DB

const isMatch = await bcrypt.compare(password, hashedFromDB);
console.log("Passwortvergleich:", isMatch); // Sollte true ausgeben


// Anmeldungsfunktion
export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
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
