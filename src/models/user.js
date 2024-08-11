import mongoose from "mongoose";
const { Schema, model } = mongoose;

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(["CUSTOMER", "ADMIN"]),
    default: "CUSTOMER",
    required: true,
  },
});

// Creating the Mongoose model
const UserModel = model("User", UserSchema);

export { UserModel };
