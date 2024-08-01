<<<<<<< HEAD
import React from 'react';
import './index.css';

const PhoneRole = () => {
  return (
    <div>
      <div className='containerr'>
        <h1 className='main-header'>If you are an end user, do not check any of these options</h1>
      </div>
      <input type='number' className='mt-5' placeholder='Enter your phone number'/>
      
      <div>
      <label htmlFor="merchant">Merchant</label>
        <input type="checkbox" id="merchant" name="role" value="merchant"/>
      
      </div>
      
      <div>
      <label htmlFor="driver">Driver</label>
        <input type="checkbox" id="driver" name="role" value="driver"/>
        
      </div>
      
      <div>
      <label htmlFor="anotherDriver">Biker</label>
        <input type="checkbox" id="anotherDriver" name="role" value="anotherDriver"/>
      
      </div>
    </div>
  );
}
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import statement

const PhoneRole = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formState, setFormState] = useState({
    role: '',
    phoneNumber: '',
  });

  useEffect(() => {
    // Retrieve user info from localStorage and parse it
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      setUserId(userInfo.result._id);
      console.log(userId); // This might log `null` due to async behavior. Consider using `console.log` after setting the state.
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      role: event.target.name,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      console.log("User ID is not available.");
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/users/phoneRole', {
        userId,
        ...formState,
      });
      if (!response) {
        console.log("Error: No response received");
      } else {
        console.log(response.data);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('userId', response.data._id);
        switch (response.data.role) {
          case 'user':
            navigate('/userHome');
            break;
          case 'magazineOwner':
            navigate('/merchant');
            break;
          case 'biker':
            navigate('/biker');
            break;
          case 'driver':
            navigate('/driver');
            break;
          default:
            navigate('/'); // Fallback to home page if role is unknown
            break;
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number:
        <input
          type="text"
          value={formState.phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
      </label>
      <label>
        Role:
        <input
          type="radio"
          name="driver"
          checked={formState.role === 'driver'}
          onChange={handleCheckboxChange}
        /> Driver
        <input
          type="radio"
          name="magazineOwner"
          checked={formState.role === 'magazineOwner'}
          onChange={handleCheckboxChange}
        /> Merchant
        <input
          type="radio"
          name="biker"
          checked={formState.role === 'biker'}
          onChange={handleCheckboxChange}
        /> Biker
      </label>
      <button className='btn btn-primary' type="submit">Continue</button>
    </form>
  );
};
>>>>>>> adel

export default PhoneRole;
