import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Modal from 'react-modal';
import GenerateInputs from '../../../components/dashboard/generateInputs/index';

const SectionAdd = () => {
  const [catIdToSent,setCatIdToSent]=useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sectionName: '',
    sectionImage: null,
    categoryName: '',
    categoryImage: null,
  });

  const [addedSection, setAddedSection] = useState(null);
  const [addedCategory, setAddedCategory] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmitSection = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.sectionName);
    formDataObj.append('image', formData.sectionImage);

    try {
      const response = await axios.post('http://localhost:5000/sections/addSection', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setAddedSection(response.data);
      console.log('Section added:', response.data);
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.categoryName);
    formDataObj.append('image', formData.categoryImage);
    formDataObj.append('sectionId', addedSection.item._id);

    try {
      const response = await axios.post('http://localhost:5000/categories/addCategory', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setAddedCategory(response.data);
      setCatIdToSent(response.data.item._id)
      console.log('Category added:', response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const clearInputs = () => {
    setFormData({
      sectionName: '',
      sectionImage: null,
      categoryName: '',
      categoryImage: null,
    });
    setAddedSection(null);
    setAddedCategory(null);
  };



  const clearSec = () => {
    setFormData({
      sectionName: '',
      sectionImage: null,
      
    });
    setAddedSection(null);

  };
  const clearCat = () => {
    setFormData({
     
      categoryName: '',
      categoryImage: null,
    });
   
    setAddedCategory(null);
  };
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <div>
      <button className='btn btn-transparent title-back' onClick={goBack}><BiArrowBack />
          <h1>Add section</h1>
        </button>
        </div>
      
      <div className='card'>
      <h2>Section</h2>
        <form onSubmit={handleSubmitSection}>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Section Name</label>
                <input className="form-control" type="text" name="sectionName" value={formData.sectionName} onChange={handleChange} placeholder="Section Name" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Section Image</label>
                <input className="form-control" type="file" name="sectionImage" onChange={handleFileChange} required />
              </div>
            </div>
          </div>
          <div className='d-flex gap-2 justify-content-end'>
          <button className='btn btn-secondary w-auto' type="button" onClick={clearSec}>Clear</button>
          <button className='btn btn-primary w-auto' type="submit">Add Section</button>
          </div>
        </form>
        </div>
        {addedSection && (
          <>
      <div className='card my-3'>
      <h2>Category</h2>
        <form onSubmit={handleSubmitCategory}>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Category Name</label>
                <input className="form-control" type="text" name="categoryName" value={formData.categoryName} onChange={handleChange} placeholder="Category Name" required/>
                </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Category Image</label>
                <input className="form-control" type="file" name="categoryImage"  onChange={handleFileChange} required />
              </div>
            </div>
          </div>
       
        <div className='d-flex gap-2 justify-content-end'>
        <button className='btn btn-secondary w-auto' type="button" onClick={clearInputs}>Clear</button>
        <button className='btn btn-primary w-auto' type="button" onClick={clearCat}>new category</button>
          <button className='btn btn-primary w-auto' type="submit">Add Category</button>
          </div>
          </form> </div>
      {addedCategory && (
      <GenerateInputs data={catIdToSent} />)}
      </>
        )}
      {/* Modal Component */}
      {/* <Modal ...> ... </Modal> */}
    </div>
  );
};

export default SectionAdd;
