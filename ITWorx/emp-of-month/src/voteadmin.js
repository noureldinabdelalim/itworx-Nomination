import { useEffect, useState } from "react";
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

    // Fetch the nominees data from the API
    const fetchNominees = async () => {
      try {
        const response = await fetch("http://localhost:8000/vote");
        if (!response.ok) {
          throw new Error("Failed to fetch nominees");
        }
        const data = await response.json();
        if (data.nominees) {
          setNominees(data.nominees);
        } else {
          console.error("No nominees data found in the response");
        }
      } catch (error) {
        console.error("Error fetching nominees:", error);
      }
    };

    fetchNominees();
  }, []);

  const handleVote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/vote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request (for session-based authentication)
      });

      if (!response.ok) {
        throw new Error("Failed to submit vote");
      }

      const data = await response.json();
      console.log("Vote Response:", data);

      // Update the nominee's vote count in the UI
      setNominees(prevNominees =>
        prevNominees.map(nominee =>
          nominee.id === id
            ? { ...nominee, votes: nominee.votes + 1 }
            : nominee
        )
      );
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
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
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => handleVote(nominee.id)}
                        >
                          Vote
                        </button>
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
