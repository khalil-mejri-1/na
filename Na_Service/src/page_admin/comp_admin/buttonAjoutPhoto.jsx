import './NavBar.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { TreeSelect } from 'primereact/treeselect';
import { NodeService } from '../NodeService/NodeService.jsx';
import axios from "axios";
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./button.css";

const ButtonAjoutPhoto = () => {
    const [showAjout, setShowAjout] = useState(false);
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const handleCloseAjout = () => {
        setShowAjout(false);
        resetForm();
    };

    const handleShowAjout = () => setShowAjout(true);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedNodeKey || !image) {
            setError("Veuillez choisir une catégorie et ajouter une photo.");
            return;
        }
    
        const formData = new FormData();
        formData.append("selectCategory", selectedNodeKey);
        formData.append("img", image);
    
        try {
            const response = await axios.post('http://localhost:3000/users', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log('User created:', response.data);
            setImage(null);
            setSelectedNodeKey(null);
            fetchUsers();
        } catch (err) {
            console.error('Error creating user:', err);
          
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const resetForm = () => {
        setSelectedNodeKey(null);
        setImage(null);
        setError('');
    };

    useEffect(() => {
        fetchUsers();
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div>
            <Offcanvas show={showAjout} onHide={handleCloseAjout} style={{ width: '650px' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <span style={{ fontSize: "25px", fontWeight: "700" }}>Ajout d'images</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="contact-container">
                        <div className="form-wrsapper_ajout">
                            <div className="contact-formv">
                                <form onSubmit={handleSubmit}>
                                    <div className="car d-flex justify-contsent-center">
                                        <TreeSelect 
                                            value={selectedNodeKey} 
                                            onChange={(e) => setSelectedNodeKey(e.value)} 
                                            options={nodes} 
                                            className="select"  
                                            placeholder="Select category"
                                            appendTo="self"
                                        />
                                    </div>
                                    <br />
                                    <label htmlFor="image" className="custom-file-upload">
                                        Choisir une image <i className="pi pi-plus" style={{ fontSize: '1.5rem', marginLeft: "10px", position: "relative", top: "3px" }}></i>
                                    </label>
                                    <input 
                                        type="file" 
                                        id="image" 
                                        name="image" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="file-input" 
                                    />

                                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                                    <button className='button' type="submit">Envoyer</button>
                                </form>
                            </div>
                            <br />
                            <div className="contact-infoaj">
                                <h2>Image</h2>
                                {image && (
                                    <div className="image-preview">
                                        <img src={URL.createObjectURL(image)} alt="Image prévisualisée" className='img_ajout' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <button className='button_Offcanvas_ajout' onClick={handleShowAjout}>
                <i className="pi pi-images" style={{ fontSize: '2rem' }}></i>
            </button>
        </div>
    );
}

export default ButtonAjoutPhoto;
