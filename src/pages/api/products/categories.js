export default function handler(req, res) {
  if (req.method === 'GET') {
    // Mock data for categories
    const categories = [
      {
        id: 1,
        name: 'Electronics',
        slug: 'electronics',
        image: '/images/electronics.jpg',
        description: 'Latest tech gadgets and electronic devices',
      },
      {
        id: 2,
        name: 'Audio',
        slug: 'audio',
        image: '/images/audio.jpg',
        description: 'Headphones, speakers, and audio accessories',
      },
      {
        id: 3,
        name: 'Wearables',
        slug: 'wearables',
        image: '/images/wearables.jpg',
        description: 'Smart watches and fitness trackers',
      },
      {
        id: 4,
        name: 'Gaming',
        slug: 'gaming',
        image: '/images/gaming.jpg',
        description: 'Gaming peripherals and accessories',
      },
      {
        id: 5,
        name: 'Accessories',
        slug: 'accessories',
        image: '/images/accessories.jpg',
        description: 'Chargers, cables, and other essential accessories',
      },
    ];
    
    // Simulate a successful response
    res.status(200).json(categories);
  } else {
    // Handle non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}





// import { prisma } from '@/lib/prisma';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const categories = await prisma.category.findMany({
//       where: {
//         isActive: true
//       },
//       orderBy: {
//         name: 'asc'
//       },
//       select: {
//         id: true,
//         name: true,
//         slug: true,
//         image: true,
//         _count: {
//           select: {
//             products: true
//           }
//         }
//       }
//     });

//     // Transform the data to include product count
//     const formattedCategories = categories.map(category => ({
//       id: category.id,
//       name: category.name,
//       slug: category.slug,
//       image: category.image,
//       productCount: category._count.products
//     }));

//     res.status(200).json(formattedCategories);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ message: 'Error fetching categories' });
//   }
// }