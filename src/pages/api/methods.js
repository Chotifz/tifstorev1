export default async function handler(req, res) {
    const methods = [
      { id: 1, image: "/images/method/bri.png", status: "On" },
      { id: 2, image: "method2.png", status: "On" },
    ];
    res.status(200).json(methods.filter((method) => method.status === "On"));
  }