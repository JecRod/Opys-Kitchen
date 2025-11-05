import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_CONFIG } from "../Api-Config";

interface Hall {
  id: number;
  name: string;
  description: string;
  capacity: number;
  size: string;
  facilities: string[];
  price_per_day: string;
  image: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface Feedback {
  id: number;
  name: string;
  email: string;
  item_id: number;
  rating: number;
  comment: string;
  created_at: string;
  item_name?: string;
}

export default function Content() {
  const [selectedOption, setSelectedOption] = useState<string>(
    localStorage.getItem("orderType") || "delivery"
  );

  const handleSelect = (option: "delivery" | "dine-in") => {
    setSelectedOption(option);
    localStorage.setItem("checkout_method", option);
  };

  const [halls, setHalls] = useState<Hall[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loadingHalls, setLoadingHalls] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch Halls
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HALLS}`);
        setHalls(res.data.data || []);
      } catch (err: any) {
        setError("Failed to load halls.");
        console.error(err);
      } finally {
        setLoadingHalls(false);
      }
    };
    fetchHalls();
  }, []);

  // ✅ Fetch Feedback
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`${API_CONFIG.BASE_URL}/feedback`);
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setFeedbacks(data);
      } catch (err: any) {
        console.error("❌ Failed to fetch feedback:", err);
      } finally {
        setLoadingFeedbacks(false);
      }
    };
    fetchFeedbacks();
  }, []);

  // ✅ Helper: show stars for rating
 

  return (
    <>
      <main className="main-content">
        <div className="container">
          {/* Greeting Section */}
          <section className="greeting">
            <h2>Good Evening, EveryOne!</h2>
            <p>What would you like to order today?</p>
          </section>
        </div>

        {/* Promotion Banner */}
        <section className="promo">
          <img
            src="https://img.freepik.com/free-psd/food-menu-restaurant-facebook-cover-banner-template_120329-4875.jpg?semt=ais_incoming&w=740&q=80"
            alt="Promo Banner"
          />
          <button className="find-out">Find Out More</button>
        </section>

        {/* Delivery & Pickup */}
        <section className="options-compact">
          <div
            className={`compact-option ${selectedOption === "delivery" ? "active" : ""}`}
            onClick={() => handleSelect("delivery")}
          >
            <div className="compact-icon">
              <i className="fas fa-motorcycle" />
            </div>
            <div className="compact-text">
              <span className="compact-title">Delivery</span>
              <span className="compact-details">30-45 min</span>
            </div>
          </div>

          <div
            className={`compact-option ${selectedOption === "dine-in" ? "active" : ""}`}
            onClick={() => handleSelect("dine-in")}
          >
            <div className="compact-icon">
              <i className="fas fa-store" />
            </div>
            <div className="compact-text">
              <span className="compact-title">Dine-in</span>
              <span className="compact-details">15-20 min</span>
            </div>
          </div>
        </section>

        {/* Promotional Offer Section */}
        <section className="promo-offer-section">
          <div className="promo-content">
            <div className="promo-text">
              <h2>🔥 Limited Time Offer!</h2>
              <h3>
                Get <span>50% OFF</span> Your First Order 🍕
              </h3>
              <p>
                Enjoy delicious meals delivered to your door with unbeatable
                discounts. Hurry — this offer is valid for a limited time only!
              </p>
              <Link to="/offers" className="promo-btn">
                Order Now
              </Link>
            </div>
            <div className="promo-image">
              <img
                src="https://ecentral.my/wp-content/uploads/2022/06/menu-texas-chicken-scaled.jpg"
                alt="Special Offer"
              />
            </div>
          </div>
        </section>

        {/* Available Halls Section */}
        <section id="hall-section" className="hall-section">
          <div className="container">
            <h2 className="section-title">Available Halls</h2>
            <p className="subtitle">Perfect Venues for Your Special Occasions</p>

            <div className="halls-grid">
              {loadingHalls ? (
                <p>Loading halls...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : halls.length === 0 ? (
                <p>No halls available at the moment.</p>
              ) : (
                halls.map((hall) => (
                  <div
                    key={hall.id}
                    className={`hall-card ${hall.is_available ? "available" : "unavailable"}`}
                  >
                    <div className="hall-image">
                      <img
                        src={hall.image || "https://via.placeholder.com/600x400?text=No+Image"}
                        alt={hall.name}
                      />
                      <div
                        className={`availability-badge ${
                          hall.is_available ? "available" : "unavailable"
                        }`}
                      >
                        {hall.is_available ? "Available" : "Booked"}
                      </div>
                    </div>

                    <div className="hall-info">
                      <h3>{hall.name}</h3>
                      <p className="hall-description">{hall.description}</p>

                      <div className="hall-meta">
                        <span className="capacity">
                          <i className="fas fa-users" /> Capacity: {hall.capacity}
                        </span>
                        <span className="size">
                          <i className="fas fa-expand" /> Size: {hall.size} sqft
                        </span>
                      </div>

                      <div className="hall-features">
                        {hall.facilities?.length ? (
                          hall.facilities.map((f, i) => (
                            <span key={i}>
                              <i className="fas fa-check" /> {f}
                            </span>
                          ))
                        ) : (
                          <span>No facilities listed</span>
                        )}
                      </div>

                      <div className="hall-pricing">
                        <div className="price">
                          RM {parseFloat(hall.price_per_day).toFixed(2)} <span>/day</span>
                        </div>
                      </div>

                      <div className="hall-actions">
                        <Link to="/hall" className="view-details-btn">
                          View Details
                        </Link>
                        <Link to="/hall" className="check-availability-btn">
                          Check Availability
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>


        {/* ✅ Feedback Section */}
      {/* ✅ Feedback Section */}
        <section className="comments-section">
          <div className="comments-header">
            <h2>Customer Reviews</h2>
            <p>See what our customers are saying about their experience</p>
          </div>

          {/* ⭐ Stats Section */}
          <div className="comments-stats">
            <div className="stat-card">
              <span className="stat-number">4.8</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{feedbacks.length}</span>
              <span className="stat-label">Total Reviews</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">96%</span>
              <span className="stat-label">Recommended</span>
            </div>
          </div>

          {loadingFeedbacks ? (
            <p style={{ textAlign: "center" }}>Loading feedback...</p>
          ) : feedbacks.length === 0 ? (
            <p style={{ textAlign: "center" }}>No feedback yet. Be the first to leave one!</p>
          ) : (
            <div className="comments-container">
              <div className="comments-list">
                <h3 style={{ marginBottom: 25, color: "#333" }}>Recent Reviews</h3>

                {/* ✅ Show only the latest 5 feedbacks */}
                {feedbacks
                  .slice() // make a copy
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // newest first
                  .slice(0, 5)
                  .map((fb) => (
                    <div className="comment-item" key={fb.id}>
                      <div className="comment-header">
                        <div className="comment-user">
                          <div className="user-avatar">
                            {fb.name?.slice(0, 2).toUpperCase() || "??"}
                          </div>
                          <div className="user-info">
                            <h4>{fb.name}</h4>
                            <div className="comment-date">
                              {new Date(fb.created_at).toLocaleDateString()} • Item #{fb.item_id}
                            </div>
                          </div>
                        </div>
                        <div className="comment-rating">
                          {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                        </div>
                      </div>

                      <div className="comment-content">{fb.comment}</div>

                      <div className="comment-actions">
                        <button className="action-btn">
                          <i className="fas fa-thumbs-up"></i> Helpful
                        </button>
                        <button className="action-btn">
                          <i className="fas fa-reply"></i> Reply
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/feedback" className="feedback-btn">
              ✨ Leave Your Feedback
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
