import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";
import { API_CONFIG } from "../Api-Config";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
// import { apiClient } from "../api/apiClient";
// import { API_CONFIG } from "../api/api-config";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  is_available: number;
  image: string;
}

export default function ContentMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await apiClient.get(API_CONFIG.ENDPOINTS.MENU);
        if (res.data.success && Array.isArray(res.data.data)) {
          setMenuItems(res.data.data);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      } catch (error) {
        console.error("❌ Failed to fetch menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // ✅ Filter by category
  const filteredMenu =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  if (loading) return <p>Loading menu...</p>;


  return (
    <main className="main-content">
      <div className="container">
        <section className="greeting">
          <h2>Our Delicious Menu</h2>
          <p>Explore our wide variety of delicious dishes</p>
        </section>

        {/* ✅ Category Filter */}
        <section className="item">
          <ul>
            {["all", "rice", "burger", "dessert", "beverage"].map((cat) => (
              <li key={cat}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(cat);
                  }}
                  className={selectedCategory === cat ? "active" : ""}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ✅ Dynamic Menu Items */}
        <section className="menu-section">
          <div className="container">
            <h2 className="section-title">
              {selectedCategory === "all"
                ? "All Menu Items"
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Menu`}
            </h2>

            <div className="menu-grid">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => (
                  <div key={item.id} className="menu-item">
                    <img src={item.image} alt={item.name} />
                    <div className="menu-item-content">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className="price">RM {item.price.toFixed(2)}</div>
                      {item.is_available === 1 ? (
                        <button
                        className="add-to-cart"
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            description: item.description,
                            image: item.image,
                            quantity: 1,
                          });

                          // ✅ Show success toast
                          toast.success(`${item.name} added to cart! 🛒`);
                        }}
                      >
                        Add to Cart
                      </button>

                    ) : (
                      <button
                        className="not-available-cart"
                        onClick={() => {
                          toast.error(`${item.name} is not available!`);
                        }}

                      >
                        Not Available
                      </button>

                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No items found in this category.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
