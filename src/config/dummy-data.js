export const gameData = {
  "games": [
    {
      "id": "ML01",
      "name": "Mobile Legends",
      "icon": "ml_icon.png",
      "icon": "/images/games/mobile-legends-games.webp",
      "banner": "/images/games/mobile-legends-games.webp",
      "developer": "Moonton",
      "categories": ["populer", "moba", "rekomendasi"],
      "products": [
        {
          "category": "diamonds",
          "items": [
            {
              "id": "ML-DM-01",
              "name": "86 Diamonds",
              "price": 19000,
              "originalPrice": 20000,
              "discount": "5%",
              "tags": ["terlaris", "hemat", "promo"],
              "description": "86 Diamonds Mobile Legends",
              "icon": "diamond_icon.png"
            },
            {
              "id": "ML-DM-02",
              "name": "172 Diamonds",
              "price": 38000,
              "originalPrice": 40000,
              "discount": "5%",
              "tags": ["terlaris", "hemat"],
              "description": "172 Diamonds Mobile Legends",
              "icon": "diamond_icon.png"
            },
            {
              "id": "ML-DM-03",
              "name": "257 Diamonds",
              "price": 56000,
              "originalPrice": 60000,
              "discount": "6.7%",
              "tags": ["populer"],
              "description": "257 Diamonds Mobile Legends",
              "icon": "diamond_icon.png"
            },
            {
              "id": "ML-DM-04",
              "name": "344 Diamonds",
              "price": 75000,
              "originalPrice": 80000,
              "discount": "6.25%",
              "tags": ["populer"],
              "description": "344 Diamonds Mobile Legends",
              "icon": "diamond_icon.png"
            }
          ]
        },
        {
          "category": "monthly_membership",
          "items": [
            {
              "id": "ML-SL-01",
              "name": "Starlight Member",
              "price": 149000,
              "originalPrice": 149000,
              "discount": "0%",
              "tags": ["membership", "monthly", "limited"],
              "description": "Starlight Member Mobile Legends (30 hari). Dapatkan skin eksklusif dan bonus 5 tiket draw.",
              "icon": "starlight_icon.png",
              "duration": "30 hari",
              "benefits": [
                "1 Skin Starlight Exclusive",
                "5 Tiket Draw Premium Skin",
                "+10% BP dari setiap match",
                "Avatar Border Eksklusif",
                "Akses chat khusus Starlight"
              ]
            },
            // other monthly items...
          ]
        },
        // other product categories...
      ],
      "promos": [
        {
          "id": "PROMO-ML-01",
          "name": "Twilight Festival",
          "description": "Diskon 20% untuk semua produk Twilight Pass",
          "startDate": "2025-03-01T00:00:00",
          "endDate": "2025-03-07T23:59:59",
          "discount": "20%",
          "banner": "twilight_festival_banner.jpg",
          "applicableProducts": ["ML-TW-01", "ML-TW-WK-01", "ML-BDL-03"]
        }
      ]
    },
    {
      "id": "PUBG01",
      "name": "PUBG Mobile",
     "icon": "/images/games/pubg-mobile-games.webp",
      "banner": "/images/games/pubg-mobile-games.webp",
      "description": "PUBG Mobile adalah game battle royale terpopuler di dunia",
      "developer": "Tencent Games",
      "categories": ["populer", "battle-royale", "rekomendasi"],
      "products": [
        {
          "category": "uc",
          "items": [
            {
              "id": "PUBG-UC-01",
              "name": "60 UC",
              "price": 15000,
              "originalPrice": 16000,
              "discount": "6.25%",
              "tags": ["terlaris", "hemat"],
              "description": "60 Unknown Cash untuk PUBG Mobile",
              "icon": "uc_icon.png"
            },
            {
              "id": "PUBG-UC-02",
              "name": "325 UC",
              "price": 79000,
              "originalPrice": 85000,
              "discount": "7.1%",
              "tags": ["populer", "hemat"],
              "description": "325 Unknown Cash untuk PUBG Mobile",
              "icon": "uc_icon.png"
            },
            {
              "id": "PUBG-UC-03",
              "name": "660 UC",
              "price": 159000,
              "originalPrice": 170000,
              "discount": "6.5%",
              "tags": ["populer"],
              "description": "660 Unknown Cash untuk PUBG Mobile",
              "icon": "uc_icon.png"
            }
          ]
        },
        {
          "category": "royale_pass",
          "items": [
            {
              "id": "PUBG-RP-01",
              "name": "Royale Pass",
              "price": 149000,
              "originalPrice": 149000,
              "discount": "0%",
              "tags": ["pass", "limited"],
              "description": "Royale Pass PUBG Mobile untuk 1 season",
              "icon": "royalepass_icon.png",
              "duration": "1 season",
              "benefits": [
                "Akses Elite Royale Pass Missions",
                "Reward skin Elite tiap level",
                "Emotes & Outfits eksklusif",
                "600 UC balik setiap season"
              ]
            }
          ]
        }
      ],
      "promos": []
    },
    {
      "id": "GENSHIN01",
      "name": "Genshin Impact",
    "icon": "/images/games/genshin-impact-games.webp",
      "banner": "/images/games/genshin-impact-games.webp",
      "description": "Game open-world RPG dengan visual memukau",
      "developer": "miHoYo",
      "categories": ["populer", "rpg", "premium"],
      "products": [
        {
          "category": "crystals",
          "items": [
            {
              "id": "GI-CR-01",
              "name": "60 Genesis Crystals",
              "price": 16000,
              "originalPrice": 16000,
              "discount": "0%",
              "tags": ["starter"],
              "description": "60 Genesis Crystals untuk Genshin Impact",
              "icon": "genesis_icon.png"
            },
            {
              "id": "GI-CR-02",
              "name": "300+30 Genesis Crystals",
              "price": 79000,
              "originalPrice": 80000,
              "discount": "1.25%",
              "tags": ["populer", "bonus"],
              "description": "300 Genesis Crystals + 30 bonus untuk Genshin Impact",
              "icon": "genesis_icon.png"
            },
            {
              "id": "GI-CR-03",
              "name": "980+110 Genesis Crystals",
              "price": 249000,
              "originalPrice": 260000,
              "discount": "4.2%",
              "tags": ["populer", "bonus", "best value"],
              "description": "980 Genesis Crystals + 110 bonus untuk Genshin Impact",
              "icon": "genesis_icon.png"
            }
          ]
        },
        {
          "category": "blessing",
          "items": [
            {
              "id": "GI-BL-01",
              "name": "Blessing of the Welkin Moon",
              "price": 75000,
              "originalPrice": 75000,
              "discount": "0%",
              "tags": ["monthly", "best value", "populer"],
              "description": "Dapatkan 300 Genesis Crystals langsung dan 90 Primogems setiap hari selama 30 hari",
              "icon": "welkin_icon.png",
              "duration": "30 hari",
              "benefits": [
                "300 Genesis Crystals saat pembelian",
                "90 Primogems per hari selama 30 hari",
                "Total 3000 Primogems dalam 30 hari"
              ]
            }
          ]
        }
      ],
      "promos": []
    },
    {
      "id": "HOK01",
      "name": "Honor of Kings",
     "icon": "/images/games/honor-of-kings.webp",
      "banner": "/images/games/honor-of-kings.webp",
      "description": "Game MOBA terpopuler dari Tencent Games",
      "developer": "Tencent Games",
      "categories": ["baru", "moba", "trending"],
      "products": [
        {
          "category": "vouchers",
          "items": [
            {
              "id": "HOK-VC-01",
              "name": "60 Vouchers",
              "price": 18000,
              "originalPrice": 20000,
              "discount": "10%",
              "tags": ["promo", "hemat"],
              "description": "60 Vouchers untuk Honor of Kings",
              "icon": "hok_voucher_icon.png"
            },
            {
              "id": "HOK-VC-02",
              "name": "300 Vouchers",
              "price": 89000,
              "originalPrice": 95000,
              "discount": "6.3%",
              "tags": ["populer", "hemat"],
              "description": "300 Vouchers untuk Honor of Kings",
              "icon": "hok_voucher_icon.png"
            }
          ]
        }
      ],
      "promos": [
        {
          "id": "PROMO-HOK-01",
          "name": "Launch Festival",
          "description": "Diskon 10% untuk semua pembelian Vouchers Honor of Kings",
          "startDate": "2025-03-01T00:00:00",
          "endDate": "2025-04-01T23:59:59",
          "discount": "10%",
          "banner": "hok_launch_banner.jpg",
          "applicableProducts": ["HOK-VC-01", "HOK-VC-02"]
        }
      ]
    },
    {
      "id": "FF01",
      "name": "Free Fire",
      "icon": "/images/games/free-fire.webp",
      "banner": "/images/games/free-fire.webp",
      "description": "Battle royale populer yang ringan dan seru",
      "developer": "Garena",
      "categories": ["populer", "battle-royale"],
      "products": [
        {
          "category": "diamonds",
          "items": [
            {
              "id": "FF-DM-01",
              "name": "100 Diamonds",
              "price": 15000,
              "originalPrice": 16000,
              "discount": "6.25%",
              "tags": ["terlaris", "hemat"],
              "description": "100 Diamonds untuk Free Fire",
              "icon": "ff_diamond_icon.png"
            },
            {
              "id": "FF-DM-02",
              "name": "310 Diamonds",
              "price": 45000,
              "originalPrice": 48000,
              "discount": "6.25%",
              "tags": ["populer", "hemat"],
              "description": "310 Diamonds untuk Free Fire",
              "icon": "ff_diamond_icon.png"
            },
            {
              "id": "FF-DM-03",
              "name": "520 Diamonds",
              "price": 75000,
              "originalPrice": 80000,
              "discount": "6.25%",
              "tags": ["populer"],
              "description": "520 Diamonds untuk Free Fire",
              "icon": "ff_diamond_icon.png"
            }
          ]
        },
        {
          "category": "membership",
          "items": [
            {
              "id": "FF-MM-01",
              "name": "Membership Mingguan",
              "price": 29000,
              "originalPrice": 30000,
              "discount": "3.3%",
              "tags": ["weekly", "member"],
              "description": "Membership mingguan Free Fire",
              "icon": "ff_membership_icon.png",
              "duration": "7 hari",
              "benefits": [
                "10 Diamonds per hari",
                "1 loot crate per hari",
                "Diskon 5% item di toko"
              ]
            }
          ]
        }
      ],
      "promos": []
    },
    {
      "id": "AOV01",
      "name": "Arena of Valor",
      "icon": "/images/games/arena-of-valor-games.webp",
      "banner": "/images/games/arena-of-valor-games.webp",
      "description": "Game MOBA 5v5 dengan grafik premium dan hero legendaris",
      "developer": "Tencent Games / TiMi Studios",
      "categories": ["moba", "premium"],
      "products": [
        {
          "category": "vouchers",
          "items": [
            {
              "id": "AOV-VC-01",
              "name": "100 Vouchers",
              "price": 20000,
              "originalPrice": 22000,
              "discount": "9.1%",
              "tags": ["terlaris", "hemat"],
              "description": "100 Vouchers untuk Arena of Valor",
              "icon": "aov_voucher_icon.png"
            },
            {
              "id": "AOV-VC-02",
              "name": "300 Vouchers",
              "price": 59000,
              "originalPrice": 65000,
              "discount": "9.2%",
              "tags": ["populer", "hemat"],
              "description": "300 Vouchers untuk Arena of Valor",
              "icon": "aov_voucher_icon.png"
            },
            {
              "id": "AOV-VC-03",
              "name": "500 Vouchers",
              "price": 98000,
              "originalPrice": 105000,
              "discount": "6.7%",
              "tags": ["populer"],
              "description": "500 Vouchers untuk Arena of Valor",
              "icon": "aov_voucher_icon.png"
            },
            {
              "id": "AOV-VC-04",
              "name": "1200 Vouchers",
              "price": 240000,
              "originalPrice": 250000,
              "discount": "4%",
              "tags": ["best value"],
              "description": "1200 Vouchers untuk Arena of Valor",
              "icon": "aov_voucher_icon.png"
            }
          ]
        },
        {
          "category": "membership",
          "items": [
            {
              "id": "AOV-MM-01",
              "name": "Valor Pass",
              "price": 119000,
              "originalPrice": 129000,
              "discount": "7.8%",
              "tags": ["monthly", "membership", "promo"],
              "description": "Valor Pass untuk 1 season (30 hari)",
              "icon": "aov_pass_icon.png",
              "duration": "30 hari",
              "benefits": [
                "Skin eksklusif Valor Pass",
                "Bonus 200 Vouchers",
                "Akses ke misi eksklusif",
                "Emblem spesial Valor Pass",
                "Bonus gold setiap match"
              ]
            }
          ]
        }
      ],
      "promos": [
        {
          "id": "PROMO-AOV-01",
          "name": "Top Up Bonus",
          "description": "Bonus 10% untuk pembelian voucher pertama",
          "startDate": "2025-03-01T00:00:00",
          "endDate": "2025-03-31T23:59:59",
          "discount": "10%",
          "banner": "aov_bonus_banner.jpg",
          "applicableProducts": ["AOV-VC-01", "AOV-VC-02", "AOV-VC-03", "AOV-VC-04"]
        }
      ]
    },
    
    {
      "id": "CODM01",
      "name": "Call of Duty Mobile",
      "icon": "/images/games/call-of-duty-mobile-games.webp",
      "banner": "/images/games/call-of-duty-mobile-games.webp",
      "description": "Game FPS terbaik dengan pengalaman Call of Duty di perangkat mobile",
      "developer": "Activision / TiMi Studios",
      "categories": ["fps", "battle-royale", "premium"],
      "products": [
        {
          "category": "cp",
          "items": [
            {
              "id": "CODM-CP-01",
              "name": "80 CP",
              "price": 15000,
              "originalPrice": 15000,
              "discount": "0%",
              "tags": ["terlaris"],
              "description": "80 CP (Call of Duty Points) untuk CODM",
              "icon": "codm_cp_icon.png"
            },
            {
              "id": "CODM-CP-02",
              "name": "400 CP",
              "price": 73000,
              "originalPrice": 75000,
              "discount": "2.7%",
              "tags": ["populer", "hemat"],
              "description": "400 CP (Call of Duty Points) untuk CODM",
              "icon": "codm_cp_icon.png"
            },
            {
              "id": "CODM-CP-03",
              "name": "800 CP",
              "price": 145000,
              "originalPrice": 150000,
              "discount": "3.3%",
              "tags": ["populer"],
              "description": "800 CP (Call of Duty Points) untuk CODM",
              "icon": "codm_cp_icon.png"
            },
            {
              "id": "CODM-CP-04",
              "name": "2000 CP",
              "price": 355000,
              "originalPrice": 375000,
              "discount": "5.3%",
              "tags": ["best value"],
              "description": "2000 CP (Call of Duty Points) untuk CODM",
              "icon": "codm_cp_icon.png"
            }
          ]
        },
        {
          "category": "battle_pass",
          "items": [
            {
              "id": "CODM-BP-01",
              "name": "Battle Pass",
              "price": 129000,
              "originalPrice": 149000,
              "discount": "13.4%",
              "tags": ["pass", "seasonal", "populer"],
              "description": "Battle Pass untuk season berjalan",
              "icon": "codm_bp_icon.png",
              "duration": "1 season",
              "benefits": [
                "50 tier rewards termasuk skin senjata",
                "4 epic character skins",
                "CP rebate hingga 300 CP",
                "Weapon blueprint eksklusif",
                "Emotes dan spray baru"
              ]
            },
            {
              "id": "CODM-BP-02",
              "name": "Battle Pass Plus",
              "price": 259000,
              "originalPrice": 280000,
              "discount": "7.5%",
              "tags": ["pass", "seasonal", "premium"],
              "description": "Battle Pass Premium dengan 13 tier langsung terbuka",
              "icon": "codm_bp_plus_icon.png",
              "duration": "1 season",
              "benefits": [
                "Semua benefit Battle Pass standard",
                "+13 tier terbuka langsung",
                "Ekslusif avatar frame",
                "Ekslusif calling card"
              ]
            }
          ]
        }
      ],
      "promos": [
        {
          "id": "PROMO-CODM-01",
          "name": "Season Launch",
          "description": "Diskon Battle Pass awal season",
          "startDate": "2025-03-10T00:00:00",
          "endDate": "2025-03-20T23:59:59",
          "discount": "13%",
          "banner": "codm_season_banner.jpg",
          "applicableProducts": ["CODM-BP-01", "CODM-BP-02"]
        }
      ]
    },
    
    {
      "id": "MCGG01",
      "name": "Magic Chess GoGo",
      "icon": "/images/games/magic-chess.png",
      "banner": "/images/games/magic-chess.png",
      "description": "Game auto-battler yang seru dan mudah dimainkan",
      "developer": "ByteDance Games",
      "categories": [ "baru"],
      "products": [
        {
          "category": "gems",
          "items": [
            {
              "id": "MCGG-GEM-01",
              "name": "120 Gems",
              "price": 15000,
              "originalPrice": 18000,
              "discount": "16.7%",
              "tags": ["terlaris", "hemat", "promo"],
              "description": "120 Gems untuk Magic Chess GoGo",
              "icon": "mcgg_gem_icon.png"
            },
            {
              "id": "MCGG-GEM-02",
              "name": "310 Gems",
              "price": 35000,
              "originalPrice": 40000,
              "discount": "12.5%",
              "tags": ["populer", "hemat"],
              "description": "310 Gems untuk Magic Chess GoGo",
              "icon": "mcgg_gem_icon.png"
            },
            {
              "id": "MCGG-GEM-03",
              "name": "520 Gems",
              "price": 58000,
              "originalPrice": 65000,
              "discount": "10.8%",
              "tags": ["populer"],
              "description": "520 Gems untuk Magic Chess GoGo",
              "icon": "mcgg_gem_icon.png"
            },
            {
              "id": "MCGG-GEM-04",
              "name": "1060 Gems",
              "price": 115000,
              "originalPrice": 130000,
              "discount": "11.5%",
              "tags": ["best value"],
              "description": "1060 Gems untuk Magic Chess GoGo",
              "icon": "mcgg_gem_icon.png"
            }
          ]
        },
        {
          "category": "packs",
          "items": [
            {
              "id": "MCGG-PK-01",
              "name": "Starter Pack",
              "price": 25000,
              "originalPrice": 50000,
              "discount": "50%",
              "tags": ["limited", "bundle", "hemat"],
              "description": "Pack untuk pemain baru, hanya bisa dibeli 1x",
              "icon": "mcgg_starter_icon.png",
              "contents": [
                "300 Gems",
                "3 Epic Hero Shards",
                "1 Random Epic Chess Piece",
                "7-day VIP status",
                "Exclusive avatar frame"
              ]
            },
            {
              "id": "MCGG-PK-02",
              "name": "Chess Master Pass",
              "price": 79000,
              "originalPrice": 89000,
              "discount": "11.2%",
              "tags": ["pass", "monthly", "populer"],
              "description": "Pass bulanan dengan rewards harian",
              "icon": "mcgg_pass_icon.png",
              "duration": "30 hari",
              "benefits": [
                "30 Gems setiap hari (total 900)",
                "1 Advanced Chest setiap minggu",
                "10% bonus EXP di semua match",
                "Exclusive board skin",
                "Premium Matchmaking"
              ]
            }
          ]
        }
      ],
      "promos": [
        {
          "id": "PROMO-MCGG-01",
          "name": "Grand Launch",
          "description": "Diskon spesial untuk peluncuran game",
          "startDate": "2025-03-01T00:00:00",
          "endDate": "2025-04-01T23:59:59",
          "discount": "20%",
          "banner": "mcgg_launch_banner.jpg",
          "applicableProducts": ["MCGG-GEM-01", "MCGG-GEM-02", "MCGG-GEM-03", "MCGG-GEM-04", "MCGG-PK-02"]
        }
      ]
    }
  ],
  "categories": [
    {
      "id": "populer",
      "name": "Populer",
      "description": "Game populer yang banyak dimainkan",
      "icon": "popular_category_icon.png"
    },
    {
      "id": "baru",
      "name": "Baru Rilis",
      "description": "Game yang baru saja dirilis",
      "icon": "new_category_icon.png"
    },
    {
      "id": "moba",
      "name": "MOBA",
      "description": "Game dengan genre Multiplayer Online Battle Arena",
      "icon": "moba_category_icon.png"
    },
    {
      "id": "battle-royale",
      "name": "Battle Royale",
      "description": "Game battle royale yang menantang",
      "icon": "br_category_icon.png"
    },
    {
      "id": "rpg",
      "name": "RPG",
      "description": "Game role-playing dengan cerita mendalam",
      "icon": "rpg_category_icon.png"
    },
  
  ],
  "globalPromos": [
    {
      "id": "GLOBAL-PROMO-01",
      "name": "Cashback 10%",
      "description": "Cashback 10% untuk semua pembelian menggunakan DANA",
      "startDate": "2025-03-01T00:00:00",
      "endDate": "2025-03-15T23:59:59",
      "discount": "10%",
      "paymentMethod": "DANA",
      "banner": "dana_cashback_banner.jpg",
      "applicableGames": ["ML01", "PUBG01", "GENSHIN01", "HOK01", "FF01"]
    },
    {
      "id": "GLOBAL-PROMO-02",
      "name": "Diskon Akhir Bulan",
      "description": "Diskon 15% untuk game kategori populer",
      "startDate": "2025-03-25T00:00:00",
      "endDate": "2025-03-31T23:59:59",
      "discount": "15%",
      "banner": "end_month_promo_banner.jpg",
      "applicableCategories": ["populer"]
    },
    {
      "id": "GLOBAL-PROMO-03",
      "name": "New Games Festival",
      "description": "Diskon 15% untuk semua game kategori baru",
      "startDate": "2025-03-05T00:00:00",
      "endDate": "2025-03-20T23:59:59",
      "discount": "15%",
      "banner": "new_games_festival_banner.jpg",
      "applicableCategories": ["baru"]
    }
  ]
};

