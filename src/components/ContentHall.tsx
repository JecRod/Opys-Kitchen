import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { API_CONFIG } from "../Api-Config";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

interface Hall {
  id: number;
  name: string;
  description: string;
  image: string;
  capacity: number;
  size: string;
  facilities: string[];
  price_per_day: string;
  is_available: boolean;
}

export default function ContentHall() {
  const { clearCart } = useCart();
  
  const [halls, setHalls] = useState<Hall[]>([]);
  const [filteredHalls, setFilteredHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    hallSelection: "",
    specialRequests: "",
  });

  // Fetch halls on component mount
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HALLS}`);
        const allHalls = res.data.data || [];
        setHalls(allHalls);
        setFilteredHalls(allHalls); // Initially show all halls
      } catch (err: any) {
        console.error("Error fetching halls:", err);
        setError("Failed to load halls.");
      } finally {
        setLoading(false);
      }
    };
    fetchHalls();
  }, []);

  // Filter halls by selected date
  const filterByDate = async (selectedDate: string) => {
    if (!selectedDate) {
      setFilteredHalls(halls); // If no date, show all halls
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HALLS}/available`, {
        params: { date: selectedDate }
      });
      const availableHalls = res.data.data || [];
      setFilteredHalls(availableHalls);
      if (availableHalls.length === 0) {
        toast.error("No halls available for the selected date.");
      } else {
        toast.success(`${availableHalls.length} hall(s) available on ${selectedDate}`);
      }
    } catch (err: any) {
      console.error("Error checking availability:", err);
      toast.error("Failed to check hall availability.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes and filter halls by date
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "eventDate") {
      filterByDate(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.hallSelection) {
      toast.error("Please select a hall!");
      return;
    }

    const selectedHall = filteredHalls.find(hall => hall.id === parseInt(formData.hallSelection));
    if (!selectedHall) {
      toast.error("Invalid hall selected!");
      return;
    }

    const total = parseFloat(selectedHall.price_per_day);
    const deposit = total * 0.4;  // 40% deposit

    const orderPayload = {
      customer_name: formData.fullName,
      customer_email: formData.email,
      customer_phone: formData.phone,
      status: "pending",
      order_type: "hall",
      hall_id: selectedHall.id,
      booking_hall_date: formData.eventDate,
      special_request: formData.specialRequests,
      deposit: deposit,
      items: [],
    };

    try {
      // Create hall booking order
      const orderRes = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER}`, orderPayload);
      const order = orderRes.data.order || orderRes.data;

      toast.success("✅ Hall booked successfully!");

      // Step 2: Create ToyyibPay bill
      const billRes = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT}`, {
        order_id: order.id || order.order_id,
        total_price: total,
        payment_method: "online",
        name: formData.fullName,
        status: "pending",
        email: formData.email,
        phone: formData.phone,
        billName: "Hall Booking",
        billDescription: `Payment for hall booking #${order.id}`,
      });

      // Step 3: Redirect to ToyyibPay
      const paymentUrl = billRes.data.billCode
        ? `https://dev.toyyibpay.com/${billRes.data.billCode}`
        : billRes.data.url || billRes.data.redirect || billRes.data.payment_url;

      if (paymentUrl) {
        toast.success("Redirecting to ToyyibPay...");
        window.location.href = paymentUrl;
      } else {
        toast.error("❌ Failed to create ToyyibPay bill!");
      }

      // Step 4: Reset form and clear cart
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        hallSelection: "",
        specialRequests: "",
      });
      clearCart();
    } catch (err: any) {
      console.error("❌ Error:", err.response?.data || err.message);
      toast.error("❌ Failed to book hall or process payment!");
    }
  };

  if (loading) return <p>Loading halls...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="hero-hall">
        <div className="container-hall">
          <h1>Book Your Perfect Event Space</h1>
          <p>Find and reserve the ideal hall for your wedding, conference, or special occasion with our easy online booking system.</p>
        </div>
      </section>

      <main className="container-hall">
        <div className="main-content-hall">
          {/* Booking Form */}
          <div className="booking-form-hall-container-hall">
            <h2 className="form-hall-title">Book a Hall</h2>
            <form id="booking-form-hall" onSubmit={handleSubmit}>
              <div className="form-hall-group-hall">
                <label htmlFor="fullName">Full Name *</label>
                <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" required value={formData.fullName} onChange={handleChange} />
              </div>

              <div className="form-hall-row">
                <div className="form-hall-group-hall">
                  <label htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" required value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-hall-group-hall">
                  <label htmlFor="phone">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" placeholder="+60 12-345 6789" required value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="form-hall-group-hall">
                <label htmlFor="eventDate">Event Date *</label>
                <input id="eventDate" name="eventDate" type="date" required value={formData.eventDate} onChange={handleChange} />
              </div>

              {/* Hall Selection (filtered by date) */}
              <div className="form-hall-group-hall">
                <label htmlFor="hallSelection">Available Hall *</label>
                <select id="hallSelection" name="hallSelection" required value={formData.hallSelection} onChange={handleChange}>
                  <option value="">Choose a hall</option>
                  {filteredHalls.map((hall) => {
                    const deposit = Number(hall.price_per_day) * 0.4;
                    return (
                      <option key={hall.id} value={hall.id}>
                        {hall.name} — Deposit: RM {deposit.toFixed(2)} (Full Price: RM {hall.price_per_day}/day)
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-hall-group-hall">
                <label htmlFor="specialRequests">Special Requests Theme</label>
                <textarea id="specialRequests" name="specialRequests" rows={4} placeholder="Any special requirements or requests..." value={formData.specialRequests} onChange={handleChange} />
              </div>

              <div className="form-hall-actions">
                <button type="submit" className="btn btn-primary">Pay & Book Online</button>
                <button type="reset" className="btn btn-outline" onClick={() => setFormData({ fullName: "", email: "", phone: "", eventType: "", eventDate: "", hallSelection: "", specialRequests: "" })}>Clear form</button>
              </div>
            </form>
          </div>

          {/* Hall Display (filtered by date) */}
          <div className="hall-details">
            {filteredHalls.length === 0 ? (
              <p>No halls available for the selected date.</p>
            ) : (
              filteredHalls.slice(0, 2).map((hall) => (
                <div className="hall-card" key={hall.id}>
                  <div className="hall-image" style={{ backgroundImage: `url(${hall.image})` }} />
                  <div className="hall-content">
                    <h3 className="hall-title">{hall.name}</h3>
                    <p>{hall.description}</p>
                    <div className="hall-feature-halls">
                      <div className="feature-hall"><i className="fas fa-users" /> <span>Up to {hall.capacity} guests</span></div>
                      <div className="feature-hall"><i className="fas fa-ruler-combined" /> <span>{hall.size} sq. ft.</span></div>
                      {hall.facilities.map((facility, idx) => (
                        <div className="feature-hall" key={idx}><i className="fas fa-check-circle" /> <span>{facility}</span></div>
                      ))}
                    </div>
                    <div className="hall-price">RM {hall.price_per_day} / day</div>
                    {!hall.is_available && <div className="hall-unavailable">Currently unavailable</div>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
