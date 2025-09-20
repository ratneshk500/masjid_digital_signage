
import jwt from "jsonwebtoken";
import { serialize  } from "cookie";
import dbConnect from "@/lib/mongodb";
import User from '@/lib/models/User';
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  
await dbConnect();

  if (req.method === "POST") {
    const { email, password } = req.body;

		console.log('===============');
	
    try {
      // Find user in DB
      const user = await User.findOne({ email });


      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      // Compare password (hashed)
      //const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = await User.findOne({password});
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

	const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
	

	///console.log(token);
	
	
	 res.setHeader("Set-Cookie", serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      }));
	
	
	/*
	 res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
      })
    );
*/

/*
	res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
    );

*/




      return res.status(200).json({ success: true, message: "Login successful", user });
	  //res.headers.set("Set-Cookie", serialized);
	  
	   //res.headers.set("Set-Cookie", serialized);
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}