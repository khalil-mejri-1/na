import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import Navbar from ".././comp_admin/NavBarAdmin.jsx";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductGrid_admin = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState({});
  const [message, setMessage] = useState('');

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
    setLoadingState(prevState => ({ ...prevState, [productId]: true }));

    setTimeout(() => {
      const product = products.find(product => product._id === productId);

      if (product && product.titre && product.prix && product.img) {
        addToCart(product);
        setMessage(`Le produit "${product.titre}" a été ajouté au panier.`);
        setLoadingState(prevState => ({ ...prevState, [productId]: false }));

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setMessage("Erreur : le produit ne contient pas toutes les informations requises.");
        setLoadingState(prevState => ({ ...prevState, [productId]: false }));
      }

      setTimeout(() => setMessage(''), 700);
    }, 700);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/produits/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      setMessage(`Le produit a été supprimé avec succès.`);
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage("Erreur lors de la suppression du produit.");
    }

    setTimeout(() => setMessage(''), 700);
  };

  return (
    <>
      <Navbar />
      <div className='bloc_produit'>
        <h1 className="main-title">Catalogue des Produits</h1>
        <br /><br /><br />
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
              <button 
                className="delete-button" 
                onClick={() => handleDeleteProduct(product._id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
        {message && <div className="message"><i className="pi pi-check" style={{ fontSize: '1rem' }}></i> {message}</div>}
      </div>
      <br /><br /><br />     
    </>
  );
};

export default ProductGrid_admin;
 