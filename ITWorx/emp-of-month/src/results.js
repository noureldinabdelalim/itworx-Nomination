import { useEffect, useState } from "react";
import NavAdmin from "./components/navadmin";
import SideNavAdmin from "./components/sidenavadmin";

export function Results() {
  const [nominees, setNominees] = useState([
    { name: "John Doe", votes: 25 },
    { name: "Jane Smith", votes: 18 },
    { name: "Robert Johnson", votes: 12 },
    { name: "Robert Parks", votes: 7 },
    { name: "Alice Smith", votes: 40 },
  ]);

  const [progress, setProgress] = useState(5);


  useEffect(() => {
    document.title = "itworx | results";
  }, []);

  
  const handleEndVoting = () => {

    alert("Voting has ended!");
  };

  return (
    <>
      <div style={{ backgroundColor: '#ab2228' }}>
        <NavAdmin style={{ width: '100vw' }} />

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
          <SideNavAdmin />
          <main className="container mt-4">
            <h2 style={{ paddingTop: 50 }}>Employee of The Month</h2>
            <br />
            <br />
            <h4>Current Voting</h4>
            <br />
            <br />
            <div
              className="progress"
              role="progressbar"
              aria-label="Danger example"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar bg-danger" style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-8">
                <ul className="list-unstyled">
                  {nominees.map((nominee, index) => (
                    <li key={index} className="d-flex align-items-center mb-4">
                      <a className="nav-link" href="#">
                        <img
                          src="IMG_5739.JPG"
                          className="profile-pic me-3"
                          alt={`Nominee ${index + 1}`}
                        />
                      </a>
                      <div>
                        <h5 className="mb-1">{nominee.name}</h5>
                        <p className="mb-0">Votes: {nominee.votes}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button type="button" className="btn btn-danger" onClick={handleEndVoting}>
                End Voting
              </button>
            </div>
          </main>
          <div className="date" style={{ textAlign: 'right', paddingRight: 50, paddingTop: 25 }}>
            <h5>Voting started on</h5>
            <h6 style={{ paddingRight: 30 }}>July 31, 2024</h6>
            <h5>Voting ends on</h5>
            <h6 style={{ paddingRight: 20 }}>August 1, 2024</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
