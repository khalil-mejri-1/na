import { Link } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './PrestationsViticoles.css';
import Navbar from ".././comp_admin/NavBarAdmin.jsx";
import './travauxManuels.css'; 

function Vendanges_admin() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  useEffect(() => {
    // جلب البيانات من API
    axios.get('http://localhost:3000/vendanges') 
      .then(response => {
        setImages(response.data); // تخزين البيانات في الحالة
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setError('فشل في جلب البيانات.'); // ضبط حالة الخطأ
      })
      .finally(() => {
        setLoading(false); // إنهاء حالة التحميل
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // عرض نص التحميل
  }

  if (error) {
    return <div>{error}</div>; // عرض رسالة الخطأ
  }

  // تعيين الفئات
  const categories = [
    { name: 'Effeuillage', description: "Nos équipes s'occupent de l'installation des parcelles viticoles pour garantir un bon départ à vos vignes." },
    { name: 'Cueillette', description: "Nous effectuons le cisaillage des plantations pour optimiser la croissance des vignes." },
    { name: 'Cueillette et débardage', description: "Nos équipes expérimentées garantissent une taille optimale pour améliorer la qualité des récoltes." },
    { name: 'Livraison à un centre de pressurage', description: "Nous effectuons le cisaillage des plantations pour optimiser la croissance des vignes." },
    { name: 'Fourniture de caisses', description: "Nos équipes expérimentées garantissent une taille optimale pour améliorer la qualité des récoltes." },
  ];

  // فلترة الصور حسب الفئة واختيار آخر صورة من كل فئة
  const filteredImages = categories.map(category => {
    const image = images.filter(imageData => imageData.selectCategory === category.name).pop();
    return {
      ...category,
      imageSrc: image && image.img ? `data:image/jpeg;base64,${image.img}` : 'http://example.com/path/to/default-image.jpg', // صورة افتراضية
    };
  });

  return (
    <>
      <Navbar />
      <div className="vineyard-services_travaux">
        <h1>Vendanges</h1>
        <div className="services-container_travaux">
          {filteredImages.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.name}
              description={service.description}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function ServiceCard({ title, description, imageSrc }) {
  return (
    <div className="service-card">
      <img src={imageSrc} alt={title} className="service-image" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
export default Vendanges_admin;
