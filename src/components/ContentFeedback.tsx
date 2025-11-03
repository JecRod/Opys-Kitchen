import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_CONFIG } from "../Api-Config";

interface Item {
  id: number;
  name: string;
}

export default function ContentFeedback() {
  const [items, setItems] = useState<Item[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    item_id: "",
    rating: 0,
    comment: "",
  });

  // ✅ Load available items from API
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_CONFIG.BASE_URL}/items`);
      setItems(res.data?.data || []);
    } catch (error: any) {
      console.error("❌ Failed to load items:", error.response?.data || error.message);
      toast.error("❌ Failed to load item list.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Handle input/textarea/select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("feedform-", "")]: value,
    }));
  };

  // ✅ Handle star click
  const handleRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  // ✅ Submit feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.item_id ||
      formData.rating === 0 ||
      !formData.comment
    ) {
      toast.error("⚠️ Please fill in all required fields, including item and rating!");
      return;
    }

    const payload = {
      item_id: Number(formData.item_id),
      name: formData.fullName,
      email: formData.email,
      rating: Number(formData.rating),
      comment: formData.comment,
    };

    console.log("📤 Sending feedback payload:", payload);

    try {
      const res = await axios.post(`${API_CONFIG.BASE_URL}/feedback`, payload);
      toast.success(res.data?.message || "✅ Feedback submitted successfully!");
      console.log("✅ Server Response:", res.data);

      setFormData({
        fullName: "",
        email: "",
        item_id: "",
        rating: 0,
        comment: "",
      });
    } catch (error: any) {
      console.error("❌ Feedback submission failed:", error.response?.data || error.message);
      toast.error("❌ Failed to submit feedback!");
    }
  };

  return (
    <div>
      <section className="hero-feedback">
        <div className="container">
          <h1>Customer Feedback</h1>
          <p>Please select the item or hall you’d like to give feedback for.</p>
        </div>
      </section>

      <main className="container">
        <div className="main-content">
          <div className="feedform-container">
            <h2>Share Your Experience</h2>

            <form onSubmit={handleSubmit}>
              {/* ✅ Name */}
              <div className="feedform-group">
                <label htmlFor="feedform-fullName">Full Name *</label>
                <input
                  type="text"
                  id="feedform-fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ✅ Email */}
              <div className="feedform-group">
                <label htmlFor="feedform-email">Email *</label>
                <input
                  type="email"
                  id="feedform-email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ✅ Item Dropdown */}
              <div className="feedform-group">
                <label htmlFor="feedform-item_id">Select Item *</label>
                <select
                  id="feedform-item_id"
                  value={formData.item_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select an item --</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (ID: {item.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Rating */}
              <div className="feedform-group">
                <label>Rating *</label>
                <div className="feedform-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`feedform-star ${formData.rating >= star ? "selected" : ""}`}
                      style={{
                        cursor: "pointer",
                        color: formData.rating >= star ? "gold" : "#ccc",
                        fontSize: "1.8rem",
                        marginRight: "5px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* ✅ Comment */}
              <div className="feedform-group">
                <label htmlFor="feedform-comment">Comment *</label>
                <textarea
                  id="feedform-comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your experience..."
                  style={{ resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit" className="feedform-btn feedform-btn-primary">
                  Submit Feedback
                </button>

                <Link
                  to="/"
                  className="feedform-btn feedform-btn-outline"
                  style={{ textAlign: "center", textDecoration: "none", lineHeight: "2.2rem" }}
                >
                  🏠 Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
