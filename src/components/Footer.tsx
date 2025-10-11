import { Link } from "react-router-dom";



export default function Footer() {
    return (
        <>
            <footer>
            <div className="container">
                <div className="footer-content">
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p><i className="fas fa-map-marker-alt" /> 123 Food Street, City</p>
                    <p><i className="fas fa-phone" /> (123) 456-7890</p>
                    <p><i className="fas fa-envelope" /> info@fooddelivery.com</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                        <Link to="/"><i className="" /> Home</Link>
                        <Link to="/menu"><i className="" /> Menu</Link>
                        <Link to="/about"><i className="" /> About US</Link>
                        <Link to="/contact"><i className="" /> Contact</Link>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <Link to="/"><i className="fab fa-facebook" /></Link>
                        <Link to="/"><i className="fab fa-instagram" /></Link>
                        <Link to="/"><i className="fab fa-twitter" /></Link>
                        <Link to="/"><i className="fab fa-tiktok" /></Link>
                    </div>
                </div>
                </div>
                <div className="copyright">
                <p>© 2023 Food Delivery. All rights reserved.</p>
                </div>
            </div>
            </footer>

        </>
        
    )
}