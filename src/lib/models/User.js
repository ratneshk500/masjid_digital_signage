import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  user_type: { type: Number, default: 0 },
  age: { type: Number, default: 18 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
