import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(notifications);
    } catch (error) {
      console.error("Notifications fetch error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Notification ID is required" });
      }

      await prisma.notification.update({
        where: {
          id: id,
          userId: userId, // Ensure the notification belongs to the user
        },
        data: {
          isRead: true,
        },
      });

      return res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Notification update error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Notification ID is required" });
      }

      await prisma.notification.delete({
        where: {
          id: id,
          userId: userId, // Ensure the notification belongs to the user
        },
      });

      return res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
      console.error("Notification delete error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}