// src/utils/auth.config.js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import dbConnect from '@/lib/dbConnect';
import User from '../../models/User'; // Example: Mongoose User model

const authConfig = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers as needed
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Modify the JWT token
      if (user) {
        token.id = user._id.toString(); // Assuming _id is ObjectId in MongoDB
        token.isAdmin = user.isAdmin; // Example: Custom user fields
      }
      return token;
    },
    async session({ session, token }) {
      // Modify the session object
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async signIn(user, account, profile) {
      const { email } = user;

      // Connect to MongoDB with Mongoose
      await dbConnect();

      // Check if the user already exists in the database
      let existingUser = await User.findOne({ email });

      // If the user does not exist, create a new user in the database
      if (!existingUser) {
        existingUser = await User.create({ email });
      }

      return true; // Return true to continue the sign-in process
    },
  },
};

export default NextAuth(authConfig);
