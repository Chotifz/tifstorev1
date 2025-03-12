import React, { useState, useEffect } from 'react';
import { gameData } from '@/config/dummy-data';

const CarouselPromo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const promos = gameData.globalPromos;

  // Auto-slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }, 5000); // Ganti slide setiap 5 detik
    
    return () => clearInterval(timer);
  }, [promos.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
  };

  // Cek apakah promo berlaku untuk game/kategori tertentu
  const getApplicableText = (promo) => {
    if (promo.applicableGames && promo.applicableGames.length > 0) {
      const gameNames = promo.applicableGames.map(gameId => {
        const game = gameData.games.find(g => g.id === gameId);
        return game ? game.name : '';
      }).filter(Boolean);
      
      return `Berlaku untuk: ${gameNames.join(', ')}`;
    }
    
    if (promo.applicableCategories && promo.applicableCategories.length > 0) {
      const categoryNames = promo.applicableCategories.map(catId => {
        const category = gameData.categories.find(c => c.id === catId);
        return category ? category.name : '';
      }).filter(Boolean);
      
      return `Berlaku untuk kategori: ${categoryNames.join(', ')}`;
    }
    
    return 'Berlaku untuk semua game';
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl shadow-lg mb-8 ">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-out h-96"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promos.map((promo, index) => {
        
          let bgImage = "bg-[url('/images/banner/banner1.png')]";
  
          if (promo.applicableCategories?.includes("baru")) {
            bgImage = "bg-[url('/images/banner/banner2.png')]";
          } else if (promo.paymentMethod) {
            bgImage = "bg-[url('/images/banner/banner3.png')]";
          }
          
          // Check if promo is active based on date
          const now = new Date();
          const startDate = new Date(promo.startDate);
          const endDate = new Date(promo.endDate);
          const isActive = now >= startDate && now <= endDate;
          
          return (
            <div 
      key={promo.id} 
      className={`w-full flex-shrink-0 ${bgImage} bg-cover bg-center p-6 text-white relative overflow-hidden`}
    >
      {/* Layer overlay untuk memastikan teks tetap terbaca */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{promo.name}</h3>
              <p className="text-base opacity-90 mt-2">{promo.description}</p>
              <p className="text-sm opacity-80 mt-4">{getApplicableText(promo)}</p>
            </div>
            
            <div className="bg-white text-center rounded-full p-3 shadow-lg">
              <span className="font-bold text-xl text-blue-700">
                {promo.discount}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="bg-white/20 py-1 px-3 rounded-full text-sm backdrop-blur-sm">
            {isActive ? 'Sedang Berlangsung' : 'Akan Datang'}
          </div>
          
          <div className="text-sm font-medium bg-white/20 py-1 px-3 rounded-full backdrop-blur-sm">
            Berakhir: {new Date(promo.endDate).toLocaleDateString('id-ID')}
          </div>
        </div>
      </div>
    </div>
          );
        })}
      </div>
      
      {/* Navigation arrows */}
      <button 
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg text-white" 
        onClick={prevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg text-white" 
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselPromo;