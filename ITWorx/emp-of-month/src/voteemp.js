import NavEmp from "./components/navemp";
function voteEmp (){
    return (
        <>
        <title>itworx |vote</title>
        <NavEmp></NavEmp>
        <main className="container mt-4">
            <h2 style={{ paddingTop: '50px' }}>Employee of The Month</h2>
            <h6 style={{ paddingLeft: '30px' }}>Vote for your favourite Employee</h6>
            <br />
            <div className="row">
                <div className="col-md-8">
                    <ul className="list-unstyled">
                        {nominees.map((nominee) => (
                            <li key={nominee.id} className="d-flex align-items-center mb-4">
                                <a className="nav-link" href="#">
                                    <img src={nominee.image} className="profile-pic me-3" alt={nominee.name} />
                                </a>
                                <div className="d-flex justify-content-between w-100">
                                    <div>
                                        <h5 className="mb-1">{nominee.name}</h5>
                                        <p className="mb-0">Votes: {nominee.votes}</p>
                                    </div>
                                    <button type="button" className="btn btn-light">Vote</button>
                                </div>
                            </li>
                        ))}
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
        </>
    );
  };

  const nominees = [
    { id: 1, name: 'John Doe', votes: 25, image: 'IMG_5739.JPG'},
     { id: 2, name: 'Jane Smith', votes: 18, image: 'IMG_5739.JPG' },
     { id: 3, name: 'Robert Johnson', votes: 12, image: 'IMG_5739.JPG' },
     { id: 4, name: 'Robert Parks', votes: 7, image: 'IMG_5739.JPG' },
     { id: 5, name: 'Alice Smith', votes: 5, image: 'IMG_5739.JPG' },
  ];
  
  const prizes = [
    'First Prize: $1000',
    'Second Prize: $500',
    'Third Prize: $250',
    'Fourth Prize: $100',
    'Fifth Prize: $50',
  ];
  export default voteEmp;

