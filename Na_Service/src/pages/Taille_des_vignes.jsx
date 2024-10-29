import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import './PrestationsViticoles.css';
import NavBar from '../comp/NavBar.jsx';
import './travauxManuels.css';

function Taille_des_vignes() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // حالة تحميل جديدة

  useEffect(() => {
    // جلب البيانات من قاعدة البيانات
    axios.get('http://localhost:3000/taille-des-vignes') // تأكد من أن هذا هو عنوان API الخاص بك
      .then(response => {
        setImages(response.data); // تخزين البيانات في الحالة
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setError('فشل في جلب البيانات. حاول مرة أخرى لاحقًا.');
      })
      .finally(() => {
        setLoading(false); // إنهاء التحميل في جميع الحالات
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // عرض نص التحميل
  }

  if (error) {
    return <div>{error}</div>; // عرض رسالة الخطأ
  }

  // فلترة الصور حسب category
  const filteredImages = images.filter(imageData => imageData.selectCategory === 'Taille des vignes description');

  // اختيار آخر صورة
  const lastImage = filteredImages[filteredImages.length - 1];

  return (
    <>
      <NavBar />
      <div className="vineyard-services_travaux">
        <h1>Taille des vignes</h1>

        {lastImage && (
          <ServiceCard
            key={lastImage._id} // استخدم _id بدلاً من id لضمان عدم التعارض
            description="Nos équipes s'occupent de la taille des vignes pour garantir une récolte de qualité."
            imageSrc={lastImage.img ? `data:image/jpeg;base64,${lastImage.img}` : ''} // تأكد من أن تنسيق الصورة صحيح
          />
        )}
      </div>
    </>
  );
}

function ServiceCard({ imageSrc, description }) {
  return (
    <div className="service-card">
      <img src={imageSrc} alt="Taille des vignes" className="service-image" />
      <p>{description}</p> {/* عرض وصف الخدمة */}
    </div>
  );
}

export default Taille_des_vignes;
