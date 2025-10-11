import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function Content() {

    const [selectedOption, setSelectedOption] = useState<string>(
        localStorage.getItem("orderType") || "delivery"
    );

    const handleSelect = (option: "delivery" | "dine-in") => {
    setSelectedOption(option);
    localStorage.setItem("checkout_method", option); // ✅ Save to localStorage
    };


    return (
        <>
            <main className="main-content">
            <div className="container">
                {/* Greeting Section */}
                <section className="greeting">
                <h2>Good Evening, Wan Iqbal!</h2>
                <p>What would you like to order today?</p>
                </section>
            </div>
            {/* Promotion Banner */}
            <section className="promo">
                <img src="https://img.freepik.com/free-psd/food-menu-restaurant-facebook-cover-banner-template_120329-4875.jpg?semt=ais_incoming&w=740&q=80" alt="Promo Banner" />
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


           


           {/* Categories Section - Redesigned */}
{/* <section className="home-section categories-section">
  <h1 className="section-title">Popular Categories</h1>
  <p className="subtitle">Discover our most loved meals</p>

  <div className="categories-grid">
    <div className="category-card">
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
          alt="Burgers & Sandwiches"
        />
      </div>
      <div className="category-content">
        <h3>Best Burgers & Sandwiches</h3>
        <p>142 Items • 2.1K Orders</p>
        <Link to="/menu" className="category-btn">View Menu</Link>
      </div>
    </div>

    <div className="category-card">
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1601924582975-7aa6e3eebd8c?auto=format&fit=crop&w=600&q=80"
          alt="Premium Pizza Selection"
        />
      </div>
      <div className="category-content">
        <h3>Premium Pizza Selection</h3>
        <p>89 Items • 9.1K Orders</p>
        <Link to="/menu" className="category-btn">View Menu</Link>
      </div>
    </div>

    <div className="category-card">
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1572441710534-68036e3ae4d7?auto=format&fit=crop&w=600&q=80"
          alt="Healthy & Fresh Salads"
        />
      </div>
      <div className="category-content">
        <h3>Healthy & Fresh Salads</h3>
        <p>56 Items • 4.2K Orders</p>
        <Link to="/menu" className="category-btn">View Menu</Link>
      </div>
    </div>
  </div>
</section> */}


             {/* Promotional Offer Section */}
            <section className="promo-offer-section">
            <div className="promo-content">
                <div className="promo-text">
                <h2>🔥 Limited Time Offer!</h2>
                <h3>Get <span>50% OFF</span> Your First Order 🍕</h3>
                <p>
                    Enjoy delicious meals delivered to your door with unbeatable discounts.
                    Hurry — this offer is valid for a limited time only!
                </p>
                <Link to="/offers" className="promo-btn">Order Now</Link>
                </div>
                <div className="promo-image">
                <img 
                    src="https://ecentral.my/wp-content/uploads/2022/06/menu-texas-chicken-scaled.jpg" 
                    alt="Special Offer" 
                />
                </div>
            </div>
            </section>


            {/* <!-- Available Halls Section --> */}
            <section id="hall-section" className="hall-section">
            <div className="container">
                <h2 className="section-title">Available Halls</h2>
                <p className="subtitle">Perfect Venues for Your Special Occasions</p>
                {/* Available Halls Grid */}
                <div className="halls-grid">
                {/* Hall 1 */}
                <div className="hall-card available" data-capacity="large" data-type="banquet">
                    <div className="hall-image">
                    <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Grand Ballroom" />
                    <div className="availability-badge available">Available</div>
                    <div className="quick-view">Quick View</div>
                    </div>
                    <div className="hall-info">
                    <h3>Grand Ballroom</h3>
                    <div className="hall-meta">
                        <span className="capacity"><i className="fas fa-users" /> Up to 300 guests</span>
                        <span className="type"><i className="fas fa-building" /> Banquet Hall</span>
                    </div>
                    <div className="hall-features">
                        <span><i className="fas fa-wifi" /> WiFi</span>
                        <span><i className="fas fa-tv" /> AV System</span>
                        <span><i className="fas fa-utensils" /> Catering</span>
                    </div>
                    <div className="hall-pricing">
                        <div className="price">$899<span>/event</span></div>
                        <div className="time-slot">6 hours included</div>
                    </div>
                    <div className="next-available">
                        <i className="fas fa-calendar-check" />
                        Next available: Tomorrow
                    </div>
                    <div className="hall-actions">
                        <Link to="/hall" className="view-details-btn">View Details</Link>
                        <Link to="/hall" className="check-availability-btn">Check Availability</Link>

                    </div>
                    </div>
                </div>
                {/* Hall 2 */}
                <div className="hall-card available" data-capacity="medium" data-type="conference">
                    
                    <div className="hall-image">
                    <img src="https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Executive Conference Room" />
                    <div className="availability-badge available">Available</div>
                    <div className="quick-view">Quick View</div>
                    </div>
                    <div className="hall-info">
                    <h3>Executive Conference Room</h3>
                    <div className="hall-meta">
                        <span className="capacity"><i className="fas fa-users" /> Up to 80 guests</span>
                        <span className="type"><i className="fas fa-building" /> Conference Room</span>
                    </div>
                    <div className="hall-features">
                        <span><i className="fas fa-wifi" /> WiFi</span>
                        <span><i className="fas fa-tv" /> AV System</span>
                        <span><i className="fas fa-coffee" /> Refreshments</span>
                    </div>
                    <div className="hall-pricing">
                        <div className="price">$499<span>/day</span></div>
                        <div className="time-slot">8 hours included</div>
                    </div>
                    <div className="next-available">
                        <i className="fas fa-calendar-check" />
                        Next available: Today
                    </div>
                    <div className="hall-actions">
                        <Link to="/hall" className="view-details-btn">View Details</Link>
                        <Link to="/hall" className="check-availability-btn">Check Availability</Link>
                    </div>
                    </div>
                </div>
  
                </div>
                {/* Quick View Modal */}
                <div id="quickViewModal" className="modal">
                <div className="modal-content">
                    <span className="close">×</span>
                    <div className="modal-body">
                    {/* Content will be loaded dynamically */}
                    </div>
                </div>
                </div>
            </div>
            </section>

            
            {/* Comments/Feedback Section */}
            <section className="comments-section">
                <div className="comments-header">
                <h2>Customer Reviews</h2>
                <p>See what our customers are saying about their experience</p>
                </div>
                <div className="comments-stats">
                <div className="stat-card">
                    <span className="stat-number">4.8</span>
                    <span className="stat-label">Average Rating</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">1.2K</span>
                    <span className="stat-label">Total Reviews</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">96%</span>
                    <span className="stat-label">Recommended</span>
                </div>
                </div>
                <div className="comments-container">
                {/* Comments List */}
                <div className="comments-list">
                    <h3 style={{marginBottom: 25, color: '#333'}}>Recent Reviews</h3>
                    {/* Comment 1 */}
                    <div className="comment-item">
                    <div className="comment-header">
                        <div className="comment-user">
                        <div className="user-avatar">JS</div>
                        <div className="user-info">
                            <h4>John Smith</h4>
                            <div className="comment-date">2 days ago • Burger Order</div>
                        </div>
                        </div>
                        <div className="comment-rating">★★★★★</div>
                    </div>
                    <div className="comment-content">
                        Amazing food! The burger was juicy and perfectly cooked. Delivery was faster than expected and the packaging kept everything hot. Will definitely order again!
                    </div>
                    <div className="comment-actions">
                        <button className="action-btn">
                        <i className="fas fa-thumbs-up" /> Helpful (24)
                        </button>
                        <button className="action-btn">
                        <i className="fas fa-reply" /> Reply
                        </button>
                    </div>
                    </div>
                    {/* Comment 2 */}
                    <div className="comment-item">
                    <div className="comment-header">
                        <div className="comment-user">
                        <div className="user-avatar">SD</div>
                        <div className="user-info">
                            <h4>Sarah Davis</h4>
                            <div className="comment-date">1 week ago • Pizza Order</div>
                        </div>
                        </div>
                        <div className="comment-rating">★★★★☆</div>
                    </div>
                    <div className="comment-content">
                        Great pizza with fresh ingredients. The crust was perfectly crispy. Only reason for 4 stars is that the delivery took a bit longer than estimated, but the food was worth the wait.
                    </div>
                    <div className="comment-actions">
                        <button className="action-btn">
                        <i className="fas fa-thumbs-up" /> Helpful (18)
                        </button>
                        <button className="action-btn">
                        <i className="fas fa-reply" /> Reply
                        </button>
                    </div>
                    </div>
                    {/* Comment 3 */}
                    <div className="comment-item">
                    <div className="comment-header">
                        <div className="comment-user">
                        <div className="user-avatar">MJ</div>
                        <div className="user-info">
                            <h4>Mike Johnson</h4>
                            <div className="comment-date">3 weeks ago • Pasta Order</div>
                        </div>
                        </div>
                        <div className="comment-rating">★★★★★</div>
                    </div>
                    <div className="comment-content">
                        Best pasta I've had delivered! The creamy sauce was rich and flavorful, portion size was generous. The driver was very polite and professional. Highly recommended!
                    </div>
                    <div className="comment-actions">
                        <button className="action-btn">
                        <i className="fas fa-thumbs-up" /> Helpful (32)
                        </button>
                        <button className="action-btn">
                        <i className="fas fa-reply" /> Reply
                        </button>
                    </div>
                    </div>
                    {/* Comment 4 */}
                    <div className="comment-item">
                    <div className="comment-header">
                        <div className="comment-user">
                        <div className="user-avatar">EP</div>
                        <div className="user-info">
                            <h4>Emily Parker</h4>
                            <div className="comment-date">1 month ago • Breakfast Order</div>
                        </div>
                        </div>
                        <div className="comment-rating">★★★★★</div>
                    </div>
                    <div className="comment-content">
                        Ordered pancakes for breakfast and they were absolutely delicious! Fluffy, light, and the maple syrup was perfect. Great way to start the day. Will be ordering regularly!
                    </div>
                    <div className="comment-actions">
                        <button className="action-btn">
                        <i className="fas fa-thumbs-up" /> Helpful (15)
                        </button>
                        <button className="action-btn">
                        <i className="fas fa-reply" /> Reply
                        </button>
                    </div>
                    </div>
                    <div className="load-more">
                    <button className="load-more-btn">Load More Reviews</button>
                    </div>
                </div>
                </div>
            </section>
            
            </main>

        </>
    );
}