import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../comp_admin/NavBarAdmin.jsx";

const CommandDetail = () => {
    const { personId } = useParams();
    const [personName, setPersonName] = useState('');
    const [personEmail, setPersonEmail] = useState('');
    const [personPhone, setPersonPhone] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/panier/products/${personId}`);
                setPersonName(response.data.name);
                setPersonEmail(response.data.email);
                setPersonPhone(response.data.phone);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching person details:", error);
                setError("Failed to fetch person details: " + error.message);
                setLoading(false);
            }
        };

        fetchPersonDetails();      
    }, [personId]);

    useEffect(() => {
        const total = products.reduce((acc, product) => {
            return acc + (product.details.prix * product.quantity);
        }, 0);
        setTotalPrice(total);
    }, [products]);

    const printTables = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body>');
        
        // إضافة الجدول الأول
        printWindow.document.write(`
            <h2>Détails de la Commande</h2>
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="padding: 10px;">Nom</th>
                        <th style="padding: 10px;">Email</th>
                        <th style="padding: 10px;">Numéro de téléphone</th>
                        <th style="padding: 10px;">Total prix</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px;">${personName}</td>
                        <td style="padding: 10px;">${personEmail}</td>
                        <td style="padding: 10px;">${personPhone}</td>
                        <td style="padding: 10px;">${totalPrice.toFixed(2)} $</td>
                    </tr>
                </tbody>
            </table>
            <h2 style="margin-top: 40px;">Détails des Produits Achetés</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr>
                        <th style="padding: 10px; border: 1px solid #ccc;">Nom du Produit</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Quantité</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Prix Unitaire</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Prix Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ccc;">${product.details.titre}</td>
                            <td style="padding: 10px; border: 1px solid #ccc;">${product.quantity}</td>
                            <td style="padding: 10px; border: 1px solid #ccc;">${product.details.prix} $</td>
                            <td style="padding: 10px; border: 1px solid #ccc;">${(product.details.prix * product.quantity).toFixed(2)} $</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colSpan="3" style="padding: 10px; border: 1px solid #ccc; font-weight: bold;">Total</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">${totalPrice.toFixed(2)} $</td>
                    </tr>
                </tbody>
            </table>
        `);
        
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Navbar />
            <div className='bloc_command_detail'>
                <h2>Le command de : {personName}</h2>

              

                <h2 style={{ marginTop: "40px" }}>Produits Achetés</h2>
                <div className="product-cards-container">
                    {products.map((product, index) => (
                        <div key={index} className="product-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
                            <img 
                                src={`data:image/jpeg;base64,${product.details.img}`} 
                                alt={product.details.titre} 
                                className="product-image"
                                style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                            />
                            <h3>{product.details.titre}</h3>
                            <p style={{ fontSize: "20px" }}>Quantité: {product.quantity}</p>
                            <p style={{ fontSize: "20px" }}>Prix unitaire: {product.details.prix} $</p>
                            <p style={{ fontSize: "20px" }}>Prix total: {(product.details.prix * product.quantity).toFixed(2)} $</p>
                        </div>
                    ))}
                </div>

                <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "10px" }}>Nom</th>
                            <th style={{ padding: "10px" }}>Email</th>
                            <th style={{ padding: "10px" }}>Numéro de téléphone</th>
                            <th style={{ padding: "10px" }}>Total prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: "10px" }}>{personName}</td>
                            <td style={{ padding: "10px" }}>{personEmail}</td>
                            <td style={{ padding: "10px" }}>{personPhone}</td>
                            <td style={{ padding: "10px" }}>{totalPrice.toFixed(2)} $</td>
                        </tr>
                    </tbody>
                </table>

                <h2 style={{ marginTop: "40px" }}>Détails des Produits Achetés</h2>
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "10px", border: '1px solid #ccc' }}>Nom du Produit</th>
                            <th style={{ padding: "10px", border: '1px solid #ccc' }}>Quantité</th>
                            <th style={{ padding: "10px", border: '1px solid #ccc' }}>Prix Unitaire</th>
                            <th style={{ padding: "10px", border: '1px solid #ccc' }}>Prix Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td style={{ padding: "10px", border: '1px solid #ccc' }}>{product.details.titre}</td>
                                <td style={{ padding: "10px", border: '1px solid #ccc' }}>{product.quantity}</td>
                                <td style={{ padding: "10px", border: '1px solid #ccc' }}>{product.details.prix} $</td>
                                <td style={{ padding: "10px", border: '1px solid #ccc' }}>{(product.details.prix * product.quantity).toFixed(2)} $</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" style={{ padding: "10px", border: '1px solid #ccc', fontWeight: 'bold' }}>Total</td>
                            <td style={{ padding: "10px", border: '1px solid #ccc' }}>{totalPrice.toFixed(2)} $</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={printTables} style={{ marginBottom: '20px' }}>Imprimer les Détails</button>
            </div>
        </>
    );
}

export default CommandDetail;
