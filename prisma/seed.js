import { PrismaClient } from "@prisma/client";
import { gameData } from "../src/config/dummy-data.js";

const prisma = new PrismaClient();

function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

async function main() {
  console.log('Start seeding...');
  
  // First clean up existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.product.deleteMany();
  await prisma.game.deleteMany();
  await prisma.category.deleteMany();
  
  // Create categories
  const categoryMap = {};
  const allCategoryIds = [];
  
  for (const category of gameData.categories) {
    try {
      const createdCategory = await prisma.category.create({
        data: {
          id: category.id,
          name: category.name,
          slug: slugify(category.name),
          description: category.description,
          icon: category.icon || null,
        },
      });
      categoryMap[category.id] = createdCategory.id;
      allCategoryIds.push(category.id);
      console.log(`Created category: ${createdCategory.name}`);
    } catch (error) {
      console.error(`Failed to create category ${category.name}: ${error.message}`);
    }
  }
  
  // Create games with their products
  for (const game of gameData.games) {
    try {
      // Filter out categories that don't exist in the database
      const validCategories = game.categories.filter(catId => allCategoryIds.includes(catId));
      
      if (validCategories.length === 0) {
        // If no valid categories, add at least one default category
        console.log(`Warning: No valid categories found for game ${game.name}, using "populer" as default`);
        if (allCategoryIds.includes('populer')) {
          validCategories.push('populer');
        } else if (allCategoryIds.length > 0) {
          validCategories.push(allCategoryIds[0]);
        }
      }
      
      console.log(`Creating game ${game.name} with categories: ${validCategories.join(', ')}`);
      
      // Create the game with the valid categories
      const createdGame = await prisma.game.create({
        data: {
          id: game.id,
          name: game.name,
          slug: slugify(game.name),
          icon: game.icon,
          banner: game.banner || null,
          description: game.description || null,
          developer: game.developer || null,
          categories: {
            connect: validCategories.map(catId => ({
              id: catId
            }))
          }
        },
      });
      console.log(`Created game: ${createdGame.name}`);
      
      // Create products for this game
      if (game.products && game.products.length > 0) {
        for (const productCategory of game.products) {
          if (productCategory.items && productCategory.items.length > 0) {
            for (const item of productCategory.items) {
              try {
                await prisma.product.create({
                  data: {
                    id: item.id,
                    name: item.name,
                    slug: slugify(item.name),
                    price: item.price,
                    originalPrice: item.originalPrice || item.price,
                    discount: item.discount || "0%",
                    description: item.description || null,
                    icon: item.icon || null,
                    tags: item.tags || [],
                    gameId: createdGame.id,
                    category: productCategory.category,
                    duration: item.duration || null,
                    benefits: item.benefits || [],
                  },
                });
              } catch (error) {
                console.error(`Failed to create product ${item.name}: ${error.message}`);
              }
            }
          }
        }
        console.log(`Created products for: ${createdGame.name}`);
      }
      
      // Create promos for this game
      if (game.promos && game.promos.length > 0) {
        for (const promo of game.promos) {
          try {
            await prisma.promo.create({
              data: {
                id: promo.id,
                name: promo.name,
                description: promo.description,
                startDate: new Date(promo.startDate),
                endDate: new Date(promo.endDate),
                discount: promo.discount,
                banner: promo.banner || null,
                applicableProducts: promo.applicableProducts || [],
                gameId: createdGame.id,
              },
            });
          } catch (error) {
            console.error(`Failed to create promo ${promo.name}: ${error.message}`);
          }
        }
        console.log(`Created promos for: ${createdGame.name}`);
      }
    } catch (error) {
      console.error(`Failed to create game ${game.name}: ${error.message}`);
    }
  }
  
  // Create global promos
  if (gameData.globalPromos && gameData.globalPromos.length > 0) {
    for (const globalPromo of gameData.globalPromos) {
      try {
        await prisma.promo.create({
          data: {
            id: globalPromo.id,
            name: globalPromo.name,
            description: globalPromo.description,
            startDate: new Date(globalPromo.startDate),
            endDate: new Date(globalPromo.endDate),
            discount: globalPromo.discount,
            banner: globalPromo.banner || null,
            paymentMethod: globalPromo.paymentMethod || null,
            applicableGames: globalPromo.applicableGames || [],
            applicableCategories: globalPromo.applicableCategories || [],
            isGlobal: true,
          },
        });
      } catch (error) {
        console.error(`Failed to create global promo ${globalPromo.name}: ${error.message}`);
      }
    }
    console.log(`Created global promos`);
  }
  
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });