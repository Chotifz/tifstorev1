import { formatPrice } from "@/config/format-price";
import { renderGameCategories, renderPromoBanner, renderTags } from "@/utils/func";

export default function DetailContent  ({selectedGame, setActiveCategory, activeCategory, setShowDetail}) {
    // Get all product categories for this game
    const categories = selectedGame.products.map(category => ({
      id: category.category,
      name: category.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));

    return (
      <div className="p-4">
        <button 
          onClick={() => setShowDetail(false)}
          className="mb-4 flex items-center text-blue-600 font-medium"
        >
          ← Back to Games
        </button>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-6 mb-6 text-white relative overflow-hidden">
          <div className="flex items-center">
            <img 
              src={`/api/placeholder/80/80`}
              alt={selectedGame.name}
              className="h-16 w-16 rounded-full bg-white p-1 shadow-lg mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{selectedGame.name}</h1>
              <p className="opacity-80 text-sm">{selectedGame.description}</p>
              <div className="mt-2 flex flex-wrap">
                {renderGameCategories(selectedGame.categories)}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21,6H3A2,2 0 0,0 1,8V16A2,2 0 0,0 3,18H21A2,2 0 0,0 23,16V8A2,2 0 0,0 21,6M21,16H3V8H21M6,15H8V13H10V11H8V9H6V11H4V13H6M14,15H19V13H14V11H19V9H14A2,2 0 0,0 12,11V13A2,2 0 0,0 14,15Z" />
            </svg>
          </div>
        </div>
        
        {renderPromoBanner(selectedGame)}
        
        <div className="mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                  activeCategory === category.id
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
          {selectedGame.products
            .find(cat => cat.category === activeCategory)?.items
            .map(item => {
              const hasBenefits = item.benefits || item.contents;
              const benefitsList = item.benefits || item.contents;
              
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        {item.duration && (
                          <span className="text-sm text-gray-600 block">{item.duration}</span>
                        )}
                      </div>
                      <img src={`/api/placeholder/40/40`} alt={item.name} className="w-10 h-10" />
                    </div>
                    
                    <div className="mt-2 flex flex-wrap">
                      {renderTags(item.tags)}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    
                    {hasBenefits && renderList(benefitsList)}
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        {item.discount !== "0%" && (
                          <span className="line-through text-gray-400 text-sm mr-2">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                        <span className="font-bold text-lg">{formatPrice(item.price)}</span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };