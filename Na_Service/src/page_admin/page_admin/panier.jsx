import './panier.css'; 
import Navbar from ".././comp_admin/NavBarAdmin.jsx";
import { useState, useEffect } from 'react';

const Panier_admin = () => {
  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const removeItem = (itemToRemove) => {
    const updatedCartItems = cartItems.filter(item => item && item.id !== itemToRemove.id);

    // تحقق من إذا تم إزالة العنصر
    if (updatedCartItems.length === cartItems.length) {
      setAlertMessage('L\'élément que vous essayez de supprimer n\'existe pas dans le panier.'); // رسالة خطأ
    } else {
      setAlertMessage('L\'élément a été supprimé du panier.'); // رسالة نجاح
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // مسح الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Votre panier</h2>
        {alertMessage && (
          <div className="alert-message" style={{ color: 'red', marginBottom: '10px' }}>
            {alertMessage}
          </div>
        )}
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          cartItems.map((item, index) => (
            item ? (
              <CartItem key={index} item={item} onRemove={removeItem} />
            ) : null
          ))
        )}
      </div>
    </>
  );
};

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <h3>{item.name}</h3>
        <div className="item-price">
          <span className="price">{item.price} €</span>
        </div>
      </div>
      <button className="remove-item" onClick={() => onRemove(item)}>
        <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
      </button>
    </div>
  );
};

export default Panier_admin;
