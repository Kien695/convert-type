import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: String,

    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema, "users");
export default User;
