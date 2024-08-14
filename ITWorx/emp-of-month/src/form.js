import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavEmp from './components/navemp';
import { useEffect } from "react";

export function FormPage() {
    useEffect(()=>{
        document.title = "itworx | Form";
    },[]);
    const [formData, setFormData] = React.useState({
      nomineename: "",
      Nomineemail: "",
      reason: "",
      usersname:"",
      usermail:""
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
  
    
    };

    return (
        <>
        <NavEmp style={{ width: '100vw' }}></NavEmp>

    <div style={{paddingTop: '20px',paddingLeft: '100px'}}> 
      <h2>Nominate A Colleague</h2>
      <br />

      <div class="mb-3">
        <label for="NomineeName" class="form-label fw-bold"
          >Nominee's Full Name*</label
        >
        <div style={{paddingleft: '15px'}}>
          <input
            type="email"
            class="form-control w-50 p-3"
            id="NomineeName"
            placeholder="First Last"
            value={formData.nomineename}
            onChange={handleInputChange}

          />
        </div>
      </div>

      <label for="NomineeEmail" class="form-label fw-bold"
        >Nominee's Email*</label
      >

      <div class="input-group mb-3 w-50 p-3">
        <input
          type="text"
          class="form-control w-50 p-3"
          id="NomineeEmail"
          placeholder="Nominee's email"
          value={formData.Nomineemail}
          onChange={handleInputChange}
          aria-label="Nominee's email"
          aria-describedby="basic-addon2"
        />
        <span class="input-group-text w-25 p-3" id="basic-addon2"
          >@itworx.com</span
        >
      </div>

      <label for="Reason" class="form-label fw-bold"
        >Reason For Nomination*</label
      >
      <div style={{paddingleft: '15px'}}>
        <div class="form-floating">
          <textarea
            class="form-control w-50 p-3"
            placeholder="Leave your reasoning here"
            id="Reason"
            value={formData.reason}
            onChange={handleInputChange}
            style={{height: '100px'}}
          ></textarea>
          <label for="Reason">Reason For Nomination</label>
        </div>
      </div>

      <div style={{paddingtop: '30px'}}>
        <div class="mb-3">
          <label for="YourName" class="form-label fw-bold"
            >Your Full Name*</label
          >
          <div style={{paddingleft: '15px'}}>
            <input
              type="email"
              class="form-control w-50 p-3"
              id="YourName"
              placeholder="First Last"
              value={formData.usersname}
              onchange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <br />

      <label for="YourEmail" class="form-labe fw-bold"
        >Your Email*</label
      >

      <div class="input-group mb-3 w-50 p-3">
        <input
          type="text"
          class="form-control w-50 p-3"
          id="YourEmail"
          placeholder="Nominee's email"
          value={formData.usermail}
          onChange={handleInputChange}
          aria-label="Nominee's email"
          aria-describedby="basic-addon2"
        />
        <span class="input-group-text w-25 p-3" id="basic-addon3"
          >@itworx.com</span
        >
        <div style={{marginLeft: '1000px'}}>
         
        <button type="button" class="btn btn-danger fw-bold">Nominate</button>
      </div>
      </div>
     
    </div>
    <script src="" async defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

        
        
        
        
        
        
        </>


    );
};
export default FormPage;
    




