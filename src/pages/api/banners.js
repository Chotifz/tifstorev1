export default async function handler(req, res) {
    const banners = [
      { id: 1, image: "banner1.jpg" },
      { id: 2, image: "banner2.jpg" },
    ];
    res.status(200).json(banners);
  }