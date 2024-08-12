import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePic from './IMG_5739.JPG';
import employee1 from './employee1.jpg';
import employee2 from './employee2.jpg';
import employee3 from './employee3.jpg';
import logo from './logo.jpeg';
import NavAdmin from './components/navadmin';
import SideNavAdmin from './components/sidenavadmin';


function Appppp()
{
  return (
    <div  style={{ backgroundColor: '#ab2228' }}>
      <NavAdmin style={{ width: '100vw' }}></NavAdmin>

      <div
        style={{
          marginTop: -40,
          marginLeft: 14,
          backgroundColor: 'rgb(237, 242, 242)',
          width: '98%',
          height: 1200,
          marginRight: 100,
          borderRadius: '2%',
        }}
      >
        <SideNavAdmin></SideNavAdmin>
 
    <div style={{marginTop: 30}}>
    <section class="employee-of-the-month-admin" >
        <div class="content" >
            <h1>Employee of the Month</h1>
            <p>Recognize your peers. Vote for your favorites. Celebrate the winners.</p>
            <div class="buttons">
                <button class="nominate">Nominate</button>
                <button class="vote">Vote</button>
            </div>
        </div>
    </section>
    
        <div class="container title-margin">
          <h2>Recent winners</h2>
        </div>

    <div class="row row-section" style={{marginBottom: 500}}>
        <div class="col-md-4 winner-card">
            <img src={employee1} class="employee" alt="John Smith"/>
            <div class="winner-info">
                <h3>John Smith</h3>
                <p>Software Engineer</p>
                <p>June 2023</p>
            </div>
        </div>
        <div class="col-md-4 winner-card card-margins">
            <img src={employee2} class="employee" alt="Jane Doe"/>
            <div class="winner-info">
                <h3>Jane Doe</h3>
                <p>Product Manager</p>
                <p>May 2023</p>
            </div>
        </div>
        <div class="col-md-4 winner-card">
            <img src={employee3} class="employee" alt="Sam Johnson"/>
            <div class="winner-info">
                <h3>Sam Johnson</h3>
                <p>UX Designer</p>
                <p>April 2023</p>
            </div>
        </div>
    </div>
</div>



</div>

  </div>
  );
}

export default Appppp;
