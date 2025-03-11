// Simulasi data dari database (ganti dengan koneksi database Anda)
export default async function handler(req, res) {
    const categories = [
      { category: "Games", sort: 1 },
      { category: "Voucher", sort: 2 },
      { category: "Pulsa", sort: 3 },
      { category: "Data", sort: 4 },
      { category: "PLN", sort: 5 },
      { category: "E-Money", sort: 6 },
    ];
  
    const gamesData = [
      { id: 1, category: "Games", name: "Mobile Legends", slug: "mobile-legends", image: "http://localhost:3000/images/games/mobile-legends-games.webp", status: "On", sort: 1 },
      { id: 2, category: "Voucher", name: "Google Play", slug: "google-play", image: "", status: "On", sort: 2 },
      // Tambahkan data lain sesuai kebutuhan
    ];
  
    const games = categories.map((cat) => ({
      category: cat.category,
      data: gamesData.filter((game) => game.category === cat.category),
    }));
  
    res.status(200).json(games);
  }