import { useState } from "react";
import Link from "next/link";

export default function CategoryTabs({ games }) {
  const [activeTab, setActiveTab] = useState(games[0]?.category.toLowerCase().replace(/\s+/g, "-") || "");

  return (
    <div className="container">
      <ul className="nav nav-pills tab-category" id="pills-tab" role="tablist">
        {games.map((game, index) => (
          <li key={index} className="nav-item col text-center mt-md-0" style={{ padding: 0 }}>
            <a
              className={`nav-link ${activeTab === game.category.toLowerCase().replace(/\s+/g, "-") ? "active" : ""}`}
              onClick={() => setActiveTab(game.category.toLowerCase().replace(/\s+/g, "-"))}
              href={`#pills-${game.category.toLowerCase().replace(/\s+/g, "-")}`}
              role="tab"
            >
              <i className={`fa fa-${index === 0 ? "gamepad" : index === 1 ? "ticket" : index === 2 ? "phone" : index === 3 ? "mobile" : index === 4 ? "flash" : "money"} mb-2`} style={{ fontSize: "25px" }}></i>
              <br />
              {game.category}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="pills-tabContent">
        {games.map((game, index) => (
          <div
            key={index}
            className={`tab-pane fade ${activeTab === game.category.toLowerCase().replace(/\s+/g, "-") ? "show active" : ""}`}
            id={`pills-${game.category.toLowerCase().replace(/\s+/g, "-")}`}
            role="tabpanel"
          >
            <div className="row mb-4">
              <div className="col-12">
                <h5>{game.category}</h5>
                <span className="strip-primary"></span>
              </div>
            </div>
            <div className="row game">
              {game.games.map((item) => (
                item.status === "On" && (
                  <div key={item.id} className="col-sm-3 col-lg-2 col-4 text-center" style={{ display: "grid" }}>
                    <div className="card mb-3 phy-card">
                      <Link href={`/games/${item.slug}`} className="product_list">
                        <div style={{ padding: "0.85rem 1.30rem" }} className="card-game">
                          <img src={`/assets/images/games/${item.image}`} className="img-fluid phy-img" style={{ borderRadius: "10px", display: "block" }} />
                        </div>
                        <div className="card-title phy-card-title">{item.games}</div>
                      </Link>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}