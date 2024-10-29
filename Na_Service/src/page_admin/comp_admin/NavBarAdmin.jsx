import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from "react-router-dom"; 
import { NavLink } from "react-router-dom";
import ButtonAjoutPhoto from "./buttonAjoutPhoto.jsx";
import ButtonAjoutProduit from "./buttonAjoutProduit.jsx";

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
       

      <Link to="/admin" className="logo">
        <img src={img2} alt="Logo" className="logo-img" />
        <p className='titre'>Admin</p>
      </Link>

      <ul className="nav-links">
      <li>
          <NavLink 
            to="/admin" 
            className={activeLink === "/" ? "active-link" : ""} 
            onClick={() => setActiveLink("/")}>
            Accueil 
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/Prestations_Avicoles_admin" 
            className={activeLink === "/prestations_avicoles" ? "active-link" : ""} 
            onClick={() => setActiveLink("/prestations_avicoles")}>
            Prestations Avicoles 
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/PrestationsViticoles_admin" 
            className={activeLink === "/Prestations_Viticoles" ? "active-link" : ""} 
            onClick={() => setActiveLink("/Prestations_Viticoles")}>
            Prestations Viticoles 
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/ProductGrid_admin" 
            className={activeLink === "/product" ? "active-link" : ""} 
            onClick={() => setActiveLink("/ProductGrid_admin")}>
            Produits 
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/commande" 
            className={activeLink === "/product" ? "active-link" : ""} 
            onClick={() => setActiveLink("/ProductGrid_admin")}>
            commandes
          </NavLink>
        </li>
      
        <li>
          <i className="pi pi-shopping-carts" style={{ fontSize: '2rem' }}></i>
        </li>
      </ul>

      <button className='button_Offcanvas' onClick={handleShow}>
        <i className="pi pi-align-right" style={{ fontSize: '2rem' }}></i>
      </button>

      <div className='bloc_buttonAjout'>
      <ButtonAjoutPhoto/>
<p style={{color:"transparent"}}>aa</p>
      <ButtonAjoutProduit/>


      </div>
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
            to="/admin" 
            className={activeLink === "/" ? "active-link" : ""} 
            onClick={() => setActiveLink("/")}>
            Accueil  
          </NavLink>
        </li>
        <br /> <br />
            <li>
              <NavLink 
                to="/Prestations_Avicoles_admin" 
                className={activeLink === "/prestations_avicoles" ? "active-link" : ""} 
                onClick={() => setActiveLink("/prestations_avicoles")}>
                Prestations Avicoles 
              </NavLink>
            </li>
            <br /> <br />
            <li>
              <NavLink 
                to="/PrestationsViticoles_admin" 
                className={activeLink === "/Prestations_Viticoles" ? "active-link" : ""} 
                onClick={() => setActiveLink("/Prestations_Viticoles")}>
                Prestations Viticoles 
              </NavLink>
            </li>
            <br /> <br />
            <li>
              <NavLink 
                to="/ProductGrid_admin" 
                className={activeLink === "/product" ? "active-link" : ""} 
                onClick={() => setActiveLink("/product")}>
                Produits 
              </NavLink>
            </li>
            <br /> <br />
            <li>
          <NavLink 
            to="/commande" 
            className={activeLink === "/product" ? "active-link" : ""} 
            onClick={() => setActiveLink("/ProductGrid_admin")}>
            commandes
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





      <div className='footer_navbar'>





      <div className='bloc_buttonAjout_footer'>
      <ButtonAjoutPhoto/>
<p style={{color:"transparent"}}>aa</p>

      <ButtonAjoutProduit/>

      </div>


      </div>









    </nav>
  );
};

export default NavBar;
