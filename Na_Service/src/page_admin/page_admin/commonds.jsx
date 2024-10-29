import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // استيراد Link
import './commend.css';
import Navbar from "../comp_admin/NavBarAdmin.jsx";

const Commond = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/panier/produits');
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="product-scontainer">
        <h1 style={{ float: "left", position: "absolute" }}>Les commands</h1>
        <br /><br /><br /><br />
        <div className="produsct-grid">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <Link 
                to={`/commandeperson/${order.personId}`} // تعديل الرابط ليشمل معرف الشخص
                key={index}
                className="product-card1" // إضافة الكلاس لتنسيق الكارد
              >
                <h2 style={{ marginLeft: "10px" }}>
                  <span style={{ color: "gray" }}>Nom de client:</span><br />
                  <span>{order.personName}</span>
                </h2>
                {order.productImage && (
                  <img src={`data:image/jpeg;base64,${order.productImage}`} alt={`Product ${order.productId}`} className="product-image" />
                )}
              </Link>
            ))
          ) : (
            <p>Aucune commande disponible.</p>
          )}
        </div>
      </div>
      <br /><br /><br /><br /><br />
    </>
  );
};

export default Commond;
