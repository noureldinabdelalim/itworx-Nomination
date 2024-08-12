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



import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminNom() {
    const [nominees, setNominees] = useState([
        {
          id: 1,
          name: 'John Doe',
          image: employee1,
          description: 'John is a great team player and always willing to help others.'
        },
        {
            id: 1,
            name: 'John Doe',
            image: employee1,
            description: 'John is a great team player and always willing to help others.'
        
        }
      ]);
  const [newNominee, setNewNominee] = useState('');
  const [showNewNomineeForm, setShowNewNomineeForm] = useState(false);
  const [biPlusImageClicked, setBiPlusImageClicked] = useState('');


  useEffect(() => {
    axios.get('/api/nominees')
      .then(response => {
        setNominees(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNewNominee = () => {
    setShowNewNomineeForm(true);
  };

  const handleSaveNewNominee = () => {
    axios.post('/api/nominees', { name: newNominee })
      .then(response => {
        setNominees([...nominees, response.data]);
        setShowNewNomineeForm(false);
        setNewNominee('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancelNewNominee = () => {
    setShowNewNomineeForm(false);
    setNewNominee('');
  };

  const handleBiPlusImageClick = () => {
    // Add your logic here for when the bi plus image is clicked
    console.log('Bi plus image clicked!');
   // setBiPlusImageClicked('yes');


  };

  return (
    <div>
     <NavAdmin/>

      <div style={{
        marginTop: '10px',
        marginLeft: '14px',
        backgroundColor: 'rgb(237, 242, 242)',
        width: '98%',
        height: '1200px',
        marginRight: '100px',
        borderRadius: '2%',
      }}>
        <aside style={{
          float: 'left',
          width: '150px',
          marginLeft: '20px',
          marginTop: '40px',
          height: '1200px',
        }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active text-black fw-bold border-bottom border-1 border-dark" aria-current="page" href="#">Nominations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black fw-bold border-bottom border-1 border-dark" href="#">Voting</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black fw-bold border-bottom border-1 border-dark" href="#">Results</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black fw-bold border-bottom border-1 border-dark" href="#">Settings</a>
            </li>
          </ul>

          <button type="button" className="btn btn-danger fw-bold" style={{ marginTop: '850px', verticalAlign: 'baseline', width: '250px' }}>
            New Employee of the Month
          </button>
        </aside>

        <h1 style={{ paddingLeft: '350px', paddingTop: '30px', fontWeight: 'bolder' }}>
          Nominations
        </h1>

        <p style={{ paddingLeft: '350px', fontWeight: 'lighter', fontSize: 'small' }}>
          Employees can nominate their colleagues for employee of the month.
          Nominations are anonymous.
        </p>

        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16" style={{ marginLeft: '180px' , cursor: 'pointer'}} onClick={handleBiPlusImageClick}>
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>

        <div style={{
          backgroundColor: 'rgb(237, 242, 242)',
          width: '300px',
          display: 'inline-block',
        }}>
          <div style={{ display: 'inline-block' }}>
            <h5 style={{ marginTop: '40px' }}>Nominate Employees</h5>
          </div>
        </div>

        <div>
          <p style={{
            fontWeight: 'lighter',
            fontSize: 'small',
            marginLeft: '395px',
            marginTop: '-12px',
          }}>
            You can nominate up to 3 employees
          </p>
        </div>

        <div>
          <h3 style={{ paddingLeft: '345px', fontWeight: 'bolder' }}>
            Current Nominations
          </h3>
          {/* <p>{biPlusImageClicked}</p> */}

          {nominees.map((nominee, index) => (
  <div key={index}>
    <img src={nominee.image} className="nominee-pic" style={{ marginLeft: '180px' }} />
    <div style={{
      backgroundColor: 'rgb(237, 242, 242)',
      width: '300px',
      display: 'inline-block',
    }}>
      <div style={{ display: 'inline-block' }}>
        <h5 style={{ marginTop: '40px' }}>{nominee.name}</h5>
      </div>
    </div>
    <div>
      <p style={{
        fontWeight: 'lighter',
        fontSize: 'small',
        marginLeft: '395px',
        marginTop: '-12px',
      }}>
        {nominee.description}
      </p>
    </div>
  </div>
))}

          {showNewNomineeForm && (
            <div style={{
              backgroundColor: 'rgb(237, 242, 242)',
              width: '300px',
              display: 'inline-block',
            }}>
              <div style={{ display: 'inline-block' }}>
                <h5 style={{ marginTop: '40px' }}>New Nominee</h5>
              </div>
              <input type="text" value={newNominee} onChange={(e) => setNewNominee(e.target.value)} />
              <button onClick={handleSaveNewNominee}>Save</button>
              <button onClick={handleCancelNewNominee}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminNom;