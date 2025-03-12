import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Order ID is required" });
  }

  if (req.method === "GET") {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id,
          userId, // Ensure the order belongs to the user
        },
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
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error("Order detail fetch error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    // This endpoint could be used to update order status
    // For example, after a payment webhook from Midtrans
    // For now, we'll keep it simple

    return res.status(501).json({ message: "Not implemented" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}