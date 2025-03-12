import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get query parameters for filtering and pagination
    const { 
      category,
      search, 
      limit = 12, 
      page = 1 
    } = req.query;
    
    const pageSize = parseInt(limit);
    const skip = (parseInt(page) - 1) * pageSize;

    // Build the where clause
    const where = {};
    
    // Filter by category if provided
    if (category && category !== 'all') {
      where.categories = {
        some: {
          slug: category
        }
      };
    }
    
    // Search by name if search query is provided
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Get games with pagination
    const games = await prisma.game.findMany({
      where,
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            category: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      },
      skip,
      take: pageSize
    });

    // Get total count for pagination
    const totalGames = await prisma.game.count({ where });

    // Get all categories for filters
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return res.status(200).json({
      games,
      categories,
      pagination: {
        total: totalGames,
        page: parseInt(page),
        pageSize,
        pageCount: Math.ceil(totalGames / pageSize),
      }
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}