import { useLocation, Link } from "react-router-dom";

export default function ReceiptPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f9fa",
        }}
      >
        <h2>No receipt data available</h2>
        <Link
          to="/"
          style={{
            marginTop: "1rem",
            textDecoration: "none",
            background: "#007bff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          🏠 Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem 3rem",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🧾 Payment Receipt</h1>
        <p style={{ textAlign: "center", color: "#555" }}>
          Thank you for your order!
        </p>

        <hr style={{ margin: "1.5rem 0" }} />

        <div style={{ lineHeight: "1.8" }}>
          <p>
            <strong>Order ID:</strong> #{order.id}
          </p>
          <p>
            <strong>Name:</strong> {order.customer_name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer_email}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.payment_method || "Cash"}
          </p>
          <p>
            <strong>Status:</strong> {order.status || "Paid"}
          </p>
          <p>
            <strong>Total:</strong> RM {order.total_price?.toFixed(2)}
          </p>
        </div>

        {/* ✅ Items Section */}
        {order.items && order.items.length > 0 && (
          <>
            <hr style={{ margin: "1.5rem 0" }} />
            <h3>Items Ordered</h3>
            <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
              {order.items.map((item: any, index: number) => (
                <li
                  key={index}
                  style={{
                    background: "#f8f9fa",
                    marginBottom: "1rem",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <strong>
                      {item.name || item.item_name || `Item #${item.item_id}`}
                    </strong>{" "}
                    × {item.quantity}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ✅ Action Buttons */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              background: "#007bff",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            🏠 Back to Home
          </Link>

          {/* ✅ Send item_id + item_name to Feedback page */}
          {order.items && order.items.length > 0 && (
            <Link
              to="/feedback"
              state={{
                item_id: order.items[0].item_id,
                item_name:
                  order.items[0].name || order.items[0].item_name || "Item",
              }}
              style={{
                textDecoration: "none",
                background: "#28a745",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              ⭐ Send Feedback
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
