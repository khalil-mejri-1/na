import './panier.css'; 
import Navbar from "../comp/NavBar.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);
  const [nameValue, setNameValue] = useState(""); 
  const [emailValue, setEmailValue] = useState(""); 
  const [phoneValue, setPhoneValue] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // حالة جديدة لظهور الرسالة

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemsWithQuantity = storedCartItems.map(item => ({ ...item, quantity: item.quantity || 1 }));
    setCartItems(itemsWithQuantity);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleQuantityChange = (index, change) => {
    const updatedCartItems = [...cartItems];
    const newQuantity = updatedCartItems[index].quantity + change;

    if (newQuantity > 0) {
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleSubmit = async () => {
    const orderItems = cartItems.map(item => ({
      id: item._id,
      quantity: item.quantity
    }));

    if (orderItems.length === 0) {
        setErrorMessage("Votre panier est vide.");
        setSuccessMessage(""); 
        setIsSuccessVisible(false); 
        return;
    }

    if (!nameValue || !emailValue || !phoneValue) {
        setErrorMessage("Veuillez remplir tous les champs.");
        setSuccessMessage(""); 
        setIsSuccessVisible(false); 
        return;
    }

    setErrorMessage(""); 

    try {
        const response = await axios.post('http://localhost:3000/Panier', { 
            name: nameValue, 
            email: emailValue, 
            phone: phoneValue, 
            items: orderItems 
        });
        setSuccessMessage("chère cliente , cher client.  on va vous envoyer votre facture et notre RIB sur votre email dans une minute"); 
        setIsSuccessVisible(true); // عرض رسالة النجاح
        setTimeout(() => setIsSuccessVisible(false), 10000); // إخفاء الرسالة بعد 5 ثواني
        setNameValue(""); 
        setEmailValue(""); 
        setPhoneValue(""); 
        setErrorMessage(""); 
    } catch (error) {
        setErrorMessage("Échec de l'envoi des identifiants à la base de données.");
        setSuccessMessage(""); 
        setIsSuccessVisible(false); 
        console.error("Error:", error);
    }
  };


  return (
    <>
      <Navbar />
      <div className='bloc_payer'>
        <div className="cart-container">
          <h2>Votre panier</h2>
          {cartItems.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            cartItems.map((item, index) => (
              item ? (
                <CartItem 
                  key={index} 
                  item={item} 
                  onRemove={() => removeItem(index)} 
                  onChangeQuantity={(change) => handleQuantityChange(index, change)} 
                />
              ) : null
            ))
          )}
        </div>
        
        <div className="input-section">
        {errorMessage && <div className="error-message" style={{ color: 'red', position: "relative",left:"00px" }}>{errorMessage}</div>}

          <br />
          <TextField 
            id="outlined-basic" 
            label="Entrez votre nom" 
            variant="outlined"  
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="custom-input" 
          />
          <br /><br />
          <TextField 
            id="outlined-basic-email" 
            label="Entrez votre mail" 
            variant="outlined"  
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className="custom-input" 
          />
          <br /><br />
          <TextField 
            id="outlined-basic-phone" 
            label="Entrez votre numéro de téléphone" 
            variant="outlined"  
            type='Number'
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            className="custom-input" 
          />
          <br /><br />
          <button className="black-button" onClick={handleSubmit}>
            Achat
          </button>
        </div>

      </div>
      {successMessage && <div className={`success-message ${isSuccessVisible ? 'visible' : ''}`}>{successMessage}</div>}

    </>
  );
};

const CartItem = ({ item, onRemove, onChangeQuantity }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <h3>{item.name}</h3>
        <div className="item-price">
          <span className="price">{item.price} €</span>
        </div>
        <div className="quantity-controls">
          <button className='button1' onClick={() => onChangeQuantity(-1)}><i className="pi pi-minus" style={{ fontSize: '1.5rem',color:"black",position:"relative",right:"10px",top:"2px",color:"white" }}></i> </button>
          <span style={{fontSize:"25px",fontWeight:"700", border:"transparent solid 1px",padding:"10px",position:"relative",top:"-5px",borderRadius:"3px",margin:"0px"}}>{item.quantity || 1}</span>
          <button className='button1' onClick={() => onChangeQuantity(1)}>  <i className="pi pi-plus" style={{ fontSize: '1.5rem',color:"black",position:"relative",right:"10px",top:"2px" ,color:"white"}}></i></button>
        </div>
      </div>
      <button className="remove-item" onClick={onRemove}>
        <i className="pi pi-trash" style={{ fontSize: '1.5rem', color:"black",position:"relative",top:"-7px", left:"-10px" }}></i>
      </button>
    </div>
  );
};

export default Panier;
