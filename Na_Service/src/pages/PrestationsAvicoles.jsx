import { Link } from 'react-router-dom'; // استيراد Link
import './PrestationsViticoles.css';
import NavBar from '../comp/NavBar.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PrestationsAvicoles() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    // جلب البيانات من قاعدة البيانات
    axios.get('https://na-service.onrender.com/prestations-avicoles') // تأكد من أن هذا هو عنوان API الخاص بك
      .then(response => {
        console.log(response.data); // تحقق من شكل البيانات
        setImages(response.data); // تخزين البيانات في الحالة
        setLoading(false); // تحديث حالة التحميل
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setLoading(false); // تحديث حالة التحميل حتى في حال وجود خطأ
      });
  }, []);

  // فلترة الصور حسب category
  const filteredImages1 = images.filter(imageData => imageData.selectCategory === 'Ramassage de volailles');
  const filteredImages2 = images.filter(imageData => imageData.selectCategory === 'Vaccination de Volailles');
  const filteredImages3 = images.filter(imageData => imageData.selectCategory === 'Nettoyage et Désinfection de bâtiments');
  const filteredImages4 = images.filter(imageData => imageData.selectCategory === 'Dératisation Désinsectisation');

  // اختيار آخر صورة لكل فئة
  const lastImage1 = filteredImages1[filteredImages1.length - 1];
  const lastImage2 = filteredImages2[filteredImages2.length - 1];
  const lastImage3 = filteredImages3[filteredImages3.length - 1];
  const lastImage4 = filteredImages4[filteredImages4.length - 1];

  if (loading) {
    return <div>Loading...</div>; // عرض رسالة التحميل
  }

  return (
    <>
      <NavBar />
      <div className="vineyard-services">
        <h1>Prestations Aviticoles</h1>
        <p>
          Nos prestations Prestations Aviticoles couvrent l'ensemble du cycle de production de votre vignoble. 
          De la taille à la vendange, en passant par les travaux manuels et mécaniques, nous mettons 
          notre expertise au service de la qualité de vos vins.
        </p>
        <div className="services-container">
          {lastImage1 && (
            <ServiceCard
              key={lastImage1._id} // استخدم المفتاح المناسب لكل بطاقة
              title="Ramassage de volailles"
              description="Nos équipes expérimentées effectuent avec précision tous les travaux manuels nécessaires dans votre vignoble, de l'ébourgeonnage à l'effeuillage."
              link="/Ramassage_de_volailles"
              imageSrc={lastImage1.img} // استخدم الصورة المناسبة من البيانات
            />
          )}

          {lastImage2 && (
            <ServiceCard
              key={lastImage2._id}
              title="Vaccination de Volailles"
              description="Nos équipes expérimentées effectuent avec précision tous les travaux manuels nécessaires dans votre vignoble, de l'ébourgeonnage à l'effeuillage."
              link="/Vaccination_de_Volailles"
              imageSrc={lastImage2.img}
            />
          )}

          {lastImage3 && (
            <ServiceCard
              key={lastImage3._id}
              title="Nettoyage et Désinfection de bâtiments"
              description="Nos équipes expérimentées effectuent avec précision tous les travaux manuels nécessaires dans votre vignoble, de l'ébourgeonnage à l'effeuillage."
              link="/nettoyage_et_desinfection"
              imageSrc={lastImage3.img}
            />
          )}

          {lastImage4 && (
            <ServiceCard
              key={lastImage4._id}
              title="Dératisation Désinsectisation"
              description="Nos équipes expérimentées effectuent avec précision tous les travaux manuels nécessaires dans votre vignoble, de l'ébourgeonnage à l'effeuillage."
              link="/Dératisation_Désinsectisation"
              imageSrc={lastImage4.img}
            />
          )}
        </div>
      </div>
    </>
  );
}

function ServiceCard({ title, description, link, imageSrc }) {
  return (
    <div className="service-card">
      {/* التأكد من استخدام تنسيق base64 للصور */}
      <img src={`data:image/jpeg;base64,${imageSrc}`} alt={title} className="service-image" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link} className="service-button">En savoir plus</Link>
    </div>
  );
}

export default PrestationsAvicoles;
