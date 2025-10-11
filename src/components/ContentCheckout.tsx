import axios from "axios";
import { API_CONFIG } from "../Api-Config";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function ContentCheckout() {
  const { cartItems, clearCart } = useCart();

  // ✅ Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tableNo: "",
    address: "",
    payment: "cash",
    orderType: "dine-in", // 👈 new field
  });

  // ✅ Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  // ✅ Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit order
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is empty!");
      return;
    }

    // ✅ Build payload conditionally
    const payload: any = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      status: "pending",
      order_type: formData.orderType,
      payment_method: formData.payment,
      items: cartItems.map((item) => ({
        item_id: item.id,
        quantity: item.quantity,
      })),
    };

    if (formData.orderType === "dine-in") {
      payload.table_no = formData.tableNo;
    } else if (formData.orderType === "delivery") {
      payload.address = formData.address;
    }

    try {
      const res = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER}`,
        payload
      );

      toast.success("✅ Order placed successfully!");
      console.log("Order Response:", res.data);
      clearCart();
    } catch (error: any) {
      console.error("Order error:", error.response?.data || error.message);
      toast.error("❌ Failed to place order!");
    }
  };

  return (
    <main className="main-content">
      <div className="container">
        <section className="greeting">
          <h2>Proceed to Checkout</h2>
          <p>Review your items before checkout</p>
        </section>
      </div>

      <div className="container">
        <div className="cart-container">
          {/* ✅ Checkout Form */}
          <div className="checkout-form-section">
            <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
              {/* Customer Info */}
              <div className="form-section">
                <h2>
                  <i className="fas fa-user" /> Customer Information
                </h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ✅ Order Type */}
              <div className="form-section">
                <h2>
                  <i className="fas fa-concierge-bell" /> Order Type
                </h2>

                <div className="payment-methods">
                  {["dine-in", "delivery"].map((type) => (
                    <div className="payment-method" key={type}>
                      <input
                        type="radio"
                        id={type}
                        name="orderType"
                        value={type}
                        checked={formData.orderType === type}
                        onChange={handleChange}
                      />
                      <label htmlFor={type}>
                        <i
                          className={`fas ${
                            type === "dine-in"
                              ? "fa-utensils"
                              : "fa-truck"
                          } payment-icon`}
                        />
                        <span>
                          {type === "dine-in" ? "Dine-in" : "Delivery"}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>


              {/* ✅ Dine-in Info (only if dine-in) */}
              {formData.orderType === "dine-in" && (
                <div className="form-section">
                  <h2>
                    <i className="fas fa-utensils" /> Dine-in Information
                  </h2>
                  <div className="form-group">
                    <label htmlFor="tableNo">Table No *</label>
                    <select
                      id="tableNo"
                      name="tableNo"
                      required
                      value={formData.tableNo}
                      onChange={handleChange}
                    >
                      <option value="">Select a table</option>
                      <option value="1">Table 1</option>
                      <option value="2">Table 2</option>
                      <option value="3">Table 3</option>
                      <option value="4">Table 4</option>
                      <option value="5">Table 5</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ✅ Delivery Info (only if delivery) */}
              {formData.orderType === "delivery" && (
                <div className="form-section">
                  <h2>
                    <i className="fas fa-truck" /> Delivery Information
                  </h2>
                  <div className="form-group">
                    <label htmlFor="address">Delivery Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="form-section">
                <h2>
                  <i className="fas fa-credit-card" /> Payment Method
                </h2>
                <div className="payment-methods">
                  {["cash", "card", "online"].map((method) => (
                    <div className="payment-method" key={method}>
                      <input
                        type="radio"
                        id={method}
                        name="payment"
                        value={method}
                        checked={formData.payment === method}
                        onChange={handleChange}
                      />
                      <label htmlFor={method}>
                        <i
                          className={`fas ${
                            method === "cash"
                              ? "fa-money-bill-wave"
                              : method === "card"
                              ? "fa-credit-card"
                              : "fa-mobile-alt"
                          } payment-icon`}
                        />
                        <span>
                          {method === "cash"
                            ? "Cash on Delivery"
                            : method === "card"
                            ? "Credit/Debit Card"
                            : "Online Payment"}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button type="submit" className="place-order-btn">
                  <i className="fas fa-lock" /> Place Order
                </button>
                <a href="/cart" className="back-to-cart">
                  <i className="fas fa-arrow-left" /> Back to Cart
                </a>
              </div>
            </form>
          </div>

          {/* ✅ Cart Summary */}
          <div className="order-summary-section">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              <div className="checkout-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <img src={item.image} alt={item.name} className="checkout-item-image" />
                    <div className="checkout-item-details">
                      <h4>{item.name}</h4>
                      <div className="checkout-item-quantity">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="checkout-item-price">
                      RM {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (6%)</span>
                  <span>RM {tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="delivery-info">
                <i className="fas fa-shipping-fast" />
                <span>Estimated delivery: 30-45 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
