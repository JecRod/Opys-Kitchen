import axios from "axios";
import { API_CONFIG } from "../Api-Config";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

export default function ContentCheckout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();


  // ✅ Checkout method (delivery / dine-in)
  const [, setCheckoutMethod] = useState<"delivery" | "dine-in" | null>(null);


  // ✅ Load checkout method from localStorage
  useEffect(() => {
    const savedMethod = localStorage.getItem("checkout_method") as
      | "delivery"
      | "dine-in"
      | null;
    if (savedMethod) {
      setCheckoutMethod(savedMethod);
      setFormData((prev) => ({
        ...prev,
        orderType: savedMethod,
      }));
    }
  }, []);

  // ✅ Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tableNo: "",
    address: "",
    payment: "cash", // default
    orderType: "dine-in", // default
  });

  // ✅ Totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  // ✅ Input change handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is empty!");
      return;
    }

    // 🧾 Step 1: Build order payload
    const orderPayload: any = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      status: "pending",
      order_type: formData.orderType,
      payment_method: formData.payment,
      total_price: total,
      items: cartItems.map((item) => ({
        item_id: item.id,
        quantity: item.quantity,
      })),
    };

    if (formData.orderType === "dine-in") {
      orderPayload.table_no = formData.tableNo;
    } else if (formData.orderType === "delivery") {
      orderPayload.address = formData.address;
    }

    try {
      // ✅ Step 2: Create order
      const orderRes = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER}`,
        orderPayload
      );

      const order = orderRes.data.order || orderRes.data;
      console.log("✅ Order Created:", order);

      // ✅ Step 3: Handle payment based on method
      if (formData.payment === "cash") {
        try {
          const cashRes = await axios.post(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT_CASH}`,
            {
              order_id: order.id || order.order_id,
              total_price: total,
              payment_method: "cash",
              email: formData.email,
            }
          );

          console.log("💵 Cash Payment Response:", cashRes.data);
          toast.success("💵 Cash payment recorded successfully!");
          clearCart();
          navigate("/receipt", { 
          state: { 
            order: { 
              ...order, 
              total_price: total, 
              items: cartItems // ✅ include full item details
            } 
          } 
        });



        } catch (cashError: any) {
          console.error("❌ Cash Payment Error:", cashError.response?.data || cashError.message);
          toast.error("❌ Failed to record cash payment!");
        }
      } else if (formData.payment === "online") {
        try {
          const billRes = await axios.post(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT}`,
            {
              order_id: order.id || order.order_id,
              total_price: total,
              payment_method: "online",
              name: formData.name,
              status: "pending",
              email: formData.email,
              phone: formData.phone,
              billName: "Burger Order",
              billDescription: `Payment for order #${order.id}`,
            }
          );

          console.log("💳 ToyyibPay Response:", billRes.data);
          const paymentUrl =
            billRes.data.billCode
              ? `https://dev.toyyibpay.com/${billRes.data.billCode}`
              : billRes.data.url ||
                billRes.data.redirect ||
                billRes.data.payment_url;

          if (paymentUrl) {
            toast.success("Redirecting to ToyyibPay...");
            window.location.href = paymentUrl;
          } else {
            toast.error("❌ Failed to create ToyyibPay bill!");
          }
        } catch (onlineError: any) {
          console.error("❌ Online Payment Error:", onlineError.response?.data || onlineError.message);
          toast.error("❌ Online payment failed!");
        }
      } else if (formData.payment === "card") {
        toast("💳 Card payment feature coming soon!");
      }
    } catch (error: any) {
      console.error("❌ Checkout Error:", error.response?.data || error.message);
      toast.error("Failed to process your order!");
    }
  };

  return (
    <main className="main-content">
      <div className="container">
        <section className="greeting">
          <h2>Proceed to Checkout</h2>
          <p>Review your items before confirming your order</p>
        </section>
      </div>

      <div className="container">
        <div className="cart-container">
          {/* ✅ Checkout Form */}
          <div className="checkout-form-section">
            <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
              {/* Customer Info */}
              <div className="form-section">
                <h2><i className="fas fa-user" /> Customer Information</h2>
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

              {/* Order Type */}
              <div className="form-section">
                <h2><i className="fas fa-concierge-bell" /> Order Type</h2>
                <div className="payment-methods">
                  {["dine-in", "delivery"].map((type) => (
                    <label
                      key={type}
                      className={`payment-method ${formData.orderType === type ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="orderType"
                        value={type}
                        checked={formData.orderType === type}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            orderType: e.target.value,
                          }))
                        }
                      />
                      <i
                        className={`fas ${
                          type === "dine-in" ? "fa-utensils" : "fa-truck"
                        } payment-icon`}
                      />
                      <span>{type === "dine-in" ? "Dine-in" : "Delivery"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dine-in Info */}
              {formData.orderType === "dine-in" && (
                <div className="form-section">
                  <h2><i className="fas fa-utensils" /> Dine-in Information</h2>
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
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          Table {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Delivery Info */}
              {formData.orderType === "delivery" && (
                <div className="form-section">
                  <h2><i className="fas fa-truck" /> Delivery Information</h2>
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
                <h2><i className="fas fa-credit-card" /> Payment Method</h2>
                <div className="payment-methods">
                  {["cash", "card", "online"].map((method) => (
                    <label
                      key={method}
                      className={`payment-method ${formData.payment === method ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        id={method}
                        name="payment"
                        value={method}
                        checked={formData.payment === method}
                        onChange={handleChange}
                      />
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

          {/* ✅ Order Summary */}
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

              {formData.orderType === "delivery" && (
                <div className="delivery-info">
                  <i className="fas fa-shipping-fast" />
                  <span>Estimated delivery: 30–45 minutes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
