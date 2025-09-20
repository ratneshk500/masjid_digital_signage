import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"; // your NextAuth config

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.status(200).json({ message: "Session found", user: session.user });
}
