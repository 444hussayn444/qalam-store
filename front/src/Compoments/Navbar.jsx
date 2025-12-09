// Sidebar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"
import { SiSinglestore } from "react-icons/si";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { TbGeometry } from "react-icons/tb";
import { BsCart } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div >
            {/* Mobile Menu Button */}
            <button
                className="btn"
                style={{
                    position: "fixed",
                    top: "10px",
                    left: "10px",
                    zIndex: 1000,
                    padding: "10px",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                onClick={() => setIsOpen(true)}
            >
                ☰
            </button>

            {/* Drawer Sidebar */}
            <div
                className="Navbar"
                style={{
                    position: "fixed",
                    top: 0,
                    left: isOpen ? 0 : "-250px",
                    width: "250px",
                    height: "100%",
                    transition: "left 0.3s ease",
                    paddingTop: "60px",
                    zIndex: 999,
                }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                >
                    ×
                </button>

                {/* Navigation Links */}
                <nav style={{ padding: "20px" }}>
                    <NavLink
                        className="link"
                        to="/"
                        end
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "gold" : "#aaa",
                            backgroundColor: isActive ? "#4b00c4ff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: isActive ? "bold" : "normal",
                        })}
                        onClick={() => setIsOpen(false)} // Close drawer on click (mobile)
                    >
                        <FaHome className="fix-icon" /> Home
                    </NavLink>


                    <NavLink className="link"
                        to="/store"
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "gold" : "#aaa",
                            backgroundColor: isActive ? "#4b00c4ff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: isActive ? "bold" : "normal",
                        })}
                        onClick={() => setIsOpen(false)}
                    >
                        <SiSinglestore className="fix-icon" />
                        Store
                    </NavLink>
                    <NavLink className="link"
                        to="/cart"
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "gold" : "#aaa",
                            backgroundColor: isActive ? "#4b00c4ff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: isActive ? "bold" : "normal",
                        })}
                        onClick={() => setIsOpen(false)}
                    >
                        <BsCart className="fix-icon" />
                        Cart
                    </NavLink>
                    <NavLink
                        className="link"
                        to="/description"
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "gold" : "#aaa",
                            backgroundColor: isActive ? "#4b00c4ff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: isActive ? "bold" : "normal",
                        })}
                        onClick={() => setIsOpen(false)}
                    >
                        <MdOutlineWbIncandescent className="fix-icon" />Description
                    </NavLink>
                    <NavLink
                        className="link btn-suc"
                        to="/geomitric"
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "gold" : "#aaa",
                            backgroundColor: isActive ? "#4b00c4ff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: isActive ? "bold" : "normal",
                        })}
                        onClick={() => setIsOpen(false)}
                    >
                        <TbGeometry className="fix-icon" />
                        Our Geomitric Design
                    </NavLink>
                        <hr className="bloodline"/>
                    <NavLink
                        className="link btns"
                        to="/login"
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "gold" : "#aaa",
                            backgroundColor: isActive ? "#4b00c4ff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: isActive ? "bold" : "normal",
                        })}
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        className="link btns"
                        to="/signup"
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "gold" : "#aaa",
                            backgroundColor: isActive ? "#4b00c4ff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontWeight: isActive ? "bold" : "normal",
                        })}
                        onClick={() => setIsOpen(false)}
                    >
                        Sign-up
                    </NavLink>

                </nav>
            </div>

            {/* Dark overlay when drawer is open (mobile only) */}
            {
                isOpen && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            zIndex: 998,
                        }}
                        onClick={() => setIsOpen(false)}
                    />
                )
            }
        </div >
    );
}