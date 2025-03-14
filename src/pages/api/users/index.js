import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  // Check if user is authenticated and is an admin
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (session.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden - Admin access required" });
  }

  // Handle GET request - fetch users with optional filters
  if (req.method === "GET") {
    try {
      const { search, status, role, page = 1, limit = 10 } = req.query;
      
      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);
      
      // Build where clause based on filters
      const where = {};
      
      // Add search filter if provided
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } }
        ];
      }
      
      // Add status filter if provided
      // Note: We may need to map status values based on your app's logic
      // This is just a placeholder - you would need to adjust it
      if (status && status !== 'all') {
        // Map the status from UI to database representation
        // For example, if UI has "active" but database uses "isActive" field
        if (status === 'active') {
          where.isVerified = true;
        } else if (status === 'pending') {
          where.isVerified = false;
        }
        // Add other mappings as needed
      }
      
      // Add role filter if provided
      if (role && role !== 'all') {
        where.role = role;
      }
      
      // Fetch users with filters
      const users = await prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isVerified: true,
          image: true,
          phone: true,
          address: true,
          joinDate: true,
          updatedAt: true,
          _count: {
            select: {
              orders: true
            }
          }
        },
        orderBy: {
          joinDate: 'desc'
        },
        skip,
        take
      });
      
      // Get total count for pagination
      const totalUsers = await prisma.user.count({ where });
      
      // Map users to include orders count and format data
      const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        joinDate: user.joinDate,
        image: user.image,
        phone: user.phone,
        address: user.address,
        ordersCount: user._count.orders,
        // Map database values to UI status
        status: user.isVerified ? 'active' : 'pending'
        // Add more mappings as needed
      }));
      
      return res.status(200).json({
        users: formattedUsers,
        pagination: {
          total: totalUsers,
          page: parseInt(page),
          pageSize: take,
          pageCount: Math.ceil(totalUsers / take)
        }
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  
  
  // Handle any other HTTP method
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}