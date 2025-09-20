// pages/api/create-user.js
import {connectDB} from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    await connectDB();

    const user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error('Error creating user:', err);
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
