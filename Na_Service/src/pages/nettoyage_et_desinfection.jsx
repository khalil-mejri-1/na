import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PrestationsViticoles.css';
import NavBar from '../comp/NavBar.jsx';
import './travauxManuels.css';

function nettoyage_et_desinfection() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  useEffect(() => {
    // جلب البيانات من API
    axios.get('http://localhost:3000/nettoyage-et-desinfection')
      .then(response => {
        setImages(response.data); // تخزين البيانات في الحالة
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setError('فشل في جلب البيانات.');
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

  // تعيين الفئات والصور الافتراضية
  const categories = [
    { name: "Nettoyage", description: "Nos équipes s'occupent de l'installation des parcelles viticoles pour garantir un bon départ à vos vignes." },
    { name: "Désinfection", description: "Nous effectuons le cisaillage des plantations pour optimiser la croissance des vignes." },
    { name: "Dépoussiérage", description: "Nos équipes expérimentées garantissent une taille optimale pour améliorer la qualité des récoltes." },
    { name: "Hrattage", description: "Nos équipes s'occupent de l'installation des parcelles viticoles pour garantir un bon départ à vos vignes." },
    { name: "Balayage", description: "Nous effectuons le cisaillage des plantations pour optimiser la croissance des vignes." },
    { name: "Soufflage", description: "Nos équipes expérimentées garantissent une taille optimale pour améliorer la qualité des récoltes." },
  ];

  // فلترة الصور حسب الفئة
  const filteredImages = categories.map(category => {
    const image = images.find(imageData => imageData.selectCategory === category.name);
    return {
      ...category,
      imageSrc: image && image.img ? `data:image/jpeg;base64,${image.img}` : 'http://example.com/path/to/default-image.jpg', // صورة افتراضية
    };
  });

  return (
    <>
      <NavBar />
      <div className="vineyard-services_travaux">
        <h1>Nettoyage et Désinfection de bâtiments</h1>
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

export default nettoyage_et_desinfection;
