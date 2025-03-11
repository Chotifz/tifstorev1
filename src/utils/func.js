import { gameData } from '@/config/dummy-data'; 
 
 export const renderTags = (tags) => {
    return tags.map((tag, index) => {
      let bgColor = "bg-gray-200";
      if (tag === "terlaris") bgColor = "bg-yellow-100 text-yellow-800";
      if (tag === "populer") bgColor = "bg-blue-100 text-blue-800";
      if (tag === "hemat") bgColor = "bg-green-100 text-green-800";
      if (tag === "promo") bgColor = "bg-red-100 text-red-800";
      if (tag === "limited") bgColor = "bg-purple-100 text-purple-800";
      if (tag === "best value") bgColor = "bg-teal-100 text-teal-800";
      if (tag === "trending") bgColor = "bg-pink-100 text-pink-800";
      if (tag === "baru") bgColor = "bg-indigo-100 text-indigo-800";
      
      return (
        <span 
          key={index} 
          className={`${bgColor} text-xs px-2 py-1 rounded-full mr-1 mb-1 inline-block`}
        >
          {tag}
        </span>
      );
    });
  };

  // Render benefits or contents list
  export const renderList = (items) => {
    return (
      <ul className="mt-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-start mb-1">
            <span className="text-green-500 mr-2">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Render category badges for game
  export const renderGameCategories = (categories) => {
    return categories.map((category, index) => {
      const categoryInfo = gameData.categories.find(c => c.id === category);
      const name = categoryInfo ? categoryInfo.name : category;
      
      return (
        <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded-full mr-1 mb-1 inline-block">
          {name}
        </span>
      );
    });
  };

  // Render promo banner
 export const renderPromoBanner = (game) => {
    if (game.promos && game.promos.length > 0) {
      const promo = game.promos[0]; // Just display first promo for simplicity
      return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-4 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{promo.name}</h3>
              <p className="text-sm opacity-90">{promo.description}</p>
              <div className="mt-2">
                <span className="bg-white text-indigo-700 text-xs font-bold py-1 px-2 rounded-full">
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

