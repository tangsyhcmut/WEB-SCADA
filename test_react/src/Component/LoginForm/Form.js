import React, { useState } from 'react';
import './Form.css';
import Home from '../Pages/Home';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import logo from './Logo.svg.png';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        {/* <span className='close-btn'>×</span> */}
        <div className='form-content-left'>
          <img className='form-img' src={logo} alt='BK' />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <Home />
        )}
      </div>
    </>
  );
};
export default Form