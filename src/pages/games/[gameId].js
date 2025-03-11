import { useRouter } from 'next/router';
import { gameData } from '@/config/dummy-data';
import { formatPrice } from '@/config/format-price';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GameDetail() {
  const router = useRouter();
  const { gameId } = router.query;
  const [game, setGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameId) {
      // Cari game berdasarkan ID atau slug
      const foundGame = gameData.games.find(
        g => g.id.toLowerCase() === gameId.toLowerCase() || 
             g.name.toLowerCase().replace(/\s+/g, '-') === gameId.toLowerCase()
      );
      
      if (foundGame) {
        setGame(foundGame);
        if (foundGame.products && foundGame.products.length > 0) {
          setActiveCategory(foundGame.products[0].category);
        }
      } else {
        // Redirect ke 404 atau halaman games jika game tidak ditemukan
        router.push('/games');
      }
      
      setLoading(false);
    }
  }, [gameId, router]);

  if (loading) {
    return <div className="max-w-6xl mx-auto py-10 px-4">Loading...</div>;
  }

  if (!game) {
    return <div className="max-w-6xl mx-auto py-10 px-4">Game tidak ditemukan</div>;
  }

  // Fungsi render tags, renderList, dll bisa dipindahkan ke sini...
  // [Salin fungsi-fungsi dari TopUpApp.js]
  

  // Product categories for this game
  const categories = game.products.map(category => ({
    id: category.category,
    name: category.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }));

  return (
    <main className="max-w-6xl mx-auto py-6 px-4">
      <Link href="/" className="mb-4 inline-flex items-center text-blue-600 font-medium">
        ← Back to Games
      </Link>
      
      
      {/* Render game header, products, etc. */}
      {/* [Salin kode yang relevan dari DetailContent di TopUpApp.js] */}
    </main>
  );
}