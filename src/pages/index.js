import { gameData } from '@/config/dummy-data';
import React, { useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import CarouselPromo from '@/components/CarouselPromo';
import { motion } from 'framer-motion';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from 'next-auth/react';

export default function HomePage() {
     const { data: session, status } = useSession();

     console.log( status )
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  const filteredGames = selectedCategoryFilter === 'all' 
    ? gameData.games 
    : gameData.games.filter(game => game.categories.includes(selectedCategoryFilter));
  
  const allCategories = gameData.categories.map(cat => ({
    id: cat.id,
    name: cat.name
  }));
    
  // Function to get URL slug from game
  const getGameSlug = (game) => {
    return slugify(game.name);
  };

  // Animation variants for staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Carousel */}
      <section className="mb-10">
        <CarouselPromo />
      </section>
      
      {/* Games Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">GAMES</h2>
          <Link 
            href="/games" 
            className="text-sm font-medium text-primary hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        {/* Category filter */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Tabs 
            value={selectedCategoryFilter} 
            onValueChange={setSelectedCategoryFilter}
            className="w-full"
          >
            <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
              <TabsTrigger 
                value="all" 
                className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Semua
              </TabsTrigger>
              
              {allCategories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      
        {/* Games Grid */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredGames.map(game => (
            <motion.div key={game.id} variants={item}>
              <Link href={`/games/${getGameSlug(game)}`}>
                <Card className="overflow-hidden h-full border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-md bg-card hover:-translate-y-1">
                  <div className="aspect-square relative overflow-hidden bg-background">
                    <img 
                      src={game.icon}
                      alt={game.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Category badges - show only first category */}
                    {game.categories && game.categories.length > 0 && (
                      <div className="absolute top-2 left-2">
                        <Badge 
                          variant="secondary" 
                          className="text-[10px] font-medium px-2 py-0 bg-secondary/80 backdrop-blur-sm"
                        >
                          {allCategories.find(cat => cat.id === game.categories[0])?.name || game.categories[0]}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3 space-y-1">
                    <p className="text-[0.65rem] sm:text-xs text-muted-foreground line-clamp-1">{game.developer}</p>
                    <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 leading-tight">{game.name}</h3>
                
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Popular Categories Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Kategori Populer</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allCategories.slice(0, 4).map(category => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <div className="relative h-32 rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40 group-hover:from-primary/90 group-hover:to-primary/50 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Recent Transactions Section */}
      <section className="mt-16 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Transaksi Terakhir</h2>
          <Link 
            href="/transactions" 
            className="text-sm font-medium text-primary hover:underline"
          >
            Lihat Semua
          </Link>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="rounded-full bg-muted-foreground/10 p-3 inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Belum Ada Transaksi</h3>
            <p className="text-muted-foreground mb-6">Ayo mulai top up game favoritmu sekarang!</p>
            <Link href="/games">
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Mulai Top Up
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}