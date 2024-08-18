import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpeg';
import profilePic from './IMG_5739.JPG';

const SideNavAdmin = () => {
  return (
    <aside
      style={{
        float: 'left',
        width: 150,
        marginLeft: 20,
        marginTop: 40,
        height: 600,
      }}
    >
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/adminnominations"
            className="nav-link active text-black fw-bold border-bottom border-1 border-dark"
          >
            Nominations
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/voteadmin"
            className="nav-link text-black fw-bold border-bottom border-1 border-dark"
          >
            Voting
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/results"
            className="nav-link text-black fw-bold border-bottom border-1 border-dark"
          >
            Results
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/settings"
            className="nav-link text-black fw-bold border-bottom border-1 border-dark"
          >
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNavAdmin;