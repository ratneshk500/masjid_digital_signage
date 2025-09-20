import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newUser = await User.create(data);
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
