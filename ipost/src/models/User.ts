import mongoose, { Schema, Document } from "mongoose";
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true, 
      maxlength: [50, "Username cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: true,
      trim: true,
      lowercase: true, 
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    verifyTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);


const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
