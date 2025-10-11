import { Link } from "react-router-dom";



export default function Dnav() {
    return (
        <>
            <nav className="desktop-nav">
            <div className="nav-left">
            <div className="logo">
                <img src="../public/assets/img/logo.svg" alt="OpysKitchen Logo" />
                {/* OpysKitchen */}
            </div>
            </div>

            <div className="nav-center">
                <ul>
                    <li><Link to="/"><i className="fas fa-home" /> Home</Link></li>
                    <li><Link to="/menu"><i className="fas fa-utensils" /> Menu</Link></li>
                    <li><Link to="/offers"><i className="fas fa-percent" /> Offers</Link></li>
                    <li><Link to="/about"><i className="fas fa-info-circle" /> About</Link></li>
                    <li><Link to="/hall"><i className="fas fa-building" /> Hall</Link></li>
                </ul>
            </div>
            <div className="nav-right">
                <div className="nav-icon search-icon">
                <i className="fas fa-search" />
                </div>
                <div className="nav-icon cart-icon">
                    <Link to="/cart"><i className="fas fa-shopping-cart" /><span className="cart-count">3</span></Link>
                </div>
                <div className="nav-icon user-icon">
                    <Link to="/chat"><i className="fas fa-message" /></Link>
                
                </div>
            </div>
            </nav>

        </>

    );
}