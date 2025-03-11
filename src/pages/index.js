import { gameData } from '@/config/dummy-data';
import { formatPrice } from '@/config/format-price';
import React, { useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/utils/slug';
import { renderGameCategories, renderPromoBanner, renderTags } from '@/utils/func';
import DetailContent from '@/components/DetailContent';

export function TopUpApp (){
  const [showDetail, setShowDetail] = useState(false);
  const [activeCategory, setActiveCategory] = useState('diamonds');
  const [selectedGame, setSelectedGame] = useState(null);
  
  const handleSelectGame = (game) => {
    setSelectedGame(game);
    
    // Set default active category based on first product category
    if (game.products && game.products.length > 0) {
      setActiveCategory(game.products[0].category);
    }
    
    setShowDetail(true);
  };

  // Homepage content
  const HomeContent = () => {
    // Get all category filters
    const allCategories = gameData.categories.map(cat => ({
      id: cat.id,
      name: cat.name
    }));
    
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
    
    // Filter games based on selected category
    const filteredGames = selectedCategoryFilter === 'all' 
      ? gameData.games 
      : gameData.games.filter(game => game.categories.includes(selectedCategoryFilter));
    
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">GAMES</h1>
        
        {/* {renderGlobalPromoBanner()} */}
        
        <div className="mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                selectedCategoryFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            
            {allCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryFilter(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                  selectedCategoryFilter === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map(game => (
            <div 
              key={game.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => handleSelectGame(game)}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24 flex items-center justify-center">
                <img 
                  src={`/api/placeholder/80/80`}
                  alt={game.name}
                  className="h-16 w-16 rounded-full bg-white p-1 shadow-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold">{game.name}</h2>
                <p className="text-sm text-gray-600">{game.description}</p>
                <p className="text-xs text-gray-500 mt-2">Developer: {game.developer}</p>
                
                <div className="mt-2 flex flex-wrap">
                  {renderGameCategories(game.categories)}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {game.products.reduce((total, category) => total + category.items.length, 0)} top-up options
                  </span>
                  <button className="text-blue-600 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-6xl mx-auto py-6">
      {showDetail && selectedGame ? <DetailContent selectedGame={selectedGame} setActiveCategory={setActiveCategory} activeCategory={activeCategory} setShowDetail={setShowDetail}/> : <HomeContent />}
    </main>
  );
};





export  default  function TopUpAppp () {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  // Filter games based on selected category
  const filteredGames = selectedCategoryFilter === 'all' 
    ? gameData.games 
    : gameData.games.filter(game => game.categories.includes(selectedCategoryFilter));
  
  // Get all category filters
   const allCategories = gameData.categories.map(cat => ({
      id: cat.id,
      name: cat.name
  }));
    
  // Function to get URL slug from game
  
  const getGameSlug = (game) => {
    return slugify(game.name);
  };

  
    // Render global promo banner if applicable
  const renderGlobalPromoBanner = () => {
    if (gameData.globalPromos && gameData.globalPromos.length > 0) {
      const promo = gameData.globalPromos[0]; // Just display first promo for simplicity
      return (
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg p-4 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{promo.name}</h3>
              <p className="text-sm opacity-90">{promo.description}</p>
              <div className="mt-2">
                <span className="bg-white text-emerald-700 text-xs font-bold py-1 px-2 rounded-full">
                  {promo.discount}
                </span>
              </div>
            </div>
            <div className="text-sm">
              Berakhir: {new Date(promo.endDate).toLocaleDateString('id-ID')}
            </div>
          </div>
        </div>
      );
    }
    return null;
 
  };
  return (
    <main className="max-w-7xl mx-auto">
    <div className="">
      <h1 className="text-xl font-bold mb-4">GAMES</h1>

       {renderGlobalPromoBanner()}

{/* Kategori filter */}
       <div className="mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                selectedCategoryFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            
            {allCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryFilter(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                  selectedCategoryFilter === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      
      
      
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 ">
        {filteredGames.map(game => (
          <Link 
            href={`/games/${getGameSlug(game)}`} 
            key={game.id}
          >
            <div className="bg-slate-100 rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 h-56 sm:h-64 lg:h-72 flex flex-col justify-between">
              {/* Isi game card */}
              <div className=" flex items-center justify-center relative ">
                <img 
                  src={game.icon}
                  alt={game.name}
                  className="h-full w-full object-cover  bg-white p-0.5 shadow-lg rounded-xl"
                />
              </div>
              <div className="px-3 py-4 flex flex-col gap-2">
                <p className="text-xs text-gray-600">{game.developer}</p>
                <h2 className="text-sm md:text-base font-semibold">{game.name}</h2>
             
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </main>
  );
};

