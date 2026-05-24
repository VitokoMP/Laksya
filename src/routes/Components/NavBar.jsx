import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContext } from '../../context/UsuarioContext';

export const NavBar = () => {
    const { setMostrarCarrito, totalItems } = useContext(UsuarioContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 10) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavigation = (path) => {
        setMenuAbierto(false);
        navigate(path);
    };

    const handleAbrirCarrito = () => {
        setMenuAbierto(false);
        setMostrarCarrito(true);
    };

    return (
        <>
            <style>{`
                .navbar-personalizado {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background: transparent;
                    transition: all 0.3s ease;
                    z-index: 1000;
                    padding: 1rem 2rem;
                }

                .navbar-personalizado.scrolled {
                    background: rgba(253, 248, 243, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(193, 123, 94, 0.1);
                }

                .navbar-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .navbar-logo {
                    cursor: pointer;
                    z-index: 1002;
                }

                .navbar-logo img {
                    height: 50px;
                    width: auto;
                    transition: all 0.3s ease;
                }

                .scrolled .navbar-logo img {
                    height: 45px;
                }

                /* ===== MENÚ HORIZONTAL PARA DESKTOP ===== */
                .menu-desktop {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .menu-desktop-item {
                    background: none;
                    border: none;
                    color: #3a2a24;
                    font-size: 1rem;
                    letter-spacing: 1px;
                    cursor: pointer;
                    padding: 0.5rem 0;
                    font-family: 'Cormorant Garamond', serif;
                    transition: color 0.3s ease;
                    border-bottom: 1px solid transparent;
                }

                .menu-desktop-item:hover {
                    color: #c17b5e;
                    border-bottom-color: #c17b5e;
                }

                .menu-desktop-carrito {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: none;
                    border: 1px solid #c17b5e;
                    border-radius: 2rem;
                    padding: 0.4rem 1.2rem;
                    color: #3a2a24;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .menu-desktop-carrito:hover {
                    background: rgba(193, 123, 94, 0.1);
                    transform: translateY(-2px);
                }

                .menu-desktop-contador {
                    background: #c17b5e;
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 50%;
                    font-size: 0.7rem;
                    margin-left: 0.3rem;
                }

                /* ===== MENÚ HAMBURGUESA PARA MÓVIL ===== */
                .menu-toggle {
                    display: none;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 35px;
                    height: 30px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    z-index: 1002;
                }

                .menu-toggle span {
                    width: 35px;
                    height: 3px;
                    background: #c17b5e;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }

                .menu-toggle.activo span:nth-child(1) {
                    transform: rotate(45deg) translate(8px, 8px);
                }

                .menu-toggle.activo span:nth-child(2) {
                    opacity: 0;
                }

                .menu-toggle.activo span:nth-child(3) {
                    transform: rotate(-45deg) translate(8px, -8px);
                }

                .menu-desplegable {
                    position: fixed;
                    top: 0;
                    left: -350px;
                    width: 300px;
                    height: 100vh;
                    background: rgba(253, 248, 243, 0.98);
                    backdrop-filter: blur(10px);
                    box-shadow: 2px 0 15px rgba(0,0,0,0.1);
                    transition: left 0.3s ease;
                    z-index: 1001;
                    padding: 100px 2rem 2rem;
                    border-right: 1px solid rgba(193, 123, 94, 0.2);
                }

                .menu-desplegable.abierto {
                    left: 0;
                }

                .menu-item {
                    display: block;
                    width: 100%;
                    padding: 1rem 0;
                    color: #3a2a24;
                    text-decoration: none;
                    font-size: 1.2rem;
                    letter-spacing: 1px;
                    transition: color 0.3s ease;
                    background: none;
                    border: none;
                    text-align: left;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(193, 123, 94, 0.1);
                }

                .menu-item:hover {
                    color: #c17b5e;
                }

                .menu-item.carrito {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid #c17b5e;
                    border-radius: 2rem;
                    padding: 0.8rem 1.5rem;
                    margin-top: 1rem;
                }

                .menu-contador {
                    background: #c17b5e;
                    color: white;
                    padding: 0.2rem 0.6rem;
                    border-radius: 50%;
                    font-size: 0.8rem;
                    margin-left: 0.5rem;
                }

                .menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.3);
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }

                .menu-overlay.visible {
                    opacity: 1;
                    visibility: visible;
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 768px) {
                    .menu-desktop {
                        display: none;
                    }

                    .menu-toggle {
                        display: flex;
                    }

                    .navbar-personalizado {
                        padding: 0.8rem 1rem;
                    }
                    
                    .navbar-logo img {
                        height: 40px;
                    }
                    
                    .scrolled .navbar-logo img {
                        height: 35px;
                    }
                }

                @media (min-width: 769px) {
                    .menu-toggle, .menu-desplegable, .menu-overlay {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .menu-desplegable {
                        width: 250px;
                    }
                }

                body {
                    padding-top: 70px;
                }
            `}</style>

            <nav className={`navbar-personalizado ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={() => window.scrollTo(0, 0)}>
                        <img 
                            src="/img/Andrea/Logo elegante de Alekhart.png" 
                            alt="Alekhart Logo"
                        />
                    </Link>

                    {/* MENÚ PARA DESKTOP */}
                    <div className="menu-desktop">
                        <button onClick={() => handleNavigation('/about')} className="menu-desktop-item">
                            Sobre mí
                        </button>
                        <button onClick={() => handleNavigation('/contact')} className="menu-desktop-item">
                            Contacto
                        </button>
                        <button onClick={handleAbrirCarrito} className="menu-desktop-carrito">
                            <span>🛒 Carrito</span>
                            {totalItems > 0 && (
                                <span className="menu-desktop-contador">{totalItems}</span>
                            )}
                        </button>
                    </div>

                    {/* BOTÓN HAMBURGUESA PARA MÓVIL */}
                    <button 
                        className={`menu-toggle ${menuAbierto ? 'activo' : ''}`}
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        aria-label="Menú"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* MENÚ DESPLEGABLE PARA MÓVIL */}
            <div className={`menu-desplegable ${menuAbierto ? 'abierto' : ''}`}>
                <button onClick={() => handleNavigation('/about')} className="menu-item">
                    Sobre mí
                </button>
                <button onClick={() => handleNavigation('/contact')} className="menu-item">
                    Contacto
                </button>
                <button onClick={handleAbrirCarrito} className="menu-item carrito">
                    <span>🛒 Carrito</span>
                    {totalItems > 0 && (
                        <span className="menu-contador">{totalItems}</span>
                    )}
                </button>
            </div>

            {/* OVERLAY PARA CERRAR MENÚ MÓVIL */}
            <div 
                className={`menu-overlay ${menuAbierto ? 'visible' : ''}`}
                onClick={() => setMenuAbierto(false)}
            ></div>
        </>
    );
};

export default NavBar;
