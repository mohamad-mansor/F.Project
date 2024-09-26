import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 16,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  verified: Number,
  verifylink: String,
  tos: {
    type: Number,
    enum: [1],
  },
});

// Unser Return-Objekt aufräumen
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

// Passwort wird mit dem gehasten passwort geprüft und verglichen, sind beide richtig gibt es true zurück.
UserSchema.methods.authenticate = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

//Hook: wird vorher ausgeführt und das passwort wird gehasht
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export const User = model("User", UserSchema);


