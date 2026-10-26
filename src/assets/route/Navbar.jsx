import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
import Footer from "./Footer";

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Login</Link>
            </nav>

            <Outlet />

            <Footer />
        </>
    );
}

export default Navbar;