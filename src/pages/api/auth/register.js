
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Create a single instance of PrismaClient
const prisma = new PrismaClient({
  // Add logging to help debug connection issues
  log: ['query', 'info', 'warn', 'error'],
});

export default async function handler(req, res) {

    // Debug: Check if environment variable is loaded
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    // IMPORTANT: Don't log the actual URL in production as it contains credentials
    console.log("DATABASE_URL starts with:", process.env.DATABASE_URL?.substring(0, 15));
    
    // Only proceed if we have a database URL
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        message: 'Database configuration error', 
        details: 'DATABASE_URL environment variable is not set or not loaded properly' 
      });
    }
    
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists - using try/catch to handle potential connection errors
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    } catch (findError) {
      console.error('Error checking existing user:', findError);
      return res.status(500).json({ 
        message: 'Database error while checking user', 
        details: findError.message 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with explicit try/catch
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Don't return the password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (createError) {
      console.error('Error creating user:', createError);
      return res.status(500).json({ 
        message: 'Failed to create user', 
        details: createError.message 
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      details: error.message 
    });
  }
}