import { getSession } from "next-auth/react";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Create a single instance of PrismaClient
export default async function handler(req, res) {
  // Hanya terima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, role, status, phone, address } = req.body;

    // Cek data yang wajib diisi
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cek apakah request dari admin untuk permission role
    const session = await getSession({ req });
    const isAdmin = session?.user?.role === 'ADMIN';
    
    // Tentukan data user yang akan dibuat
    const userData = {
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      address: address || null,
      // Jika yang menambahkan adalah admin, maka role dan status bisa disesuaikan
      // Jika bukan admin, maka role selalu USER dan isVerified false
      role: isAdmin ? (role || 'USER') : 'USER',
      isVerified: isAdmin ? (status === 'active') : false,
    };

    // Buat user baru
    const user = await prisma.user.create({
      data: userData,
    });

    // Jangan kirim password dalam response
    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      details: error.message 
    });
  }
}