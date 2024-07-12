import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import NotificationButton from '../../../components/dashboard/notification/index';

const AddItem = () => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    sPrice: 0,
    pPrice: 0,
    ingredients: '',
    storeId: '',
    categoryId: '',
    userId: '',
    image: null,
    subCategory: '' // Added subCategory state
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    console.log(categoryId)
    setFormData({
      ...formData,
      categoryId // Update categoryId in formData
    });

    try {
      const response = await axios.get(`http://localhost:5000/subCategories/getSubcategoriesByCategoryId/${categoryId}`);
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
    // console.log(categoryId)
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
      const response = await axios.post('http://localhost:5000/items/addItem', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
     
      console.log('Item added:', response.data);
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories/getCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const goBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <div>
        <button className='btn btn-transparent title-back' onClick={goBack}><BiArrowBack/>
        <h1>Add item</h1>
        </button>
      </div>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
          <div className='col-md-6'>
          <div className="form-group">
            <label>Item Name</label>
            <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Purchase Price</label>
            <input className="form-control" type="number" name="pPrice" value={formData.pPrice} onChange={handleChange} placeholder="Purchase Price" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Sale Price</label>
            <input className="form-control" type="number" name="sPrice" value={formData.sPrice} onChange={handleChange} placeholder="Sale Price" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Ingredients</label>
            <input className="form-control" type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" required />
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">
            <label>Store ID</label>
            <input className="form-control" type="text" name="storeId" value={formData.storeId} onChange={handleChange} placeholder="Store ID" required />
          </div>
        </div>

        <div className='col-md-6'>
        <div className="form-group">
          <label>User ID</label>
          <input className="form-control" type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="User ID" required />
        </div>
      </div>
            <div className='col-md-6'>
              <div className="form-group">
              <label>Select Category</label>
                <select className="form-control" name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required>
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
              <label>Select Sub-Category</label>
                <select className="form-control" name="subCategory" value={formData.subCategory} onChange={handleChange} required>
                  <option value="">Select Sub-Category</option>
                  {subCategories.map(subCategory => (
                    <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
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
          <button className='btn btn-primary ml-auto' type="submit">Add Item</button>
        </form>
      </div>
    </div>
  )
};

export default AddItem;
