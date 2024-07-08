// src/models/User.js
import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  provider: { type: String, required: true }, // Provider (e.g., google, twitter, magic)
  providerId: { type: String, required: true }, // Unique identifier from the provider
  // Add other fields as per your application's requirements
});

// Create the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
