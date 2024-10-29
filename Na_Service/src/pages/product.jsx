import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import NavBar from "../comp/NavBar.jsx";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductGrid = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState({});
  const [message, setMessage] = useState('');
  const [addedToCart, setAddedToCart] = useState(new Set()); // تستخدم لتتبع المنتجات المضافة

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/produits');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    // تحقق إذا كان المنتج قد أضيف سابقًا
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (storedCartItems.some(item => item._id === productId)) {
      setMessage(`Le produit "${products.find(product => product._id === productId)?.titre}" a déjà été ajouté au panier.`);
      return; // لا تضف العنصر مرة أخرى
    }

    setLoadingState(prevState => ({ ...prevState, [productId]: true }));

    setTimeout(() => {
      const product = products.find(product => product._id === productId);

      if (product && product.titre && product.prix && product.img) {
        const newCartItem = {
          name: product.titre,
          price: product.prix,
          image: `data:image/jpeg;base64,${product.img}`,
          _id: product._id
        };

        const updatedCartItems = [...storedCartItems, newCartItem];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        setMessage(`Le produit "${product.titre}" a été ajouté au panier.`);
        addedToCart.add(productId); // إضافة المنتج إلى المجموعة
        setAddedToCart(new Set(addedToCart)); // تحديث الحالة
      } else {
        setMessage("Erreur : le produit ne contient pas toutes les informations requises.");
      }

      setLoadingState(prevState => ({ ...prevState, [productId]: false }));
      setTimeout(() => setMessage(''), 700);
    }, 700);
  };

  return (
    <>
      <NavBar />
      <div className='bloc_produit'>
        <h1 className="main-title">Catalogue des Produits</h1>
        <br /> <br /> <br />
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <LazyLoadImage 
                src={`data:image/jpeg;base64,${product.img}`} 
                alt={product.titre} 
                className="product-image" 
                effect="blur" 
              />
              <h3>{product.titre}</h3>
              <p className="price">{product.prix} €</p>
              {loadingState[product._id] ? (
                <button className="loading-button">
                  <span className="spinner"></span>
                </button>
              ) : (
                <button className='button' onClick={() => handleAddToCart(product._id)}>
                  Ajouter au panier
                </button>
              )}
            </div>
          ))}
        </div>
        {message && <div className="message"><i className="pi pi-check" style={{ fontSize: '1rem' }}></i> {message}</div>}
      </div>
    </>
  );
};

export default ProductGrid;
