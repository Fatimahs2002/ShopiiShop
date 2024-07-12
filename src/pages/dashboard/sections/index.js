import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './index.css';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FcApprove } from 'react-icons/fc';
import { TiTick, TiTimes } from 'react-icons/ti';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:5000');

function Sections() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/sections/getSections');
      setSections(response.data);
      console.log(response)
    };

    fetchPosts();

    socket.on('newSection', (section) => {
      setSections((prevSections) => [...prevSections, section]);
      toast.info('new section added')
    });

    return () => {
      socket.off('newSection');
    };
  }, []);

  return (
    
    <div>
    <ToastContainer />

    <div className='d-flex gap-2 mb-3 align-items-center'><h1 className='mb-0'>Sections</h1>
        <Link className="ml-auto btn btn-primary" to='/addSection'>Add Section</Link>
      </div>
      <div className='card'>
        <div class="post-list">
          {sections.map((section) => (
            <div key={section._id}>
              <div className='list-item d-flex gap-3'>
                <div className=''><img className="rounded" src={section.imageUrl} alt="image" /></div>
                <div className=''> 
                <p>{section.name}</p>
                  </div>

                <div className='ml-auto btns d-flex gap-2'>
                <button className='btn btn-primary'><TiTick /> approve</button>
                  <button className='btn btn-secondary'><TiTimes /> reject</button>
                </div>
              </div>

            </div>
          ))}
        </div></div>
    </div>
  );
}

export default Sections;
