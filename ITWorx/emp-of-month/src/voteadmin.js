import React, { useEffect, useState } from "react";
import axios from "axios"; // If using axios
import NavAdmin from "./components/navadmin";
import SideNavAdmin from "./components/sidenavadmin";

const prizes = [
  'First Prize: $1000',
  'Second Prize: $500',
  'Third Prize: $250',
  'Fourth Prize: $100',
  'Fifth Prize: $50',
];

export default function VoteAdmin() {
  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    document.title = "itworx | Vote";
  
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:8000/view_results");
        console.log("API Response:", response.data); // Log the response
  
        if (response.data.nominees) {
          setNominees(response.data.nominees);
          console.log("Nominees:", response.data.nominees); // Log the nominees
        } else {
          console.error("No nominees data found in the response");
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
  
    fetchResults();
  }, []);

  const handleVote = (id) => {
    setNominees(prevNominees =>
      prevNominees.map(nominee =>
        nominee.id === id
          ? { ...nominee, votes: nominee.votes + 1 }
          : nominee
      )
    );
  };

  return (
    <div style={{ backgroundColor: '#ab2228' }}>
      <NavAdmin style={{ width: '100vw' }} />
      <div
        style={{
          marginTop: -40,
          marginLeft: 14,
          backgroundColor: 'rgb(237, 242, 242)',
          width: '98%',
          height: 750,
          marginRight: 100,
          borderRadius: '2%',
          display: "flex",
        }}
      >
        <SideNavAdmin />
        <main className="container mt-4">
          <h2 style={{ paddingTop: '50px' }}>Employee of The Month</h2>
          <h6 style={{ paddingLeft: '30px' }}>Vote for your favourite Employee</h6>
          <br />
          <div className="row">
            <div className="col-md-8">
              <ul className="list-unstyled">
                {nominees.length > 0 ? (
                  nominees.map((nominee) => (
                    <li key={nominee.id} className="d-flex align-items-center mb-4">
                      <a className="nav-link" href="#">
                        <img src={nominee.image} className="profile-pic me-3" alt={nominee.name} />
                      </a>
                      <div className="d-flex justify-content-between w-100">
                        <div>
                          <h5 className="mb-1">{nominee.name}</h5>
                          <p className="mb-0">Votes: {nominee.votes}</p>
                        </div>
                        <button type="button" className="btn btn-light" onClick={() => handleVote(nominee.id)}>Vote</button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No nominees available.</p>
                )}
              </ul>
            </div>
            <div className="col-md-4" style={{ marginTop: '-30px' }}>
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Prize List</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {prizes.map((prize, index) => (
                      <li key={index} className="list-group-item">{prize}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
