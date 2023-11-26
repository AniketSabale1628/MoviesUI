import React from 'react'
import './LoginPage.css'
import image from '../assets/image.png'

import Form from '../components/Form';
const LoginPage = () => {
  return (
    <div className="App">
      <div className='section'>


        <div>
          <img src={image} className="image"></img>
          <div className='discover'>Discover new things on Superapp</div>
        </div>


        <div className='Details'>

          <div className='title3
          '>Super app</div>
          <div className='title2'>Create your new account</div>
          
          <Form />

          <div className='desc1'>
            By clicking on Sign up. you agree to Superapp <span >Terms and Conditions
            of Use</span>
          </div>
          <div className='desc1'>
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head Superapp <span className='sp1'>Privacy Policy</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage
