import './ajout_photo.css';
import React, { useState, useEffect } from "react";
import { TreeSelect } from 'primereact/treeselect';
import { NodeService } from './NodeService/NodeService.jsx';
import 'primeicons/primeicons.css';
import axios from "axios";

function AjoutPhoto() {
  const [nodes, setNodes] = useState(null);
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
 
    const userData = {
      selectCategory: selectedNodeKey,
      img: image // إرسال الصورة
    };

    axios.post('http://localhost:3000/users', userData)
      .then(response => {
        console.log('User created:', response.data);
        // إعادة تعيين المدخلات إذا رغبت
        setImage(null);
        setSelectedNodeKey(null);
        // تحديث قائمة المستخدمين
        fetchUsers();
      })
      .catch(err => {
        console.error('Error creating user:', err);
      });
  };

  const fetchUsers = () => {
    axios.get('http://localhost:3005/users')
      .then(response => setUsers(response.data))
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  };

  useEffect(() => {
    fetchUsers();
    NodeService.getTreeNodes().then((data) => setNodes(data));
  }, []);

  return (
    <>
      <br /><br /><br />
      <div className="contact-container_">
        <h1>Ajout Image</h1>
        <div className="form-wrapper">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="casrd flex justify-content-censter">
                <TreeSelect 
                  value={selectedNodeKey} 
                  onChange={(e) => setSelectedNodeKey(e.value)} 
                  options={nodes} 
                  className="select"  
                  placeholder="Select category" 
                />
              </div>
              <br /><br />
           
              <button className='button' type="submit">Envoyer</button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Image</h2>
            {image && (
              <div className="image-preview">
                <img src={image} alt="Image prévisualisée" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AjoutPhoto;
