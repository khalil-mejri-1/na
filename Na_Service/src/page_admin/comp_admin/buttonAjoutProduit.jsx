import React, { useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import './NavBar.css'; 
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';

const ButtonAjoutPhoto = () => {
    const [showAjout, setShowAjout] = useState(false);
    const [titre, setTitre] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleCloseAjout = () => {
        setShowAjout(false);
        resetForm(); // Reset form when closing
    };

    const handleShowAjout = () => setShowAjout(true);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setError(''); // Reset error on new file selection
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        if (!titre || !prix || !image) {
            setError('Veuillez choisir une catégorie et ajouter une photo.');
            return;
        }

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('prix', prix);
        formData.append('img', image);

        try {
            const response = await axios.post('http://localhost:3000/produits', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            resetForm(); // Reset form after successful submission
        } catch (error) {
            console.error('Error uploading product:', error);
            setError('Une erreur est survenue lors de l\'envoi du produit');
        }
    };

    const resetForm = () => {
        setTitre('');
        setPrix('');
        setImage(null);
        setError('');
    };

    return (
        <div>
            <Offcanvas show={showAjout} onHide={handleCloseAjout} style={{ width: '650px' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <span style={{ fontSize: "25px", fontWeight: "700" }}>Ajout d'un produit</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                  
                <div style={{ border: "#e7e7e7 solid 0.5px", position: "absolute", left: "-20px", width: "669px", top: "90px" }}></div>
                <br /> <br />

                    <div className="contact-container">
                        <div className="form-wrapper_ajout">
                            <div className="contact-formv">
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="titre">Titre de produit</label>
                                    <input 
                                        type="text" 
                                        id="titre" 
                                        name="titre" 
                                        value={titre} 
                                        onChange={(e) => setTitre(e.target.value)} 
                                    />

                                    <label htmlFor="prix">Prix</label>
                                    <input 
                                        type="number" 
                                        id="prix" 
                                        name="prix" 
                                        value={prix} 
                                        onChange={(e) => setPrix(e.target.value)} 
                                    />

<label htmlFor="image" className="custom-file-upload">
    Choisir une image <i className="pi pi-plus" style={{ fontSize: '1.5rem',marginLeft:"10px", position:"relative",top:"3px"}}></i>
</label>
<input 
    type="file" 
    id="image" 
    name="image" 
    accept="image/*" 
    onChange={handleImageChange} 
    className="file-input" // add class for additional styling
/>


                                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                                    <button type="submit" className='button'>Envoyer</button>
                                </form>
                            </div>

                            <br />

                            <div className="contact-infoaj">
                                <h2>Image</h2>
                                {image && (
                                    <div className="image-preview">
                                        <img src={URL.createObjectURL(image)} alt="Image prévisualisée"  className='img_ajout'/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <button className='button_Offcanvas_ajoutProduit' onClick={handleShowAjout}>
                <i className="pi pi-upload" style={{ fontSize: '2rem' }}></i>
            </button>
        </div>
    );
}

export default ButtonAjoutPhoto;
