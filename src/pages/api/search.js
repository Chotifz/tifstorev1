export default async function handler(req, res) {
    const { search } = req.body;
    const gamesData = [
      { id: 1, games: "Mobile Legends", slug: "mobile-legends", image: "ml.jpg", status: "On" },
      { id: 2, games: "Google Play", slug: "google-play", image: "google.jpg", status: "On" },
    ];
  
    const filteredGames = gamesData.filter((game) =>
      game.games.toLowerCase().includes(search.toLowerCase())
    );
  
    res.status(200).json([{ category: "Pencarian", games: filteredGames }]);
  }