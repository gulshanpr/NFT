'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

export default function Home() {

  const [opposite, setOpposite] = useState('Yes');
  const [buttonText, setButtonText] = useState('No');

  const changeYesToNo = () => {
    if(buttonText === 'Yes') {
      notifyYes();
    } else{
      setButtonText(buttonText === 'Yes' ? 'No' : 'Yes');
      setOpposite("No");
      notifyNo();
    }
    
  };

  const handleOpposite = () => {
    if(opposite === 'No') {
      notifyNo();
      setButtonText("No");
      setOpposite("Yes");
    } else{
      notifyYes();
    }
  }

  const notifyNo = () => {
    toast.error('what are you saying, dude?. Say it again!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyYes = () => toast.success('nice 👍👍', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  return (
    <div className='pt-8 font-bold text-center min-h-screen bg-gradient-to-r from-pink-300 to-red-300 from-rose-300 to-pink-300'>
      <ToastContainer />
      <h1 className='text-9xl font-custom2'>Hii, How you doing?</h1>
      <h2 className='text-8xl font-custom2'>Will you be mine Valentine??</h2>
      <div className=''>
      <button onClick={handleOpposite} class="text-2xl mt-24 mx-6 bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">{opposite}</button>
      <button onClick={changeYesToNo} className="text-2xl mx-6 bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">{buttonText}</button>
      </div>
    </div>
  );
}