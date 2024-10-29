import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from "react-router-dom"; 
import { NavLink } from "react-router-dom";

import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'; 
import img2 from "../../img/img_logo.png";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("/"); 
  const location = useLocation(); 

  const [show, setShow] = useState(false);
  const [cartCount, setCartCount] = useState(0); // حالة لتتبع عدد العناصر في السلة

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  // تحميل عدد العناصر من localStorage عند تحميل المكون
  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount") || 0;
    setCartCount(Number(storedCartCount));
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={img2} alt="Logo" className="logo-img" />
        <p className='titre'>NA services</p>
      </Link>

      <ul className="nav-links">
      <li>
          <NavLink 
            to="/" 
            className={activeLink === "/" ? "active-link" : ""} 
            onClick={() => setActiveLink("/")}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/prestations_avicoles" 
            className={activeLink === "/prestations_avicoles" ? "active-link" : ""} 
            onClick={() => setActiveLink("/prestations_avicoles")}>
            Prestations Avicoles
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/Prestations_Viticoles" 
            className={activeLink === "/Prestations_Viticoles" ? "active-link" : ""} 
            onClick={() => setActiveLink("/Prestations_Viticoles")}>
            Prestations Viticoles
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/product" 
            className={activeLink === "/product" ? "active-link" : ""} 
            onClick={() => setActiveLink("/product")}>
            Produits
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={activeLink === "/contact" ? "active-link" : ""} 
            onClick={() => setActiveLink("/contact")}>
            Contactez-nous
          </NavLink>
        </li>
        <li>
          <i className="pi pi-shopping-carts" style={{ fontSize: '2rem' }}></i>
        </li>
      </ul>

      <button className='button_Offcanvas' onClick={handleShow}>
        <i className="pi pi-align-right" style={{ fontSize: '2rem' }}></i>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span style={{fontSize:"30px",fontWeight:"700"}}> Votre Pages</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{border:"#e7e7e7 solid 0.5px", position:"absolute",left:"-20px", width:"419px",top:"90px"}}></div>
          <br /> <br />
          <ul className="nav-link">
          <li>
          <NavLink 
            to="/" 
            className={activeLink === "/" ? "active-link" : ""} 
            onClick={() => setActiveLink("/")}>
            Accueil
          </NavLink>
        </li>
        <br /> <br />
            <li>
              <NavLink 
                to="/prestations_avicoles" 
                className={activeLink === "/prestations_avicoles" ? "active-link" : ""} 
                onClick={() => setActiveLink("/prestations_avicoles")}>
                Prestations Avicoles
              </NavLink>
            </li>
            <br /> <br />
            <li>
              <NavLink 
                to="/Prestations_Viticoles" 
                className={activeLink === "/Prestations_Viticoles" ? "active-link" : ""} 
                onClick={() => setActiveLink("/Prestations_Viticoles")}>
                Prestations Viticoles
              </NavLink>
            </li>
            <br /> <br />
            <li>
              <NavLink 
                to="/product" 
                className={activeLink === "/product" ? "active-link" : ""} 
                onClick={() => setActiveLink("/product")}>
                Produits
              </NavLink>
            </li>
            <br /> <br />
            <li>
              <NavLink 
                to="/contact" 
                className={activeLink === "/contact" ? "active-link" : ""} 
                onClick={() => setActiveLink("/contact")}>
                Contactez-nous
              </NavLink>
            </li>
            <br /> <br />
{/*


            <li>
              <NavLink 
                to="/espace_client" 
                className={activeLink === "/espace_client" ? "active-link" : ""} 
                onClick={() => setActiveLink("/espace_client")}>
                Espace Client
              </NavLink>
            </li>
 */}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* عرض عدد العناصر في السلة */}
      <Link to="/panier" className="pi pi-shopping-cart">
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>


    </nav>
  );
};

export default NavBar;
