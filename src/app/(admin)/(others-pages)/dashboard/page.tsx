// app/dashboard/page.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return <p>Not logged in</p>;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return <p>Welcome {user.email}</p>;
  } catch {
    return <p>Invalid session</p>;
  }
}
