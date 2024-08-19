import React from 'react';
import { useState } from "react";
import './styles.css'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBInputGroup
}
from 'mdb-react-ui-kit';
import logo from './logo.jpeg';
import background from './background.jpg';

import Nav from './components/nav';

function Login() {

  const [formData, setFormData] = React.useState({
		email: "",
		password: "",
	});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      // Add your API call or authentication logic here
      console.log('Form data:', formData);
      // Example: const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleSubmit = (event) => {
		event.preventDefault();

		handleLogin();
	};


  

  return (
    <>
     <div  style={{ backgroundColor: '#ab2228', height: '100vh',
  width: '100vw',
  position: 'absolute',
  top: 0,
  left: 0, }}>

     <Nav />
     
      <div
        style={{
          marginTop: -40,
          marginLeft: 14,
          backgroundColor: 'rgb(255, 255, 255)',
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          justifyContent: 'center', // Added quotes around 'center'
          alignItems: 'center', // Added quotes around 'center'
          width: '100%',
          height: 800,
          marginRight: 100,
          borderRadius: '2%',
          zIndex: -1

        }}
      >
   <div style={{ paddingLeft: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', zIndex: 1 }}>
            <MDBContainer className="my-5 gradient-form" fluid style={{ maxWidth: 'none', padding: 0 }}>
            <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '60%', height: 700 }}>
                <MDBRow className='justify-content-center align-items-center h-100' style={{ maxWidth: 'none', margin: 0 }}>
                  <MDBCol col='6' className="mb-5" style={{ width: '100%' }}>
                    <div className="d-flex flex-column ms-5">
                      <div className="text-center">
                        <img src={logo} style={{ width: '150px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Welcome ITWorxians</h4>
                      </div>
                      <p>Please login to your account</p>
                      <MDBInputGroup className="mb-3">
  <MDBInput type="text" id="form1" placeholder="Email address" name="email" aria-label="Email address" aria-describedby="basic-addon2" value={formData.username}
									onChange={handleInputChange}/>
  <span className="input-group-text" >@itworx.com</span>
</MDBInputGroup>
                    <MDBInput wrapperClass='mb-4' placeholder="Password" name="password" id='form2' type='password' onChange={handleInputChange}
									value={formData.password}/>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <MDBBtn className="mb-4 w-100" style={{ maxHeight: '40px' }}>Sign in</MDBBtn>
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>
                      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                        <p className="mb-0">Facing an issue Logging in?</p>
                        <MDBBtn outline className='mx-2' color='danger' style={{ maxHeight: '40px' , maxWidth: '80px'}}>
                          Report
                        </MDBBtn>
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBContainer>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;