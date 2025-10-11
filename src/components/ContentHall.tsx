


export default function ContentHall() {
    return (
        <>

        <section className="hero-hall">
  <div className="container-hall">
    <h1>Book Your Perfect Event Space</h1>
    <p>Find and reserve the ideal hall for your wedding, conference, or special occasion with our easy booking system.</p>
  </div>
</section>


            <main className="container-hall">
  <div className="main-content-hall">
    {/* Booking form-hall */}
    <div className="booking-form-hall-container-hall">
      <h2 className="form-hall-title">Book a Hall</h2>
      <form id="booking-form-hall">
        <div className="form-hall-group-hall">
          <label htmlFor="full-name">Full Name *</label>
          <input type="text" id="full-name" placeholder="Enter your full name" required />
        </div>
        <div className="form-hall-row">
          <div className="form-hall-group-hall">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" placeholder="your@email.com" required />
          </div>
          <div className="form-hall-group-hall">
            <label htmlFor="phone">Phone Number *</label>
            <input type="tel" id="phone" placeholder="+1 (555) 123-4567" required />
          </div>
        </div>
        <div className="form-hall-group-hall">
          <label htmlFor="event-type">Event Type *</label>
          <select id="event-type" required>
            <option >Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="conference">Conference</option>
            <option value="birthday">Birthday Party</option>
            <option value="corporate">Corporate Event</option>
            <option value="seminar">Seminar</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-hall-row">
          <div className="form-hall-group-hall">
            <label htmlFor="event-date">Event Date *</label>
            <input type="date" id="event-date" required />
          </div>
          <div className="form-hall-group-hall">
            <label htmlFor="guests">Number of Guests *</label>
            <input type="number" id="guests" min={10} max={500} placeholder="e.g., 100" required />
          </div>
        </div>
        <div className="form-hall-group-hall">
          <label htmlFor="hall-selection">Select Hall *</label>
          <select id="hall-selection" required>
            <option >Choose a hall</option>
            <option value="grand-ballroom">Grand Ballroom</option>
            <option value="conference-center">Conference Center</option>
            <option value="garden-pavilion">Garden Pavilion</option>
            <option value="executive-suite">Executive Suite</option>
          </select>
        </div>
        <div className="form-hall-group-hall">
          <label htmlFor="special-requests">Special Requests</label>
          <textarea id="special-requests" rows={4} placeholder="Any special requirements or requests..." defaultValue={""} />
        </div>
        <div className="form-hall-actions">
          <button type="submit" className="btn btn-primary">Book Now</button>
          <button type="reset" className="btn btn-outline">Clear form-hall</button>
        </div>
      </form>
    </div>
    {/* Hall Details */}
    <div className="hall-details">
      <div className="hall-card">
        <div className="hall-image" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=form-hallat&fit=crop&w=800&q=80")'}} />
        <div className="hall-content">
          <h3 className="hall-title">Grand Ballroom</h3>
          <p>Elegant space perfect for weddings, galas, and form-hallal events with capacity for up to 300 guests.</p>
          <div className="hall-feature-halls">
            <div className="feature-hall">
              <i className="fas fa-users" />
              <span>Up to 300 guests</span>
            </div>
            <div className="feature-hall">
              <i className="fas fa-ruler-combined" />
              <span>4,500 sq. ft.</span>
            </div>
            <div className="feature-hall">
              <i className="fas fa-parking" />
              <span>Valet parking</span>
            </div>
          </div>
          <div className="hall-price">$1,200 / day</div>
        </div>
      </div>
      <div className="hall-card">
        <div className="hall-image" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=form-hallat&fit=crop&w=800&q=80")'}} />
        <div className="hall-content">
          <h3 className="hall-title">Conference Center</h3>
          <p>Modern space equipped with state-of-the-art technology for business meetings and seminars.</p>
          <div className="hall-feature-halls">
            <div className="feature-hall">
              <i className="fas fa-users" />
              <span>Up to 150 guests</span>
            </div>
            <div className="feature-hall">
              <i className="fas fa-tv" />
              <span>AV equipment included</span>
            </div>
            <div className="feature-hall">
              <i className="fas fa-wifi" />
              <span>High-speed WiFi</span>
            </div>
          </div>
          <div className="hall-price">$800 / day</div>
        </div>
      </div>
    </div>
  </div>
  {/* feature-halls Section */}
  <section className="feature-halls-section">
    <h2 className="section-title">Why Choose Our Halls</h2>
    <div className="feature-halls-grid">
      <div className="feature-hall-card">
        <div className="feature-hall-icon">
          <i className="fas fa-calendar-check" />
        </div>
        <h3>Easy Booking</h3>
        <p>Simple online reservation system with instant confirmation.</p>
      </div>
      <div className="feature-hall-card">
        <div className="feature-hall-icon">
          <i className="fas fa-concierge-bell" />
        </div>
        <h3>Full Service</h3>
        <p>Catering, decoration, and technical support available.</p>
      </div>
      <div className="feature-hall-card">
        <div className="feature-hall-icon">
          <i className="fas fa-dollar-sign" />
        </div>
        <h3>Competitive Pricing</h3>
        <p>Affordable rates with no hidden fees.</p>
      </div>
      <div className="feature-hall-card">
        <div className="feature-hall-icon">
          <i className="fas fa-shield-alt" />
        </div>
        <h3>Insurance Included</h3>
        <p>All bookings include event insurance coverage.</p>
      </div>
    </div>
  </section>
</main>


        </>
    );
}