import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ message: "Game slug is required" });
    }

    // Find the game by slug
    const game = await prisma.game.findUnique({
      where: {
        slug,
      },
      include: {
        categories: true,
        products: {
          orderBy: {
            price: 'asc',
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Group products by category
    const groupedProducts = game.products.reduce((acc, product) => {
      const category = product.category;
      
      if (!acc[category]) {
        acc[category] = [];
      }
      
      acc[category].push(product);
      
      return acc;
    }, {});

    // Format the response
    const formattedGame = {
      ...game,
      products: Object.keys(groupedProducts).map(category => ({
        category,
        items: groupedProducts[category]
      }))
    };

    return res.status(200).json(formattedGame);
  } catch (error) {
    console.error("Error fetching game details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}