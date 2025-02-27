// pages/api/products/featured.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      // Mock data for featured products
      const featuredProducts = [
        {
          id: 1,
          name: 'Wireless Headphones',
          slug: 'wireless-headphones',
          price: 59.99,
          image: '/images/headphones.jpg',
          description: 'High-quality wireless headphones with noise cancellation.',
        },
        {
          id: 2,
          name: 'Smart Watch',
          slug: 'smart-watch',
          price: 129.99,
          image: '/images/smartwatch.jpg',
          description: 'Track your fitness with this sleek smart watch.',
        },
        {
          id: 3,
          name: 'Gaming Mouse',
          slug: 'gaming-mouse',
          price: 39.99,
          image: '/images/mouse.jpg',
          description: 'Precision gaming mouse with customizable RGB.',
        },
        {
          id: 4,
          name: 'Portable Charger',
          slug: 'portable-charger',
          price: 19.99,
          image: '/images/charger.jpg',
          description: 'Compact charger with fast-charging capabilities.',
        },
      ];
  
      // Simulate a successful response
      res.status(200).json(featuredProducts);
    } else {
      // Handle non-GET requests
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }