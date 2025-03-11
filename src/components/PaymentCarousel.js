import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

export default function PaymentCarousel({ methods }) {
  const options = {
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1000,
    responsive: {
      0: { items: 3 },
      600: { items: 3 },
      1000: { items: 6 },
    },
  };

  return (
    <div className="container text-center pt-3 py-3">
      <h2 style={{ color: "#ffffff" }}>Metode Pembayaran</h2>
      <OwlCarousel className="owl-carousel metode-top owl-theme" {...options}>
        {methods.map((method) => (
          <div key={method.id} className="item">
            <div className="metode">
              <img src={`/assets/images/method/${method.image}`} alt="" />
            </div>
          </div>
        ))}
      </OwlCarousel>
      <OwlCarousel className="owl-carousel metode-bottom owl-theme mb-4 owl-rtl" {...options} rtl={true}>
        {methods.map((method) => (
          <div key={method.id} className="item">
            <div className="metode">
              <img src={`/assets/images/method/${method.image}`} alt="" height="50px" width="50px" />
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}