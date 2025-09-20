
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    // Fetch all users
    const users = await User.find({});
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
