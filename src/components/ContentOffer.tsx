


export default function ContentOffer() {
    return (
        <>
            <main className="main-content">
            <div className="container">
                {/* Offers Hero Section */}
                <section className="offers-hero">
                <h1>Special Offers &amp; Deals</h1>
                <p>Enjoy amazing discounts and exclusive promotions on your favorite meals</p>
                </section>
                {/* Main Offers Grid */}
                <div className="offers-grid">
                {/* Offer 1 */}
                <div className="offer-card">
                    <div className="offer-badge offer-hot">HOT DEAL</div>
                    <div className="offer-image">
                    <img src="https://berjayatimessquarekl.com/storage/2024/02/LunchSet_SocMed_Mall-01-scaled.jpg" alt="Family Feast Bundle" />

                    </div>
                    <div className="offer-content">
                    <div className="offer-header">
                        <div className="offer-title">
                        <h3>Family Feast Bundle</h3>
                        <p>Perfect for family dinners</p>
                        </div>
                        <div className="offer-discount">40% OFF</div>
                    </div>
                    <p className="offer-description">Get a complete family meal with pizza, pasta, garlic bread, and drinks at an unbeatable price!</p>
                    <ul className="offer-features">
                        <li><i className="fas fa-check" /> 2 Large Pizzas</li>
                        <li><i className="fas fa-check" /> 1 Pasta of Choice</li>
                        <li><i className="fas fa-check" /> Garlic Bread &amp; Dip</li>
                        <li><i className="fas fa-check" /> 4 Soft Drinks</li>
                    </ul>
                    <div className="offer-timer">
                        <div className="timer-text">Limited Time Offer</div>
                        <div className="timer-display" id="timer1">24:00:00</div>
                    </div>
                    <div className="offer-actions">
                        <a href="menu.html" className="btn-primary">Order Now</a>
                        <button className="btn-outline">Share Deal</button>
                    </div>
                    </div>
                </div>
                {/* Offer 2 */}
                <div className="offer-card">
                    <div className="offer-badge offer-new">NEW</div>
                    <div className="offer-image">
                    <img src="https://ecentral.my/wp-content/uploads/2022/06/menu-texas-chicken-scaled.jpg" alt="Family Feast Bundle" />
                    </div>
                    <div className="offer-content">
                    <div className="offer-header">
                        <div className="offer-title">
                        <h3>Burger Bonanza</h3>
                        <p>Buy 2 Get 1 Free</p>
                        </div>
                        <div className="offer-discount">33% OFF</div>
                    </div>
                    <p className="offer-description">Craving burgers? Get three premium burgers for the price of two! Mix and match your favorites.</p>
                    <ul className="offer-features">
                        <li><i className="fas fa-check" /> Any 3 Premium Burgers</li>
                        <li><i className="fas fa-check" /> Free Extra Toppings</li>
                        <li><i className="fas fa-check" /> Choice of Side</li>
                        <li><i className="fas fa-check" /> Free Delivery</li>
                    </ul>
                    <div className="offer-timer">
                        <div className="timer-text">Limited Time Offer</div>
                        <div className="timer-display" id="timer1">24:00:00</div>
                    </div>
                    <div className="offer-actions">
                        <a href="menu.html" className="btn-primary">Grab This Deal</a>
                        <button className="btn-outline">Save Offer</button>
                    </div>
                    </div>
                </div>
                {/* Offer 3 */}
                <div className="offer-card">
                    <div className="offer-badge offer-limited">LIMITED</div>
                    <div className="offer-image">
                    <i className="fas fa-birthday-cake" />
                    </div>
                    <div className="offer-content">
                    <div className="offer-header">
                        <div className="offer-title">
                        <h3>Weekend Special</h3>
                        <p>Saturday &amp; Sunday Only</p>
                        </div>
                        <div className="offer-discount">25% OFF</div>
                    </div>
                    <p className="offer-description">Make your weekends special with 25% off on all desserts and sweet treats. Perfect for family time!</p>
                    <ul className="offer-features">
                        <li><i className="fas fa-check" /> All Desserts Included</li>
                        <li><i className="fas fa-check" /> Ice Cream Sundaes</li>
                        <li><i className="fas fa-check" /> Cakes &amp; Pastries</li>
                        <li><i className="fas fa-check" /> Special Weekend Menu</li>
                    </ul>
                    <div className="offer-timer">
                        <div className="timer-text">Weekend Exclusive</div>
                        <div className="timer-display">Sat-Sun Only</div>
                    </div>
                    <div className="offer-actions">
                        <a href="menu.html" className="btn-primary">View Desserts</a>
                        <button className="btn-outline">Set Reminder</button>
                    </div>
                    </div>
                </div>
                </div>
                {/* Daily Deals Section */}
                <section className="daily-deals">
                <h2 className="section-title">Today's Flash Deals</h2>
                <p>Limited time offers that change daily - grab them before they're gone!</p>
                <div className="deals-carousel">
                    <div className="deal-card">
                    <div className="deal-icon">
                        <i className="fas fa-mug-hot" />
                    </div>
                    <h3>Breakfast Special</h3>
                    <p>20% off all breakfast items until 11 AM</p>
                    <a href="menu.html" className="btn-primary">Order Breakfast</a>
                    </div>
                    <div className="deal-card">
                    <div className="deal-icon">
                        <i className="fas fa-apple-alt" />
                    </div>
                    <h3>Healthy Choice</h3>
                    <p>15% off salads and healthy meals</p>
                    <a href="menu.html" className="btn-primary">Choose Healthy</a>
                    </div>
                    <div className="deal-card">
                    <div className="deal-icon">
                        <i className="fas fa-clock" />
                    </div>
                    <h3>Late Night Deal</h3>
                    <p>Free delivery on orders after 9 PM</p>
                    <a href="menu.html" className="btn-primary">Order Late</a>
                    </div>
                    <div className="deal-card">
                    <div className="deal-icon">
                        <i className="fas fa-user-friends" />
                    </div>
                    <h3>Group Order</h3>
                    <p>10% off orders above $50</p>
                    <a href="menu.html" className="btn-primary">Order Together</a>
                    </div>
                </div>
                </section>
                {/* Promo Code Section */}
                <section className="promo-section">
                <h2>Exclusive Promo Code</h2>
                <p>Use this special code for an extra discount on your next order</p>
                <div className="promo-code">
                    <div className="code">FOODIE25</div>
                    {/* <div className="description">Get 25% off on your first order above $30</div> */}
                </div>
                <p><small>Valid for new customers only. Minimum order $30. Expires in 7 days.</small></p>
                <a href="menu.html" className="btn-primary" style={{background: 'white', color: '#667eea'}}>Use This Code</a>
                </section>
                {/* Subscription Offer */}
                {/* <section className="subscription-offer">
                <h2>FoodOrder Premium</h2>
                <p>Subscribe and save with our premium membership</p>
                <div className="subscription-features">
                    <div className="feature-item">
                    <i className="fas fa-shipping-fast" />
                    <h4>Free Delivery</h4>
                    <p>Unlimited free delivery on all orders</p>
                    </div>
                    <div className="feature-item">
                    <i className="fas fa-gift" />
                    <h4>Exclusive Offers</h4>
                    <p>Member-only deals and early access</p>
                    </div>
                    <div className="feature-item">
                    <i className="fas fa-crown" />
                    <h4>Priority Support</h4>
                    <p>Dedicated customer service line</p>
                    </div>
                    <div className="feature-item">
                    <i className="fas fa-star" />
                    <h4>Bonus Points</h4>
                    <p>Extra loyalty points on every order</p>
                    </div>
                </div>
                <div style={{marginTop: 30}}>
                    <h3 style={{marginBottom: 10}}>Only $9.99/month</h3>
                    <a href="#" className="btn-primary" style={{background: 'white', color: '#f5576c'}}>Subscribe Now</a>
                </div>
                </section> */}
            </div>
            </main>

        </>
    );
}