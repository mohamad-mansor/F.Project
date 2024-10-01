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
    maxLength: 16,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Allowed roles
    default: "user", // Default role is "user"
  },
  verified: {
    type: Number,
    default: 0, // 0 = not verified, 1 = verified
  },
  verifylink: {
    type: String,
  },
  tos: {
    type: Number,
    enum: [1], // Terms of Service acceptance
  },
});

// Method to remove sensitive fields when returning the user object
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password; // Do not return password in the response
  delete obj.__v;      // Do not return Mongoose version key
  return obj;
};

// Method to compare plain text password with hashed password in the database
UserSchema.methods.authenticate = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Pre-save hook: Hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export const UserModel = model("User", UserSchema);