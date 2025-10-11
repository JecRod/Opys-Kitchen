import { Link } from "react-router-dom";



export default function Mnav() {
    return (
        <>
            <nav className="mobile-nav">
                <Link to="/"><i className="fas fa-home" /> Home</Link>
                <Link to="/menu"><i className="fas fa-utensils" /> Menu</Link>
                <Link to="/offers"><i className="fas fa-percent" /> Offers</Link>
                <Link to="/cart"><i className="fas fa-shopping-cart" /> Cart</Link>
                <Link to="/chat"><i className="fas fa-message" /> Chat</Link>
            </nav>

        </>
    );
}