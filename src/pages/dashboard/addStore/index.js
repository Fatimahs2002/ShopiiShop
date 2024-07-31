import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import NotificationButton from '../../../components/dashboard/notification/index';

const AddStore = () => {
    const [sections,setSections]=useState([]);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    currency: '', // Set initial value to 0
    address: '', // Set initial value to 0
    deliveryTime: '',
    whatTheySell: '',
    openUntil:'',
    exchangeRate:null,
    sectionId:'',
    image: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
  
    try {
      const response = await fetch('http://localhost:5000/stores/addStore', {
        method: 'POST',
        body: formDataObj, // Use formDataObj
      });
      
      const data = await response.json(); // assuming the server returns JSON
      
      console.log('item added:', data);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sections/getSections', {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSections(response.data);
        console.log('sections:', response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };
  
    fetchSections();
  }, []);
  const goBack = () => {
    navigate(-1)
  }
  
  return (
    <div>
      <div>
      <button className='btn btn-transparent title-back' onClick={goBack}><BiArrowBack/>
        <h1>Add Store</h1>
        </button>
      </div>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Store Name</label>
                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="store Name" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Address</label>
                <input className="form-control" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="address" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Delivery time</label>
                <input className="form-control" type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} placeholder="delivery time" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>What they sell</label>
                <input className="form-control" type="text" name="whatTheySell" value={formData.whatTheySell} onChange={handleChange} placeholder="what you Sell" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label> open Until</label>
                <input className="form-control" type="text" name="openUntil" value={formData.openUntil} onChange={handleChange} placeholder="open Until " required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label> Exchange rate</label>
                <input className="form-control" type="text" name="exchangeRate" value={formData.exchangeRate} onChange={handleChange} placeholder="exchange Rate" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
              <label>Select Section</label>
              <select className="form-control"  name="sectionId" value={formData.sectionId} onChange={handleChange} required>
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section._id} value={section._id}>{section.name}</option>
                  ))}
                </select>
            
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Image</label>
                <input className="form-control" type="file" name="image" onChange={handleFileChange} required />
              </div>
            </div>
          </div>
         <NavLink Link='/addStore'> <button className='btn btn-primary ml-auto' type="submit">Add store</button></NavLink>
        </form>
      </div>
      
    </div>
  )
};

export default AddStore;
