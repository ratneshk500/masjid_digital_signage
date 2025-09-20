import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = credentials.password === user.password; // ❗hash this in real apps
        if (!isValid) return null;

        return { id: user._id, name: user.name, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt", // or "database"
  },
  secret: process.env.NEXTAUTH_SECRET,
});
