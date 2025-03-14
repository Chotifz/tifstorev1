import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  // Check if user is authenticated and is an admin
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (session.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden - Admin access required" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Handle GET request - fetch single user
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
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
        }
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get recent orders for the user
      const recentOrders = await prisma.order.findMany({
        where: { userId: id },
        include: {
          items: {
            include: {
              product: {
                include: {
                  game: {
                    select: {
                      name: true,
                      icon: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 5
      });

      // Get the last login activity
      // Note: This assumes you have a way to track login activity
      // You might need to adjust this based on your actual schema
      
      // Format the user data
      const formattedUser = {
        ...user,
        ordersCount: user._count.orders,
        // Map database values to UI status
        status: user.isVerified ? 'active' : 'pending',
        // Include recent orders
        recentOrders: recentOrders.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          date: order.createdAt,
          status: order.status,
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          // Format items
          items: order.items.map(item => ({
            id: item.id,
            product: item.product.name,
            game: item.product.game?.name || 'N/A',
            price: item.price,
            quantity: item.quantity,
            gameData: item.gameData
          }))
        })),
        // Add last login info if available
        lastLoginDate: null, // You would need to populate this from your login tracking
      };

      return res.status(200).json(formattedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle PUT request - update user
  if (req.method === "PUT") {
    try {
      const { name, email, role, isVerified, phone, address, password, status } = req.body;

      // Build the update data
      const updateData = {};
      
      // Include fields that are present in the request
      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (role !== undefined) updateData.role = role;
      if (phone !== undefined) updateData.phone = phone;
      if (address !== undefined) updateData.address = address;
      
      // Handle status mapping
      if (status !== undefined) {
        // Map UI status to database fields
        if (status === 'active') {
          updateData.isVerified = true;
        } else if (status === 'pending') {
          updateData.isVerified = false;
        }
        // Add other status mappings as needed
      } else if (isVerified !== undefined) {
        updateData.isVerified = isVerified;
      }
      
      // If password is provided, hash it
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Update the user
      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
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
          updatedAt: true
        }
      });

      // Format the response
      const formattedUser = {
        ...updatedUser,
        status: updatedUser.isVerified ? 'active' : 'pending'
      };

      return res.status(200).json(formattedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      
      // Handle specific errors
      if (error.code === 'P2025') {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle DELETE request - delete user
  if (req.method === "DELETE") {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Delete the user - cascade will handle related records based on your schema
      await prisma.user.delete({
        where: { id }
      });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle any other HTTP method
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}