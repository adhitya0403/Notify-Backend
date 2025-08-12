import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, default: null },
  profile:{type:String, default:null}
});

const User = mongoose.model("User", userSchema);

export default User;
