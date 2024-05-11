const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profile: {
    name: String,
    bio: String,
    phone: String,
    photo: String,
    isPublic: { type: Boolean, default: true },
  },
  photoUrl: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
