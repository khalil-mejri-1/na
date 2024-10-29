import React, { useRef } from 'react';
import "./Main.css";

const Main = () => {
    // إنشاء ref للإشارة إلى القسم في الأسفل
    const servicesRef = useRef(null);

    // دالة للتمرير إلى القسم المحدد
    const scrollToServices = () => {
        if (servicesRef.current) {
            servicesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="container_main">
            <div className="content">
                <h1>Expertise Avicole et Viticole</h1>
                <p>Votre partenaire de confiance pour des solutions innovantes</p>
                <button className='button' onClick={scrollToServices}>Découvrez nos services</button>
            </div>
            {/* القسم الذي نريد التمرير إليه */}
          <div ref={servicesRef} className="services_hom"></div>
        </div>
    );
}

export default Main;
