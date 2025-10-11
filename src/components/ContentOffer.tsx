import axios from "axios";
import { useEffect, useState } from "react";
import { API_CONFIG } from "../Api-Config";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

interface OfferItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

interface Offer {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  discount_label?: string;
  image?: string;
  features?: string[] | null;
  badge?: string;
  items?: OfferItem[];
}

export default function ContentOffer() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.OFFERS}`
        );
        setOffers(res.data.offers || []);
      } catch (err: any) {
        console.error("Error fetching offers:", err);
        setError("Failed to load offers.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) return <p>Loading offers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="main-content">
      <div className="container">
        {/* Hero Section */}
        <section className="offers-hero">
          <h1>Special Offers & Deals</h1>
          <p>
            Enjoy amazing discounts and exclusive promotions on your favorite
            meals
          </p>
        </section>

        {/* Offers Grid */}
        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              {offer.badge && (
                <div className={`offer-badge ${offer.badge.toLowerCase()}`}>
                  {offer.badge}
                </div>
              )}

              <div className="offer-image">
                {offer.image ? (
                  <img src={offer.image} alt={offer.title} />
                ) : (
                  <i className="fas fa-image" />
                )}
              </div>

              <div className="offer-content">
                <div className="offer-header">
                  <div className="offer-title">
                    <h3>{offer.title}</h3>
                    {offer.subtitle && <p>{offer.subtitle}</p>}
                  </div>
                  {offer.discount_label && (
                    <div className="offer-discount">{offer.discount_label}OFF</div>
                  )}
                </div>

                {offer.description && (
                  <p className="offer-description">{offer.description}</p>
                )}

                {/* Safe check for features */}
                {Array.isArray(offer.features) && offer.features.length > 0 && (
                  <ul className="offer-features">
                    {offer.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check" /> {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Add all offer items to cart */}
                <div className="offer-actions">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      if (Array.isArray(offer.items) && offer.items.length > 0) {
                        offer.items.forEach((item) => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image || "",
                            description: item.description || "",
                            quantity: 1,
                          });
                        });
                        toast.success(`${offer.title} added to cart!`);
                      } else {
                        toast.error("No items in this offer");
                      }
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn-outline"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Check out this amazing offer: ${offer.title} - ${window.location.href}`
                      );
                      const whatsappLink = `https://api.whatsapp.com/send?text=${text}`;
                      window.open(whatsappLink, "_blank");
                    }}
                  >
                    Share on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Deals Section */}
        <section className="daily-deals">
          <h2 className="section-title">Today's Flash Deals</h2>
          <p>
            Limited time offers that change daily - grab them before they're
            gone!
          </p>
          <div className="deals-carousel">
            <div className="deal-card">
              <div className="deal-icon">
                <i className="fas fa-mug-hot" />
              </div>
              <h3>Breakfast Special</h3>
              <p>20% off all breakfast items until 11 AM</p>
              <a href="menu.html" className="btn-primary">
                Order Breakfast
              </a>
            </div>
            <div className="deal-card">
              <div className="deal-icon">
                <i className="fas fa-apple-alt" />
              </div>
              <h3>Healthy Choice</h3>
              <p>15% off salads and healthy meals</p>
              <a href="menu.html" className="btn-primary">
                Choose Healthy
              </a>
            </div>
            <div className="deal-card">
              <div className="deal-icon">
                <i className="fas fa-clock" />
              </div>
              <h3>Late Night Deal</h3>
              <p>Free delivery on orders after 9 PM</p>
              <a href="menu.html" className="btn-primary">
                Order Late
              </a>
            </div>
            <div className="deal-card">
              <div className="deal-icon">
                <i className="fas fa-user-friends" />
              </div>
              <h3>Group Order</h3>
              <p>10% off orders above $50</p>
              <a href="menu.html" className="btn-primary">
                Order Together
              </a>
            </div>
          </div>
        </section>

        {/* Promo Code Section */}
        <section className="promo-section">
          <h2>Exclusive Promo Code</h2>
          <p>Use this special code for an extra discount on your next order</p>
          <div className="promo-code">
            <div className="code">FOODIE25</div>
          </div>
          <p>
            <small>
              Valid for new customers only. Minimum order $30. Expires in 7
              days.
            </small>
          </p>
          <a
            href="menu.html"
            className="btn-primary"
            style={{ background: "white", color: "#667eea" }}
          >
            Use This Code
          </a>
        </section>
      </div>
    </main>
  );
}
