import { Link } from "react-router-dom";



export default function ContentAbout() {
    return (
        <>
            <main className="main-content">
            <div className="container">
                {/* Page Header */}
                <section className="greeting">
                <h1>About FoodOrder</h1>
                <p>Delivering delicious meals with passion since 2015</p>
                </section>
                {/* Our Story Section */}
                <section className="about-section">
                <div className="about-content">
                    <div className="about-text">
                    <h2>Our Story</h2>
                    <p>Opy’s Kitchen began with a simple dream — to create a cozy place where everyone can enjoy delicious Western dishes and high-quality café drinks without needing to travel far. What started as a small local café quickly became a favorite spot for food lovers who crave the taste of freshly prepared meals made with passion and care. Every dish we serve is crafted to bring warmth, comfort, and satisfaction in every bite.</p>
                    <p>Today, Opy’s Kitchen continues to grow while keeping our love for good food at the heart of everything we do. Whether it’s a juicy burger, creamy pasta, or a perfectly brewed cup of coffee, we aim to make every visit memorable. We believe that great food connects people — and that’s exactly what we’re here for.</p>
                    {/* <div className="stats-grid">
                        <div className="stat-item">
                        <h3>500K+</h3>
                        <p>Meals Delivered</p>
                        </div>
                        <div className="stat-item">
                        <h3>200+</h3>
                        <p>Restaurant Partners</p>
                        </div>
                        <div className="stat-item">
                        <h3>50K+</h3>
                        <p>Happy Customers</p>
                        </div>
                        <div className="stat-item">
                        <h3>15+</h3>
                        <p>Cities Served</p>
                        </div>
                    </div> */}
                    </div>
                    <div className="about-image">
                    <img src="/assets/img/kedai.jpg" alt="Our Restaurant Kitchen" />
                    </div>
                </div>
                </section>
                {/* Our Values Section */}
                <section className="values-section">
                <h2>Our Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                    <i className="fas fa-heart" />
                    <h3>Quality First</h3>
                    <p>We carefully select our restaurant partners and ingredients to ensure every meal meets our high standards.</p>
                    </div>
                    <div className="value-card">
                    <i className="fas fa-bolt" />
                    <h3>Fast Delivery</h3>
                    <p>Our efficient delivery network ensures your food arrives hot and fresh, right when you need it.</p>
                    </div>
                    <div className="value-card">
                    <i className="fas fa-hand-holding-usd" />
                    <h3>Fair Prices</h3>
                    <p>We believe delicious food should be accessible to everyone, with transparent pricing and no hidden fees.</p>
                    </div>
                    <div className="value-card">
                    <i className="fas fa-users" />
                    <h3>Community Focus</h3>
                    <p>We support local businesses and give back to the communities we serve through various initiatives.</p>
                    </div>
                </div>
                </section>
                {/* Team Section */}
                <section className="team-section">
                <h2>Meet Our Team</h2>
                <p>The passionate people behind FoodOrder</p>
                <div className="team-grid">
                    <div className="team-member">
                    <div className="member-photo">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="John Doe" />
                    </div>
                    <h3>John Doe</h3>
                    <p className="position">Founder &amp; CEO</p>
                    <p>With over 15 years in the restaurant industry, John's vision drives our commitment to culinary excellence.</p>
                    </div>
                    <div className="team-member">
                    <div className="member-photo">
                        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Jane Smith" />
                    </div>
                    <h3>Jane Smith</h3>
                    <p className="position">Head of Operations</p>
                    <p>Jane ensures our delivery network runs smoothly, getting your food to you quickly and efficiently.</p>
                    </div>
                    <div className="team-member">
                    <div className="member-photo">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Michael Chen" />
                    </div>
                    <h3>Michael Chen</h3>
                    <p className="position">Head Chef &amp; Culinary Director</p>
                    <p>Michael's expertise in diverse cuisines helps us curate the best menu selections for our customers.</p>
                    </div>
                </div>
                </section>
                {/* CTA Section */}
                <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Order?</h2>
                    <p>Join thousands of satisfied customers enjoying delicious meals delivered to their door.</p>
                    <div className="cta-buttons">
                    <Link to="/menu" className="btn btn-primary2">Browse Menu</Link>
                    
                    <Link to="/offers" className="btn btn-outline">View Offers</Link>
                    </div>
                </div>
                </section>
            </div>
            </main>

        </>
    );
}