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

export default PhoneRole;
