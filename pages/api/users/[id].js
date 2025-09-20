//connection with mangodb localhost  and create user table and its api in next ja
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";


export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  
 

  if (req.method === "GET") {
    const user = await User.findById(id);
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
