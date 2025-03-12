import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      // Get query parameters for filtering
      const { status, limit, page = 1 } = req.query;
      const pageSize = parseInt(limit) || 10;
      const skip = (parseInt(page) - 1) * pageSize;

      // Build the where clause
      const where = {
        userId: userId,
      };

      if (status && status !== "all") {
        where.status = status.toUpperCase();
      }

      // Get orders with pagination
      const orders = await prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  name: true,
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
          createdAt: "desc",
        },
        skip,
        take: pageSize,
      });

      // Get total count for pagination
      const totalOrders = await prisma.order.count({ where });

      return res.status(200).json({
        orders,
        pagination: {
          total: totalOrders,
          page: parseInt(page),
          pageSize,
          pageCount: Math.ceil(totalOrders / pageSize),
        },
      });
    } catch (error) {
      console.error("Orders fetch error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { productId, userId: gameUserId, serverId, paymentMethod, email } = req.body;

      if (!productId || !paymentMethod) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Fetch product details
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          game: true,
        },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Generate order number
      const orderNumber = `TRX${nanoid(8).toUpperCase()}`;

      // Create order with item
      const order = await prisma.order.create({
        data: {
          orderNumber,
          userId,
          paymentMethod,
          email: email || session.user.email,
          totalAmount: product.price,
          items: {
            create: {
              productId,
              price: product.price,
              gameData: {
                userId: gameUserId,
                serverId: serverId || null,
                gameName: product.game.name,
                productName: product.name,
              },
            },
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Create a notification for the order
      await prisma.notification.create({
        data: {
          userId: userId,
          type: "ORDER",
          title: "Pesanan Baru Dibuat",
          message: `Pesanan ${orderNumber} telah dibuat. Silahkan selesaikan pembayaran.`,
          isRead: false,
          data: {
            orderId: order.id,
            orderNumber: order.orderNumber,
          },
        },
      });

      // Here you would integrate with a payment gateway like Midtrans
      // For now, we'll return the order details

      return res.status(201).json(order);
    } catch (error) {
      console.error("Order creation error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}