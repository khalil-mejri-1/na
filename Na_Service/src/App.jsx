import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// استيراد الصفحات العامة
import Home from "./pages/home.jsx";
import ContactForm from "./pages/ContactForm.jsx";
import ProductGrid from "./pages/product.jsx";
import EspaceClient from "./pages/espace_client.jsx";
import PrestationsViticoles from "./pages/PrestationsViticoles.jsx";
import Travauxmanuels from "./pages/Travauxmanuels.jsx";
import Travaux_mecaniques from "./pages/Travauxmécaniques.jsx";
import Taille_des_vignes from "./pages/Taille_des_vignes.jsx";
import Vendanges from "./pages/Vendanges.jsx";
import Prestations_Avicoles from "./pages/PrestationsAvicoles.jsx";
import Ramassage_de_volailles from "./pages/Ramassage_de_volailles.jsx";
import Vaccination_de_volailles from "./pages/Vaccination_de_volailles.jsx";
import Nettoyage_et_desinfection from "./pages/nettoyage_et_desinfection.jsx";
import Dératisation_Désinsectisation from "./pages/Dératisation_Désinsectisation.jsx";
import Panier from "./pages/panier.jsx";

// استيراد الصفحات الإدارية
import Home_admin from "./page_admin/page_admin/home.jsx";
import ContactForm_admin from "./page_admin/page_admin/ContactForm.jsx";
import ProductGrid_admin from "./page_admin/page_admin/product.jsx";
import EspaceClient_admin from "./page_admin/page_admin/espace_client.jsx";
import PrestationsViticoles_admin from "./page_admin/page_admin/PrestationsViticoles.jsx";
import Travauxmanuels_admin from "./page_admin/page_admin/Travauxmanuels.jsx";
import Travaux_mecaniques_admin from "./page_admin/page_admin/Travauxmécaniques.jsx";
import Taille_des_vignes_admin from "./page_admin/page_admin/Taille_des_vignes.jsx";
import Vendanges_admin from "./page_admin/page_admin/Vendanges.jsx";
import Prestations_Avicoles_admin from "./page_admin/page_admin/PrestationsAvicoles.jsx";
import Ramassage_de_volailles_admin from "./page_admin/page_admin/Ramassage_de_volailles.jsx";
import Vaccination_de_volailles_admin from "./page_admin/page_admin/Vaccination_de_volailles.jsx";
import Nettoyage_et_desinfection_admin from "./page_admin/page_admin/nettoyage_et_desinfection.jsx";
import Dératisation_Désinsectisation_admin from "./page_admin/page_admin/Dératisation_Désinsectisation.jsx";
import Ajout_produit_admin from "./page_admin/ajout_produit.jsx";
import AjoutPhoto_admin from "./page_admin/ajout_photo.jsx";
import Commond from "./page_admin/page_admin/commonds.jsx";

// استيراد صفحة تفاصيل الأوامر
import CommandDetails from "./page_admin/page_admin/commanddetaile.jsx";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for Admin */}
        <Route path="/admin" element={<Home_admin />} />
        <Route path="/ContactForm_admin" element={<ContactForm_admin />} />
        <Route path="/ProductGrid_admin" element={<ProductGrid_admin />} />
        <Route path="/EspaceClient_admin" element={<EspaceClient_admin />} />
        <Route path="/PrestationsViticoles_admin" element={<PrestationsViticoles_admin />} />
        <Route path="/Travauxmanuels_admin" element={<Travauxmanuels_admin />} />
        <Route path="/Travaux_mecaniques_admin" element={<Travaux_mecaniques_admin />} />
        <Route path="/Taille_des_vignes_admin" element={<Taille_des_vignes_admin />} />
        <Route path="/Vendanges_admin" element={<Vendanges_admin />} />
        <Route path="/Prestations_Avicoles_admin" element={<Prestations_Avicoles_admin />} />
        <Route path="/Ramassage_de_volailles_admin" element={<Ramassage_de_volailles_admin />} />
        <Route path="/Vaccination_de_volailles_admin" element={<Vaccination_de_volailles_admin />} />
        <Route path="/Nettoyage_et_desinfection_admin" element={<Nettoyage_et_desinfection_admin />} />
        <Route path="/Dératisation_Désinsectisation_admin" element={<Dératisation_Désinsectisation_admin />} />
        <Route path="/Ajout_produit_admin" element={<Ajout_produit_admin />} />
        <Route path="/AjoutPhoto_admin" element={<AjoutPhoto_admin />} />
        <Route path="/commande" element={<Commond />} />
        <Route path="/commandeperson/:personId" element={<CommandDetails />} />
        

        {/* Routes for Users */}
        <Route path="/" element={<Home />} />
        <Route path="/prestations_avicoles" element={<Prestations_Avicoles />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/product" element={<ProductGrid addToCart={addToCart} />} />
        <Route path="/espace_client" element={<EspaceClient />} />
        <Route path="/prestations_viticoles" element={<PrestationsViticoles />} />
        <Route path="/travaux_manuels" element={<Travauxmanuels />} />
        <Route path="/Travaux_mécaniques" element={<Travaux_mecaniques />} />
        <Route path="/taille_des_vignes" element={<Taille_des_vignes />} />
        <Route path="/Vendanges" element={<Vendanges />} />
        <Route path="/ramassage_de_volailles" element={<Ramassage_de_volailles />} />
        <Route path="/vaccination_de_volailles" element={<Vaccination_de_volailles />} />
        <Route path="/nettoyage_et_desinfection" element={<Nettoyage_et_desinfection />} />
        <Route path="/Dératisation_Désinsectisation" element={<Dératisation_Désinsectisation />} />
        <Route path="/panier" element={<Panier initialCartItems={cartItems} />} />

        {/* Admin Add Product Pages */}
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
