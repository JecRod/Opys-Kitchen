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

  const calculateOfferPrice = (offer: Offer) => {
    if (!offer.items || offer.items.length === 0) return 0;

    // 1) Sum all item prices
    const totalPrice = offer.items.reduce((sum, item) => sum + item.price, 0);

    // 2) If discount_label exists (ex: "20%")
    if (offer.discount_label && offer.discount_label.includes("%")) {
      const discount = parseFloat(offer.discount_label.replace("%", "")); // 20
      const discountAmount = (totalPrice * discount) / 100;
      return totalPrice - discountAmount;
    }

    // No discount → return total price
    return totalPrice;
  };


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
                    <div className="offer-discount">{offer.discount_label} OFF</div>
                  )}
                </div>

                {offer.description && (
                  <p className="offer-description">{offer.description}</p>
                )}

                {/* Features */}
                {Array.isArray(offer.features) && offer.features.length > 0 && (
                  <ul className="offer-features">
                    {offer.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check" /> {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* ✅ Offer Item Details */}
                {Array.isArray(offer.items) && offer.items.length > 0 && (
                  <div className="offer-items">
                    <h4>Items Included</h4>
                    <ul className="offer-item-list">
                      {offer.items.map((item, index) => (
                        <li key={index}>
                          {item.name} — RM {item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="offer-actions">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      if (!offer.items || offer.items.length === 0) {
                        toast.error("No items in this offer");
                        return;
                      }

                      const finalPrice = calculateOfferPrice(offer);

                      addToCart({
                        id: 100000 + offer.id, // ✅ unique id for offer
                        name: offer.title,
                        price: finalPrice,
                        image: offer.image || "",
                        description: offer.description || "",
                        quantity: 1,
                      });

                      toast.success(`${offer.title} added to cart (RM ${finalPrice.toFixed(2)})`);
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

        
      </div>
    </main>
  );
}
