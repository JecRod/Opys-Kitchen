import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ContentCart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  return (
    <main className="main-content">
        <div className="container">
        <section className="greeting">
            <h2>Your Shopping Cart</h2>
            <p>Review your items before checkout</p>
        </section>
        </div>
      

      <div className="container">
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty 🛒</p>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="item-price">RM {item.price.toFixed(2)}</div>
                  </div>
                  <div className="item-quantity">
                    <button
                      className="quantity-btn minus"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn plus"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    RM {(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="item-remove">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

         {/* Summary */}
        {cartItems.length > 0 && (
        <div className="cart-summary">
        <h3>Order Summary</h3>
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
        <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
        <div className="continue-shopping">
            <Link to="/menu">
            <i className="fas fa-arrow-left" /> Continue Shopping
            </Link>
        </div>
        </div>

        )}

        </div>
      </div>
    </main>
  );
}
