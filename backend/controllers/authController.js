import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Einschreibungsfunktion
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    // Überprüft, ob der Benutzer bereits existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Inscription réussie", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
}

// Anmeldungsfunktion
export async function signin(req, res) {
  try {
    const { email, password } = req.body;

    // Überprüft, ob der Benutzer existiert
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Passwortvalidierung
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // JWT Token erstellen
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
}

// Abmeldungsfunktion
export function signout(req, res) {
  try {
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la déconnexion", error });
  }
}
